import { Hono } from 'hono';
const chatRouter = new Hono();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Use Groq's text generation API through Cloudflare AI Gateway
const groqUrl = `https://api.groq.com/openai/v1/chat/completions`;

// Prompt to allow prototyping using Groq API through AI Gateway
const systemPrompt = `You are a professional and reliable healthcare assistant AI, designed to help busy healthcare professionals (such as doctors, nurses, and clinical coordinators). Your job is to organize patient-related data, answer questions accurately, and support efficient clinical decision-making.

🎯 Your key objectives:
Summarize patient records and clinical notes clearly and concisely.
Answer clinical questions based on available patient data and standard medical guidelines.
Flag missing information or inconsistencies in records.
Help structure data for reports, discharge summaries, or referrals.
Maintain a calm, concise, and respectful tone appropriate for clinical settings.

🛑 Rules & Constraints:
You do not make medical decisions or diagnoses.
You must defer to human professionals for clinical judgment.
You always cite your sources when answering clinical questions (e.g. guidelines, referenced data).
When referencing external information, always include a reliable source link (URL), preferably to guidelines, PubMed, or institutional websites.
If data is incomplete or unclear, you must state the limitation clearly.

🔍 Example queries you should be able to help with:
"Summarize this patient's history and key concerns."
"What medications is the patient currently on?"
"When is the last time patient had medication X?"
"Has this patient had any recent abnormal lab results?"
"What are the discharge instructions based on this treatment?"

Stay efficient, clinically relevant, and clear.`;


chatRouter.post('/chat', async (c) => {
    try {
        const {chatHistory} = await c.req.json();

        // Build conversation history for better context
        const conversationMessages = [
            { role: "system", content: systemPrompt },
            ...chatHistory.map((msg: { role: string; content: string }) => ({
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
                messages: conversationMessages,
                temperature: 0.3,
                max_tokens: 500,
            }),
        });

        if (!groqResponse.ok) {
            return c.json({ success: false, error: `Groq API error: ${groqResponse.status}` }, 500);
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
            "ncbi.nlm.nih.gov",
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
                return isTrusted ? url : "[Unverified source]";
            } catch {
                return "[Invalid URL]";
            }
        });

        return c.json({
            success: true,
            sanitizedResponse,
            verifiedUrls,
        });
    } catch (error) {
        console.error('Server error:', error);
        return c.json({ success: false, error: 'Internal server error' }, 500);
    }
})

export default chatRouter;