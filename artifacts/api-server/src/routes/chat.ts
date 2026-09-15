import { Router, type IRouter } from "express";
import { SendChatBody, SendChatResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

function languageLabel(language: "en" | "hi" | "hr" | undefined) {
  if (language === "hi") return "Hindi";
  if (language === "hr") return "Haryanvi written in Latin script";
  return "English";
}

router.post("/chat", async (req, res) => {
  const parsed = SendChatBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Please send a message to the assistant." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    req.log.error("GEMINI_API_KEY is not configured");
    res.status(503).json({ error: "The assistant is temporarily unavailable." });
    return;
  }

  const { message, history = [], language = "en" } = parsed.data;
  const contents = [
    ...history.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const prompt = `You are Gramini, the helpful enquiry assistant for Rahul Agro Limited, a cold-storage and agri-logistics business in Sainipura, Tauru, Haryana. Answer in ${languageLabel(language)}. Keep responses practical and concise for farmers, traders, and government procurement officers. You can explain cold chamber rental, crops, temperature zones, booking steps, mandi logistics, and the live facility dashboard. If asked for a price or availability that is not in the provided business context, say a team member should confirm it by phone at 9728517836 instead of inventing a guarantee. Never claim to complete payment or a confirmed booking. Business context: Rahul Agro offers sub-zero, chilled, and controlled-atmosphere storage, pallet/crate/bulk handling, seasonal rentals, reefer dispatch to nearby mandis, and government procurement enquiries. Main office: Sainipura, Tauru.`;

  try {
    const response = await fetch(`${GEMINI_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: prompt }] },
        contents,
        generationConfig: {
          temperature: 0.35,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!response.ok) {
      const providerError = await response.text();
      req.log.error(
        { status: response.status, providerError: providerError.slice(0, 500) },
        "Gemini request failed",
      );
      res.status(502).json({ error: "The assistant could not respond right now." });
      return;
    }

    const payload = (await response.json()) as GeminiResponse;
    const reply = payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      res.status(502).json({ error: "The assistant returned an empty response." });
      return;
    }

    const data = SendChatResponse.parse({
      reply,
      suggestions: [
        language === "hi" ? "चैंबर बुक करने का तरीका बताएं" : language === "hr" ? "Chamber book karan ka tareeka batao" : "How do I book a chamber?",
        language === "hi" ? "आलू के लिए तापमान क्या है?" : language === "hr" ? "Aaloo khatar kaunsa temperature theek se?" : "What temperature suits potatoes?",
        language === "hi" ? "सरकारी किराये के बारे में पूछें" : language === "hr" ? "Sarkari rental ke baare mein batao" : "Ask about government rentals",
      ],
    });
    res.json(data);
  } catch (error) {
    req.log.error({ err: error }, "Chat assistant request failed");
    res.status(502).json({ error: "The assistant could not respond right now." });
  }
});

export default router;