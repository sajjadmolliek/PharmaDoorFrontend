/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/AssistantChat.tsx
import { useState } from "react";
import axios from "axios";

const GEMINI_API_KEY = "AIzaSyAoj3nVz7ZNt2DNuZOrO1GBtUSdop6whyk";

const AiassistantChat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          prompt: {
            text: input,
          },
          temperature: 0.7,
          candidateCount: 1,
        }
      );

      const assistantResponse =
        response.data?.candidates?.[0]?.output ||
        "Sorry, I couldn't understand that.";

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("API Error response:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Error talking to Gemini API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        💊 AI Medicine Assistant
      </h2>
      <div className="h-72 overflow-y-auto border rounded p-3 mb-4 bg-gray-50 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-2 rounded-md max-w-xs ${
                msg.role === "user" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm italic text-gray-500">
            Assistant is typing...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Ask about any medicine..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiassistantChat;
