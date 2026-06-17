import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Mic, MicOff, Volume2, VolumeX, Sparkles, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakEnabled, setSpeakEnabled] = useState(false);
  const [showWaves, setShowWaves] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sessionToken = useRef(`sess-${Date.now()}`);

  const welcomeMessage: ChatMessage = {
    id: "welcome",
    sender: "ai",
    text: "Hello! I am MAWIYA AI, Muhammad Mawiya's customized digital intelligence operative. Ask me anything about his technical background, AI projects, certifications, or how to contact him.",
    timestamp: new Date().toISOString(),
  };

  useEffect(() => {
    // Load local storage chat backup
    const backup = localStorage.getItem("mawiya_chat_history");
    if (backup) {
      try {
        setMessages(JSON.parse(backup));
      } catch (e) {
        setMessages([welcomeMessage]);
      }
    } else {
      setMessages([welcomeMessage]);
    }

    // Set up Web Speech Recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
        setShowWaves(true);
      };

      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
        }
      };

      rec.onerror = () => {
        setIsListening(false);
        setShowWaves(false);
      };

      rec.onend = () => {
        setIsListening(false);
        setShowWaves(false);
      };

      speechRecognitionRef.current = rec;
    }
  }, []);

  useEffect(() => {
    // Save backup to keep logs active
    if (messages.length > 0) {
      localStorage.setItem("mawiya_chat_history", JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleVoiceInput = () => {
    if (!speechRecognitionRef.current) {
      alert("Voice recognition is not supported in this browser. Try Chrome or Safari.");
      return;
    }
    if (isListening) {
      speechRecognitionRef.current.stop();
    } else {
      speechRecognitionRef.current.start();
    }
  };

  const speakText = (text: string) => {
    if (!speakEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // clear queue
    const speech = new SpeechSynthesisUtterance(text.substring(0, 300)); // cap size to sound natural
    speech.rate = 1.05;
    speech.pitch = 0.95; // slightly lower pitch for JARVIS aesthetic
    window.speechSynthesis.speak(speech);
  };

  const fireSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputValue).trim();
    if (!textToSend || isLoading) return;

    if (!customPrompt) setInputValue("");

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Trigger analytic log
      fetch("/api/analytic/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType: "chat", metadata: textToSend }),
      }).catch(() => {});

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          session: sessionToken.current,
          history: updatedMessages.slice(-8), // send last few rounds for context
        }),
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.text,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(data.text);
    } catch (e) {
      console.error(e);
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: "ai",
        text: "My neural relays are experiencing localized latency. Please verify internet connection or contact Muhammad directly using the form below.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([welcomeMessage]);
    localStorage.removeItem("mawiya_chat_history");
  };

  const suggestions = [
    { label: "About Muhammad", prompt: "Tell me about Muhammad Mawiya" },
    { label: "Show AI Projects", prompt: "What AI and Machine learning projects has he built?" },
    { label: "Phone & Email", prompt: "What is his contact information?" },
    { label: "Resume Details", prompt: "Tell me about his university, GPA, and ongoing diplomas." },
  ];

  return (
    <>
      {/* Floating launcher trigger */}
      <motion.button
        id="ai-bot-trigger"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-[#00f2fe]/90 dark:bg-[#00f2fe]/80 text-[#0f172a] p-4 rounded-full shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.7)] cursor-pointer border border-[#00f2fe] flex items-center gap-1 hover:scale-105 active:scale-95 transition-all outline-none"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="text-xs font-bold font-mono tracking-wider ml-1 uppercase hidden md:inline">Ask Mawiya AI</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
      </motion.button>

      {/* Expanded Cyber Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-widget-panel"
            initial={{ opacity: 0, scale: 0.85, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 80 }}
            className="fixed bottom-6 right-6 z-55 w-[92vw] sm:w-[420px] h-[550px] bg-[#0d1527]/95 dark:bg-[#050505]/98 border border-[#00f2fe]/50 rounded-2xl shadow-[0_10px_40px_rgba(0,242,254,0.35)] flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Widget cyber header */}
            <div className="bg-[#0f0f0f]/95 px-4 py-3 border-b border-[#00f2fe]/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#00f2fe]/40 blur-sm animate-ping"></div>
                  <Bot className="w-6 h-6 text-[#00f2fe] relative z-10" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white tracking-widest flex items-center gap-1.5">
                    MAWIYA_AI <span className="text-[10px] text-[#00e5ff] px-1.5 py-0.5 rounded border border-[#00f2fe]/40 bg-[#00f2fe]/10 animate-pulse">v2.5</span>
                  </h3>
                  <p className="text-[10px] font-mono text-[#00e5ff]/75">CYBER_PERSONAL_AGENT_ONLINE</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Audio voice response toggle */}
                <button
                  onClick={() => {
                    setSpeakEnabled(!speakEnabled);
                    if (!speakEnabled && window.speechSynthesis) {
                      const sp = new SpeechSynthesisUtterance("Voice output activated");
                      window.speechSynthesis.speak(sp);
                    }
                  }}
                  title={speakEnabled ? "Mute Voice Output" : "Enable Voice Output"}
                  className={`p-1.5 rounded border transition-all ${
                    speakEnabled
                      ? "border-[#00f2fe] bg-[#00f2fe]/10 text-[#00f2fe]"
                      : "border-slate-700 bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  {speakEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Reset button */}
                <button
                  onClick={clearChat}
                  title="Reset thread log"
                  className="p-1 px-2 rounded border border-[#ef4444]/30 hover:border-[#ef4444] bg-transparent text-xs font-mono text-[#ef4444]/80 hover:text-white transition-all"
                >
                  RESET
                </button>

                {/* Close window */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message window content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 px-4 text-xs font-mono select-text transition-all ${
                      msg.sender === "user"
                        ? "bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-cyan-200 rounded-tr-none"
                        : "bg-white/[0.02] border border-white/10 text-slate-300 rounded-tl-none leading-relaxed"
                    }`}
                  >
                    <div className="flex items-center justify-between opacity-50 text-[9px] mb-1">
                      <span>{msg.sender === "user" ? "OPERATOR" : "AI_AGENT"}</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.02] border border-white/10 text-slate-400 rounded-2xl rounded-tl-none p-3 px-4 text-xs font-mono flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#00f2fe] animate-spin" />
                    <span>Synchronizing cognitive node patterns...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Chip list */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-[10px] font-mono font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Suggested Queries:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => fireSendMessage(item.prompt)}
                      className="text-[10px] font-mono bg-white/[0.02] border border-white/10 hover:border-[#00f2fe] hover:bg-[#00f2fe]/5 text-cyan-400 hover:text-white p-1 px-2.5 rounded-full transition-all cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sound Wave Input Form */}
            {showWaves && (
              <div className="px-4 py-1.5 bg-[#00f2fe]/5 border-t border-[#00f2fe]/20 flex items-center justify-center gap-1">
                <span className="text-[10px] font-mono text-cyan-400 animate-pulse tracking-wide mr-2">MAWIYA_RECORDER_ACTIVE: Voice input listening...</span>
                <div className="flex items-center gap-0.5 h-3">
                  <div className="w-0.5 h-full bg-[#00f2fe] animate-[ping_1s_infinite]"></div>
                  <div className="w-0.5 h-2/3 bg-[#00f2fe] animate-[ping_1.2s_infinite]"></div>
                  <div className="w-0.5 h-full bg-[#00f2fe] animate-[ping_0.8s_infinite]"></div>
                  <div className="w-0.5 h-1/2 bg-[#00f2fe] animate-[ping_1.5s_infinite]"></div>
                </div>
              </div>
            )}

            {/* Message input footer form */}
            <div className="p-3 bg-[#060606] border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-2.5 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  isListening
                    ? "border-[#ef4444] bg-[#ef4444]/10 text-[#ef4444] animate-pulse"
                    : "border-white/10 bg-[#0d0d0d] text-slate-400 hover:text-[#00f2fe] hover:border-[#00f2fe]"
                }`}
                title={isListening ? "Stop Voice Input" : "Start Voice Input"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") fireSendMessage();
                  }}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask and press Enter..."
                  className="w-full bg-[#0d0d0d] border border-white/10 text-white rounded-lg pl-3 pr-10 py-2 text-xs font-mono focus:border-[#00f2fe] focus:outline-none transition-all focus:ring-1 focus:ring-[#00f2fe]/20"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => fireSendMessage()}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00f2fe]"
                  disabled={isLoading}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
