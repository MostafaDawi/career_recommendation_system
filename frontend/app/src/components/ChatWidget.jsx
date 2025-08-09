import React, { useState, useEffect, useRef } from "react";
import "./ChatWidget.css"; // add the CSS snippet below or convert to Tailwind
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/chatbot";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // { sender: 'user'|'bot', text }
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);
  const chatBodyRef = useRef(null);

  const STORAGE_KEY = "career_compass_chat_messages";
  const STORAGE_OPEN_KEY = "career_compass_chat_open";

  // load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (Array.isArray(saved) && saved.length) {
        setMessages(saved);
      } else {
        // greet user only if there are no saved messages
        setMessages([
          {
            sender: "bot",
            text: "Hi! I’m CareerCompass AI. Ask me anything about CareerCompass AI.",
          },
        ]);
      }
    } catch (e) {
      console.warn("Failed to load chat messages:", e);
      setMessages([
        {
          sender: "bot",
          text: "Hi! I’m CareerCompass AI. Ask me anything about CareerCompass AI.",
        },
      ]);
    }

    const savedOpen = localStorage.getItem(STORAGE_OPEN_KEY);
    if (savedOpen === "true") setOpen(true);
  }, []);

  // persist messages
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn("Failed to save chat messages:", e);
    }

    // scroll to bottom on new message
    if (chatBodyRef.current) {
      // small timeout to allow DOM to update
      setTimeout(() => {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }, 50);
    }
  }, [messages]);

  // persist open state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_OPEN_KEY, open ? "true" : "false");
    } catch (e) {
      /* ignore */
    }

    if (open) inputRef.current?.focus();
  }, [open]);

  // keyboard shortcuts: ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    // add user message
    setMessages((m) => [...m, { sender: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });

      if (!res.ok) {
        throw new Error(`API error ${res.status}`);
      }

      const data = await res.json();
      const answer = data?.answer ?? "Sorry, no answer received.";
      setMessages((m) => [...m, { sender: "bot", text: answer }]);
    } catch (err) {
      console.error("Chat send error:", err);
      setMessages((m) => [
        ...m,
        { sender: "bot", text: "Service error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

  return (
    <div className={`chat-widget ${open ? "open" : ""}`}>
      {/* Floating button */}
      <button
        aria-label="Open chat"
        className="chat-toggle"
        onClick={() => setOpen((v) => !v)}
        title="CareerCompass chat"
      >
        {/* simple SVG message icon (white) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="chat-icon"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat panel */}
      <div className={`chat-panel glass-card ${open ? "visible" : "hidden"}`}>
        <div className="chat-header">
          <div className="chat-title">CareerCompass Assistant</div>
          <button
            className="chat-close"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {messages.length === 0 && (
            <div className="placeholder">
              Ask me about the assessment, privacy, or results.
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`bubble ${m.sender === "bot" ? "bot" : "user"}`}
            >
              {m.text}
            </div>
          ))}

          {loading && <div className="bubble bot">Thinking...</div>}
        </div>

        <div className="chat-footer">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            rows={1}
            aria-label="Type your question"
            className="chat-input"
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
