"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Wheat } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: t.chatbot.greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm unable to respond right now. Please call +91 9728517836 for assistance." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-farm-green border-2 border-charcoal shadow-boxy text-white w-14 h-14 flex items-center justify-center hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        aria-label="Open chat"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 flex flex-col border-2 border-charcoal shadow-boxy-lg bg-white animate-slide-up">
          {/* Header */}
          <div className="bg-farm-green text-white px-4 py-3 flex items-center gap-2 border-b-2 border-charcoal">
            <Wheat className="w-5 h-5 text-mustard-gold" />
            <div>
              <p className="font-extrabold text-sm">{t.chatbot.title}</p>
              <p className="text-white/70 text-xs">Powered by Gemini AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 bg-warm-soil">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3 py-2 text-sm border-2 border-charcoal font-medium ${
                    msg.role === "user"
                      ? "bg-farm-green text-white shadow-boxy-sm"
                      : "bg-white text-charcoal shadow-boxy-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-charcoal px-3 py-2 shadow-boxy-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-farm-green" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex border-t-2 border-charcoal">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={t.chatbot.placeholder}
              className="flex-1 px-3 py-2.5 text-sm outline-none font-medium bg-white"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-mustard-gold border-l-2 border-charcoal px-3 py-2.5 text-charcoal hover:bg-farm-green hover:text-white transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
