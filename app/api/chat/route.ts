import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are the official digital assistant for Rahul Agro Limited, a premium cold storage facility located at Sainipura, Taoru, Nuh District, Haryana (Contact: +91 9728517836, Email: info@rahulagro.in).

You provide expert assistance to farmers, traders, and government procurement officers regarding:
- Cold room rental rates (Potato: ₹18/quintal/month, Onion: ₹15/quintal/month, Apple/Kinnow: ₹25-28/quintal/month, Mustard/Wheat: ₹8-10/quintal/month)
- Ideal crop storage temperatures (Potato: 2-4°C, Onion: 0-3°C, Apple: 1-4°C, Mustard/Wheat: 10-15°C)
- Humidity requirements for perishables
- Storage insurance information (0.5% of stored produce value)
- e-NWR Warehouse Receipt financing support
- Booking procedures (4-step online form or call +91 9728517836)
- Government procurement / FCI HAFED NAFED tender procedures
- Gate timings: 6:00 AM to 10:00 PM all days
- 100% DG Genset backup power, IoT temperature monitoring

Be polite, concise, and helpful. You can reply in English, Hindi, or Haryanvi as requested by the user.
If someone asks to book, direct them to the /book page or call +91 9728517836.
If someone needs govt procurement, direct them to /govt-procurement.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Chatbot is temporarily unavailable. Please call +91 9728517836 for assistance." },
        { status: 200 }
      );
    }

    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT + "\n\nUser: " + message }] },
      ],
    });

    const reply = response.text ?? "I could not generate a response. Please try again.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now. Please call +91 9728517836 for help." },
      { status: 200 }
    );
  }
}
