import React, { useEffect, useState } from "react";
import { Terminal, Shield, Eye, Mail, Download, Users, RefreshCw, BarChart2, MessageCircle, AlertTriangle, ShieldCheck } from "lucide-react";
import { AdminStats } from "../types";

export default function Admin() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBypassed, setIsBypassed] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [errorText, setErrorText] = useState("");

  const loadStats = () => {
    setIsLoading(true);
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((e) => console.error("Error loaded stats logs", e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isBypassed) {
      loadStats();
    }
  }, [isBypassed]);

  const handleBypass = () => {
    setIsBypassed(true);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authToken === "1234" || authToken.toLowerCase() === "admin") {
      setIsBypassed(true);
      setErrorText("");
    } else {
      setErrorText("IDENTITY REJECTED: INVALID ROOT TOKEN PROTOCOLS.");
    }
  };

  return (
    <section id="admin-section" className="py-20 px-6 md:px-12 bg-transparent relative z-10 scroll-mt-16 select-text">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title row */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5 animate-pulse" />
            <span>Operational Console</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
            Admin Command Central
          </h2>
          <div className="h-0.5 w-16 bg-[#00f2fe] mx-auto md:mx-0"></div>
        </div>

        {/* Lock Screen Terminal Gate */}
        {!isBypassed ? (
          <div className="max-w-md mx-auto bg-white/3 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl space-y-6 text-center leading-relaxed">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#ef4444]/20 blur-lg rounded-full animate-pulse"></div>
                <Users className="w-10 h-10 text-[#ef4444] relative z-10" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-white tracking-widest uppercase">ROOT SECURE LINK GATE</h3>
                <p className="text-[9px] font-mono text-slate-500">AUTHORIZED_RECRUITERS_ONLY</p>
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-400">
              Entering the secure admin matrix monitors active visitor pings, download counts, email contact payloads, and cognitive chatbots conversation logs.
            </p>

            <form onSubmit={handleCredentialsSubmit} className="space-y-3 pt-2">
              <input
                type="password"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Enter access code (e.g. 'admin')"
                className="w-full bg-[#0d0d0d] border border-white/10 text-white rounded-lg p-2.5 text-xs text-center font-mono focus:border-[#ef4444] focus:outline-none transition-all focus:ring-1 focus:ring-[#ef4444]/20"
              />

              {errorText && (
                <div className="text-[10px] font-mono text-[#ef4444] animate-bounce flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{errorText}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={handleBypass}
                  className="p-2 bg-linear-to-r from-cyan-500 to-[#00f2fe] text-slate-950 font-bold uppercase rounded-lg border border-cyan-400 hover:opacity-90 outline-none hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all cursor-pointer"
                >
                  BYPASS ENCRYPTIONS
                </button>

                <button
                  type="submit"
                  className="p-2 bg-[#0a0a0a] border border-white/10 hover:border-slate-400 text-slate-300 font-bold uppercase rounded-lg cursor-pointer outline-none transition-all"
                >
                  INITIALIZE KEY
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Actual Dashboard */
          <div className="space-y-8">
            {/* Top Stats Overview banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/3 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md">
                <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/20 text-[#00f2fe] rounded-lg">
                  <Eye className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Total Visits</span>
                  <div className="text-xl font-bold font-mono text-white">
                    {isLoading ? "..." : stats?.visitorCount || 0}
                  </div>
                </div>
              </div>

              <div className="bg-white/3 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md">
                <div className="p-2.5 bg-green-950/40 border border-green-500/20 text-green-400 rounded-lg">
                  <Download className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">CV Downloads</span>
                  <div className="text-xl font-bold font-mono text-white">
                    {isLoading ? "..." : stats?.downloadsCount || 0}
                  </div>
                </div>
              </div>

              <div className="bg-white/3 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md">
                <div className="p-2.5 bg-[#ef4444]/10 border border-[#ef4444]/20 text-[#ef4444] rounded-lg">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Inquire Mails</span>
                  <div className="text-xl font-bold font-mono text-white">
                    {isLoading ? "..." : stats?.messages.length || 0}
                  </div>
                </div>
              </div>

              <div className="bg-white/3 border border-white/10 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md">
                <div className="p-2.5 bg-yellow-950/40 border border-yellow-500/20 text-yellow-500 rounded-lg">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Chatlogs Tally</span>
                  <div className="text-xl font-bold font-mono text-white">
                    {isLoading ? "..." : stats?.chatLogs.length || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Core Body grids */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Email Queries Inbox */}
              <div className="lg:col-span-6 bg-white/3 border border-white/10 p-5 md:p-6 rounded-2xl space-y-4 backdrop-blur-sm shadow-xl min-h-100">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div>
                    <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">Recruiter Inbox</h3>
                    <p className="text-[10px] font-mono text-slate-500">INBOUND_TELEMETRY_EMAILS</p>
                  </div>

                  <button
                    onClick={loadStats}
                    disabled={isLoading}
                    className="p-1.5 border border-slate-800 rounded bg-slate-950 text-slate-400 hover:text-white transition-all cursor-pointer outline-none"
                    title="Reload data grid"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                {isLoading ? (
                  <div className="text-center py-10 text-xs font-mono text-slate-500">Synchronizing records...</div>
                ) : !stats || stats.messages.length === 0 ? (
                  <div className="text-center py-10 text-xs font-mono text-slate-500">No telemetry messages received yet.</div>
                ) : (
                  <div className="space-y-4 max-h-90 overflow-y-auto pr-2 scrollbar-thin">
                    {stats.messages.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/1 border border-white/10 p-4 rounded-xl space-y-2 font-mono text-xs hover:border-slate-500 transition-all select-text leading-relaxed"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1 text-[9px] text-[#00f2fe]/80 border-b border-slate-900 pb-1.5">
                          <span>Sender: {item.name.toUpperCase()}</span>
                          <span>{new Date(item.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="text-slate-300 font-sans leading-relaxed text-xs">
                          {item.message}
                        </div>
                        <div className="text-[9px] text-slate-400 text-right pt-1 group-hover:underline">
                          Reply target: <a href={`mailto:${item.email}`} className="text-cyan-400 hover:underline">{item.email}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: AI Conversation Logs */}
              <div className="lg:col-span-6 bg-white/3 border border-white/10 p-5 md:p-6 rounded-2xl space-y-4 backdrop-blur-sm shadow-xl min-h-100">
                <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                  <div>
                    <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">MAWIYA AI LOGS</h3>
                    <p className="text-[10px] font-mono text-slate-500">COGNITIVE_CHAT_TELEMETRY</p>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded border border-[#00ff66]/30">
                    <ShieldCheck className="w-3 h-3 text-[#00ff66] animate-pulse" />
                    <span>SYS_SECURE</span>
                  </div>
                </div>

                {isLoading ? (
                  <div className="text-center py-10 text-xs font-mono text-slate-500">Synthesizing node logs...</div>
                ) : !stats || stats.chatLogs.length === 0 ? (
                  <div className="text-center py-10 text-xs font-mono text-slate-500">No chatbot telemetry logged yet.</div>
                ) : (
                  <div className="space-y-4 max-h-90 overflow-y-auto pr-2 scrollbar-thin">
                    {stats.chatLogs.map((log) => (
                      <div
                        key={log.id}
                        className="bg-white/3 border border-white/10 p-3.5 rounded-xl space-y-2.5 font-mono text-[10.5px] select-text leading-relaxed"
                      >
                        <div className="flex items-center justify-between text-[8.5px] text-slate-500 uppercase tracking-widest">
                          <span>ID: {log.session.substring(0, 8)}</span>
                          <span>Time: {new Date(log.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-cyan-400 bg-cyan-950/20 border-l-2 border-[#00f2fe] pl-2 break-all py-0.5">
                          <span className="text-[9px] text-slate-500 block uppercase">Query:</span>
                          {log.query}
                        </div>
                        <div className="text-slate-300 bg-slate-950 border-l border-slate-800 pl-2 py-0.5">
                          <span className="text-[9px] text-slate-500 block uppercase">Reply:</span>
                          {log.reply}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Traffic Analytics visual columns */}
            {stats && stats.trafficAnalytics && stats.trafficAnalytics.length > 0 && (
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4 backdrop-blur-md">
                <div>
                  <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">Weekly Traffic Flow</h3>
                  <p className="text-[10px] font-mono text-cyan-400">PAGE_VIRTUAL_PINGS_TALLY</p>
                </div>

                <div className="flex items-end justify-between h-36 gap-2 pt-6 font-mono text-[10px] max-w-xl">
                  {stats.trafficAnalytics.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="text-[9px] text-cyan-300 font-bold">{day.visits}</div>
                      {/* CSS Column */}
                      <div
                        className="w-full bg-linear-to-t from-cyan-600 to-[#00f2fe] rounded-t hover:brightness-110 shadow-[0_0_8px_rgba(0,242,254,0.3)] min-h-1 transition-all duration-1000"
                        style={{ height: `${Math.min(100, (day.visits / 50) * 100)}%` }}
                      />
                      <div className="text-slate-500 text-[9px] font-mono uppercase shrink-0 truncate max-w-full">
                        {day.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
