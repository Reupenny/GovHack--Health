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
        <div className="chat-container" style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
            <h2>Health Assistant Chat</h2>

            <div
                style={{
                    border: '1px solid #ccc',
                    padding: 10,
                    height: 300,
                    overflowY: 'auto',
                    marginBottom: 10,
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
                rows={3}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                style={{ width: '100%', marginBottom: 10 }}
                disabled={loading}
            />

            <button onClick={sendMessage} disabled={loading || !input.trim()}>
                Send
            </button>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {sources.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <h4>Verified Sources:</h4>
                    <ul>
                        {sources.map((url, i) => (
                            <li key={i}>
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
