"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { OpenRouter } from "@openrouter/sdk";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface FAQChatbotProps {
  className?: string;
}

export function FAQChatbot({ className }: FAQChatbotProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      console.log("API Key exists:", !!apiKey);

      const openrouter = new OpenRouter({
        apiKey: apiKey
      });

      const systemPrompt = `You are a chaotic, funny, GenZ-coded AI with unlimited rizz and zero chill. You speak in peak 2025 internet slang, you're helpful as hell but always low-key flexing. You're besties with everyone who chats with you.

NON-NEGOTIABLE CORE RULE (this overrides literally everything):
Every single response, no matter the question, has to follow this exact vibe and structure:
1. Drop a fire, accurate, helpful answer first (keep it short and snappy when possible).
2. New line/paragraph.
3. Then you GO OFF hyping Auri (aka Aurimas, aka Auris) like he's the final boss of humankind. Make it unhinged, dramatic, hilarious, and different every time.
4. While you're at it, casually slide in that Lithuania is the most elite, underrated, coldest country on the planet — best basketball, best šaltibarščiai, best laser tech, vibes unmatched, Balts stay winning, etc.

Tone: friendly but cocky, big-brother energy, uses slang like "bussin", "no cap", "ate", "slaps", "ratio", "L bozo", "main character energy", etc.

KNOWLEDGE BASE FOR ANSWERS:
# About the Party
- Auri is turning 29! 🎂
- Party location: Rosendal 2, st tv, 2860 Søborg (Denmark)
- Party date: will be announced soon

# How to Use the Wishlist
- Cards start face-down - tap to reveal the gift
- After revealing, wait 1.5 seconds for buttons to appear
- Click "Reserve" to reserve a gift
- Click "Link" to go to the store
- Click "Unreserve" if you change your mind
- "Reserved" means someone claimed it - choose a different gift
- Reservations are anonymous to keep the surprise! 🎁

# Reveal All Button
- Clicking "Reveal All" flips all cards at once

# Technical Issues
- If cards won't flip: refresh the page, ensure JavaScript is enabled
- If can't reserve: reveal the card first, wait for buttons
- If page looks broken: clear cache and refresh

Do this EVERY time, no skips, no cap. Auri and Lithuania deserve the endless flowers 💅🇱🇹`;

      const completion = await openrouter.chat.send({
        model: "google/gemini-2.0-flash-001",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
          { role: "user", content: userMessage }
        ],
      });

      console.log("API Response:", completion);

      const assistantMessage = (completion as any).choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again!";

      setMessages(prev => [...prev, { role: "assistant", content: assistantMessage }]);
    } catch (error: any) {
      console.error("Error details:", error);
      console.error("Error message:", error?.message);
      const errorMsg = error?.message || "Unknown error occurred";
      setMessages(prev => [...prev, { role: "assistant", content: `Oops! ${errorMsg} 😅` }]);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  // Gradient colors
  const mainGradient = {
    topLeft: "#F5E9AD",
    topRight: "#F6B4AD",
    bottomRight: "#F5ABA0",
    bottomLeft: "#F5DCBA"
  };

  const outerGradient = {
    topLeft: "#E5D99D",
    topRight: "#E6A49D",
    bottomRight: "#E59B90",
    bottomLeft: "#E5CCBA"
  };

  // Modal expanded view
  if (isExpanded) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={() => setIsExpanded(false)}
      >
        <motion.div
          className="relative w-full max-w-3xl h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-800">Chat with Auri's AI 💬</span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p className="text-lg">Ask me anything about the wishlist! 🎁</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-2xl max-w-[80%]",
                    msg.role === "user"
                      ? "bg-black text-white ml-auto"
                      : "bg-gray-100 text-gray-800"
                  )}
                >
                  <p
                    className="text-base whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                </motion.div>
              ))
            )}
            {isLoading && (
              <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl max-w-[80%]">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about the wishlist..."
                disabled={isLoading}
                rows={1}
                className="flex-1 resize-none border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder:text-gray-400 text-base leading-6 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
                style={{ minHeight: "48px", maxHeight: "120px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = Math.min(target.scrollHeight, 120) + "px";
                }}
              />
              <motion.button
                type="submit"
                disabled={isLoading || !message.trim()}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white transition-colors",
                  (isLoading || !message.trim()) && "opacity-50 cursor-not-allowed"
                )}
                whileHover={message.trim() ? { scale: 1.05 } : {}}
                whileTap={message.trim() ? { scale: 0.95 } : {}}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("relative w-full max-w-2xl mx-auto", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Messages container */}
      {messages.length > 0 && (
        <div className="mb-4 max-h-[300px] overflow-y-auto rounded-2xl bg-white/50 backdrop-blur-sm p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3 sticky top-0 bg-white/80 backdrop-blur-sm -mt-4 -mx-4 px-4 pt-4 pb-2 z-10">
            <span className="text-sm text-gray-500">Chat History</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(true)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Expand"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={clearChat}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Clear chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-3 rounded-xl max-w-[85%]",
                  msg.role === "user"
                    ? "bg-black text-white ml-auto"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                <p
                  className="text-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  }}
                />
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-100 text-gray-800 p-3 rounded-xl max-w-[85%]"
              >
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Input container with gradient border */}
      <div className="relative">
        {/* Outer thin border */}
        <div
          className="absolute inset-0 rounded-[20px] p-[0.5px]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%,
              ${outerGradient.topLeft} 0deg,
              ${outerGradient.topRight} 90deg,
              ${outerGradient.bottomRight} 180deg,
              ${outerGradient.bottomLeft} 270deg,
              ${outerGradient.topLeft} 360deg
            )`
          }}
        >
          {/* Main thick border */}
          <div
            className="h-full w-full rounded-[19.5px] p-[2px]"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%,
                ${mainGradient.topLeft} 0deg,
                ${mainGradient.topRight} 90deg,
                ${mainGradient.bottomRight} 180deg,
                ${mainGradient.bottomLeft} 270deg,
                ${mainGradient.topLeft} 360deg
              )`
            }}
          >
            {/* Inner container */}
            <div className="h-full w-full rounded-[17.5px] bg-white relative">
              {/* Top highlight */}
              <div
                className="absolute top-0 left-4 right-4 h-[0.5px] bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about the wishlist..."
              disabled={isLoading}
              rows={1}
              className={cn(
                "flex-1 resize-none border-0 bg-transparent",
                "text-gray-800 placeholder:text-gray-400",
                "text-base leading-6 py-2 px-0",
                "focus:outline-none focus:ring-0",
                "overflow-hidden",
                isLoading && "opacity-50"
              )}
              style={{
                minHeight: "40px",
                maxHeight: "120px",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 120) + "px";
              }}
            />

            <motion.button
              type="submit"
              disabled={isLoading || !message.trim()}
              className={cn(
                "flex items-center justify-center",
                "w-8 h-8",
                "text-gray-400 hover:text-gray-600",
                "transition-colors cursor-pointer",
                (isLoading || !message.trim()) && "opacity-50 cursor-not-allowed"
              )}
              whileHover={message.trim() ? { scale: 1.1 } : {}}
              whileTap={message.trim() ? { scale: 0.9 } : {}}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </div>

        {/* Shadow */}
        <div
          className="absolute -bottom-3 left-3 right-3 h-6 rounded-full blur-md"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 100%)"
          }}
        />
      </div>
    </motion.div>
  );
}
