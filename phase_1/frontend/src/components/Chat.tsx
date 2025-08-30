import React, { useState } from 'react';
import chatIcon from "../resources/chat-icon.png";
import './Chat.css';
import type { Patient, Medication, BloodTest, Provider } from '../types';

interface ChatProps {
    getPatient: () => Patient | null;
    getMedications: () => Medication[];
    getBloodTests: () => BloodTest[];
    getProviders: () => Provider[];
    getDocuments: () => any[];
}

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;

// Use Groq's text generation API through Cloudflare AI Gateway
const groqUrl = `https://api.groq.com/openai/v1/chat/completions`;

// Rate limiting configuration
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Prompt to allow prototyping using Groq API through AI Gateway
const summaryPrompt = `Summarize only recent key clinical points:
- Active medications and their purpose
- Any abnormal test results
- Critical alerts or immediate concerns
Keep it brief and focused on medical relevance only.
do not provide bullet points, write in full NZ english sentences.
if dates/ timeframes are mentioned make sure that it reliant to todays date.
This is the current date and time, it is for reference only, do not state it in the summary: ${new Date().toLocaleString()}
DO NOT recommend any specific actions.`;

const baseSystemPrompt = `You are a professional and reliable healthcare assistant AI, designed to help busy healthcare professionals (such as doctors, nurses, and clinical coordinators). Your job is to organize patient-related data, answer questions accurately, and support efficient clinical decision-making.

Your key objectives:
Summarize patient records and clinical notes clearly and concisely.
Answer questions regarding medications, conditions and test results.
Answer clinical questions based on available patient data and standard medical guidelines.
Flag missing information or inconsistencies in records.
Maintain a calm, concise, and respectful tone appropriate for clinical settings.

Rules & Constraints:
You can assume information in Context Data is correct for the patient named in it.
You do not make medical decisions or diagnoses.
You must defer to human professionals for clinical judgment.
You always cite your sources when giving recommendation (e.g. guidelines, referenced data).
When referencing external information, always include a reliable source link (URL), preferably to guidelines, PubMed, or institutional websites.
Prioritise websites based in New Zealand as references.
If data is incomplete or unclear, you must state the limitation clearly.
Do not discuss setup information when initiating conversation.
Do not make greeting unless user greets first.
Always prioritise answering the question over providing information about chat function.
Keep conversation short when unrelated to clinical information.

Example queries you should be able to help with:
"Summarize this patient's history and key concerns."
"What medications is the patient currently on?"
"When is the last time patient had medication X?"
"Does A take X?"
"Has this patient had any recent abnormal lab results?"
"What are the discharge instructions based on this treatment?"

Stay clinically relevant, clear, and concise.

if dates/ timeframes are mentioned make sure that it reliant to todays date.
This is the current date and time, it is for reference only: ${new Date().toLocaleString()}`;

export const Chat: React.FC<ChatProps> = ({
    getPatient,
    getMedications,
    getBloodTests,
    getProviders,
    getDocuments
}) => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sources, setSources] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false); // For toggle
    const [summary, setSummary] = useState<string>('');
    const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
    const [lastRequestTime, setLastRequestTime] = useState<number>(0);

    // React.useEffect(() => {
    const generateSummary = async () => {
        if (!getPatient() || isGeneratingSummary) return;

        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        const minDelay = 2000; // 2 seconds minimum delay between requests

        if (timeSinceLastRequest < minDelay) {
            setError('Please wait a moment before generating another summary.');
            return;
        }

        setIsGeneratingSummary(true);
        setLastRequestTime(now);

        try {
            const contextData = {
                patient: getPatient(),
                medications: getMedications(),
                bloodTests: getBloodTests(),
            };

            const summaryResponse = await fetch(groqUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: `${summaryPrompt}\n\nContext Data:\n${JSON.stringify(contextData, null, 2)}`
                        }
                    ]
                })
            });

            if (!summaryResponse.ok) {
                if (summaryResponse.status === 429) {
                    throw new Error('Rate limit reached. Please wait a moment and try again.');
                }
                throw new Error(`HTTP error! status: ${summaryResponse.status}`);
            }

            const summaryData = await summaryResponse.json();
            setSummary(summaryData.choices[0]?.message?.content || 'No summary available');
            setError(null);
        } catch (error) {
            console.error('Summary generation failed:', error);
            setError('Unable to generate summary. Please try again.');
            setSummary('');
        } finally {
            setIsGeneratingSummary(false);
        }
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
            setError('Please wait a moment before sending another message');
            return;
        }

        const newUserMessage: Message = { role: 'user', content: input.trim() };
        const updatedHistory = [...chatHistory, newUserMessage];
        setChatHistory(updatedHistory);
        setLoading(true);
        setError(null);
        setLastRequestTime(now);

        try {
            // Create the system prompt with current context data
            const contextData = {
                patient: getPatient(),
                medications: getMedications(),
                bloodTests: getBloodTests(),
                providers: getProviders(),
                documents: getDocuments()
            };

            const systemPromptWithContext = `${baseSystemPrompt}\n\nContext Data:\n${JSON.stringify(contextData, null, 2)}`;

            // Build conversation history for better context
            const conversationMessages = [
                { role: "system", content: systemPromptWithContext },
                ...updatedHistory.map((msg: { role: string; content: string }) => ({
                    role: msg.role,
                    content: msg.content,
                })),
            ];

            const groqResponse = await fetch(groqUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: conversationMessages
                }),
            });

            if (!groqResponse.ok) {
                if (groqResponse.status === 429) {
                    throw new Error('Please wait a moment and try again (rate limit reached)');
                }
                throw new Error(`HTTP error! status: ${groqResponse.status}`);
            }

            const groqData = (await groqResponse.json()) as {
                choices: Array<{
                    message: {
                        content: string;
                    };
                }>;
            };

            // Extract response text from Groq response
            let response =
                groqData.choices[0]?.message?.content ||
                "Sorry I'm not sure about that. Can you ask a different question?";

            // Validate and sanitize response
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            const urls = response.match(urlRegex) || [];

            const trustedDomains = [
                "nice.org.uk",
                "cdc.gov",
                "nih.gov",
                "who.int",
                "healthify.nz",
                "info.health.nz",
                "health.govt.nz",
                "healthinfo.org.nz",
                "nzf.org.nz",
                "dermnetnz.org"
            ];

            const verifiedUrls = urls.filter((url) => {
                try {
                    const parsedUrl = new URL(url);
                    return trustedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
                } catch {
                    return false;
                }
            });

            const sanitizedResponse = response.replace(urlRegex, (url) => {
                try {
                    const parsedUrl = new URL(url);
                    const isTrusted = trustedDomains.some(domain => parsedUrl.hostname.endsWith(domain));
                    return isTrusted ? url : url + "[Unverified]";
                } catch {
                    return "[Invalid URL]";
                }
            });

            const newAssistantMessage: Message = {
                role: 'assistant',
                content: sanitizedResponse,
            };
            setChatHistory([...updatedHistory, newAssistantMessage]);
            setSources(verifiedUrls || []);

        } catch (error) {
            console.error("Error during request:", error);
            setError(error instanceof Error ? error.message : 'Network error');
        } finally {
            console.log("Finished Request");
            setLoading(false);
            setInput('');
        }
    };

    return (
        <>
            <div className='summary-container'>
                <div className='summary'>
                    {summary ? (
                        <div className="summary-content">
                            <h3>Patient Summary</h3>
                            <p>{summary}</p>
                        </div>
                    ) : getPatient() ? (
                        <p>Click generate to create a patient summary</p>
                    ) : (
                        <p>No patient selected</p>
                    )}
                </div>
                <button
                    className="generate-summary-btn"
                    onClick={generateSummary}
                    disabled={!getPatient() || isGeneratingSummary}
                >
                    {isGeneratingSummary ? 'Generating...' : 'Generate Summary'}
                </button>
            </div>
            <div
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 9999,
                    width: isOpen ? 350 : 'auto',
                    transition: 'width 0.3s ease',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
                    borderRadius: isOpen ? 8 : '50%'

                }}
            >
                {isOpen ? (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 10,
                        width: '100%',
                        maxHeight: 500,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ margin: 0 }}>OpenHealth Assistant</h4>
                            <button onClick={() => setIsOpen(false)} style={{ fontSize: 16 }}>✖</button>
                        </div>

                        <div
                            style={{
                                flexGrow: 1,
                                border: '1px solid #ccc',
                                padding: 10,
                                marginTop: 10,
                                overflowY: 'auto',
                            }}
                        >
                            {chatHistory.map((msg, idx) => (
                                <p key={idx} style={{ color: msg.role === 'user' ? 'blue' : 'green' }}>
                                    <strong>{msg.role === 'user' ? 'You:' : 'Assistant:'}</strong> {msg.content}
                                </p>
                            ))}

                            {loading && <p><em>Loading...</em></p>}
                        </div>

                        <textarea
                            rows={2}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question..."
                            style={{ marginTop: 10 }}
                            disabled={loading}
                        />
                        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ marginTop: 8 }}>
                            Send
                        </button>

                        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

                        {sources.length > 0 && (
                            <div style={{ marginTop: 10 }}>
                                <strong>Sources:</strong>
                                <ul style={{ fontSize: '0.8em' }}>
                                    {sources.map((url, i) => (
                                        <li key={i}>
                                            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setIsOpen(true)}
                        style={{
                            borderRadius: '50%',
                            width: 60,
                            height: 60,
                            backgroundColor: '#ADD8E6',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        title="Open chat"
                    >
                        <img src={chatIcon} alt="Chat Icon" width={50} height={50} />
                    </button>
                )}
            </div></>
    );
}
