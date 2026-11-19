import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { sendAiMessage, ChatMessage } from "../../services/aiService";

export default function AiChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm the StrayCare AI helper. Ask me about reporting a stray, adopting a pet, or rescuer roles.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const priorHistory = messages.slice(-8);
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendAiMessage(text, priorHistory);
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      const errText = err instanceof Error ? err.message : "Could not reach AI assistant.";
      setMessages([...nextMessages, { role: "assistant", content: `Error: ${errText}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-xl sm:w-96">
          <div className="flex items-center justify-between bg-ink-900 px-4 py-3 text-white">
            <span className="font-bold">StrayCare AI Assistant</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close AI chat"
              className="rounded p-1 hover:bg-ink-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] rounded-xl px-3 py-2 whitespace-pre-line ${
                  m.role === "user"
                    ? "ml-auto bg-golden-500 text-white"
                    : "bg-ink-100 text-ink-900"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <p className="text-xs text-ink-400">Thinking...</p>}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-ink-100 p-2">
            <input
              type="text"
              className="input flex-1 text-sm"
              placeholder="Ask about strays or adoption..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send message"
              className="btn-primary px-3 py-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open AI chat"
          className="flex items-center gap-2 rounded-full bg-ink-900 px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-ink-800"
        >
          <MessageCircle className="h-5 w-5" />
          <span>AI Help</span>
        </button>
      )}
    </div>
  );
}