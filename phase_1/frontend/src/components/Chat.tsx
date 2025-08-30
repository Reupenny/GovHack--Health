import React, { useState } from 'react';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export const Chat: React.FC = () => {
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sources, setSources] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false); // For toggle

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newUserMessage: Message = { role: 'user', content: input.trim() };
        const updatedHistory = [...chatHistory, newUserMessage];
        setChatHistory(updatedHistory);
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chatHistory: updatedHistory }),
            });

            const data = await res.json();

            if (data.success) {
                const newAssistantMessage: Message = {
                    role: 'assistant',
                    content: data.sanitizedResponse,
                };
                setChatHistory([...updatedHistory, newAssistantMessage]);
                setSources(data.verifiedUrls || []);
            } else {
                setError(data.error || 'Unknown error');
            }
        } catch {
            setError('Network error');
        } finally {
            setLoading(false);
            setInput('');
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 9999,
                width: isOpen ? 350 : 'auto',
                transition: 'width 0.3s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
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
                        <h4 style={{ margin: 0 }}>Health Assistant</h4>
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
                        style={{ width: '100%', marginTop: 10 }}
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
                        backgroundColor: '#007bff',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    title="Open chat"
                >
                    {/*<img src="/resources/chat-icon.svg" alt="Chat Icon" width={32} height={32} />*/}
                </button>
            )}
        </div>
    );
};
