import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Share2, Sparkles, Navigation } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (e) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const phoneRaw = "0337-0338321";
  const emailRaw = "muhammadmawiya5@gmail.com";
  // WhatsApp link formatting: 923370338321 (Pakistan phone prefix 92)
  const whatsAppLink = "https://wa.me/923370338321?text=Hello%20Muhammad%20Mawiya,%20I%20viewed%20your%20awesome%20AI%20Portfolio!";

  return (
    <section id="contact-section" className="py-20 px-6 md:px-12 bg-transparent relative z-10 scroll-mt-16 select-text">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title row */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
            <Share2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Telemetry Link Ingress</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
            Connect Secure Channels
          </h2>
          <div className="h-0.5 w-16 bg-[#00f2fe] mx-auto md:mx-0"></div>
        </div>

        {/* Contact panel split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Direct channel details + Vector HUD coordinate box */}
          <div className="lg:col-span-5 bg-white/[0.03] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 backdrop-blur-md shadow-xl">
            <div>
              <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-2">Direct Audio-Data Relays</h3>
              <p className="text-[10px] font-mono text-cyan-400">ACTIVE_TELEPHONY_CHANNELS</p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp direct thread */}
              <button
                onClick={() => window.open(whatsAppLink, "_blank")}
                className="w-full p-4 rounded-xl border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-green-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer group hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.25)] outline-none"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <span>Secure WhatsApp Chat</span>
                </span>
                <span className="text-[10px] bg-green-500/15 border border-green-500/30 p-1 px-2.5 rounded-full text-green-300">
                  +92_337_0338321
                </span>
              </button>

              {/* Email relay */}
              <a
                href={`mailto:${emailRaw}`}
                className="w-full p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all cursor-pointer group hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)]"
              >
                <sub className="flex items-[#00f2fe] gap-2">
                  <Mail className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>Send Secure Mail</span>
                </sub>
                <span className="text-[10px] bg-cyan-500/15 border border-cyan-500/30 p-1 px-2.5 rounded-full text-cyan-300 lowercase block font-sans">
                  muhammadmawiya5@gmail.com
                </span>
              </a>
            </div>

            <div className="h-px bg-slate-800"></div>

            {/* Vector HUD Location box indicator */}
            <div className="relative p-5 bg-white/[0.02] border border-white/10 rounded-xl overflow-hidden group">
              <div className="absolute top-2.5 right-3.5 flex items-center gap-1 font-mono text-[8px] text-slate-500 tracking-wider">
                <Navigation className="w-3 h-3 text-red-500 animate-pulse" />
                <span>COORDS_LOCKED_ Karachi, PK</span>
              </div>

              {/* Mini visual radar scan overlay */}
              <div className="space-y-3 font-mono text-xs text-slate-400 relative z-10 leading-relaxed">
                <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-widest">HQ Operational Hub</span>
                
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#ef4444] animate-bounce shrink-0" />
                  <div>
                    <span className="text-white font-sans text-xs font-bold block">Karachi, Sindh Province</span>
                    <span className="text-[9px] text-slate-500">Coordinates: 24.8607° N, 67.0011° E</span>
                  </div>
                </div>

                <div className="text-[9px] text-[#00f2fe]/80 bg-[#00f2fe]/5 p-2 rounded border border-[#00f2fe]/20 leading-loose">
                  SYSTEMS_DEPLOY: Full-stack servers connected live. Operating remote workflows globally from South Asian region node.
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Contact Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-xl relative overflow-hidden">
            <div>
              <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-2">Transmission Console</h3>
              <p className="text-[10px] font-mono text-slate-500">RECRUITERS_MESSAGE_PORTAL</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-500 font-bold uppercase block tracking-wider">Sender Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter name (e.g. Jessica)"
                    className="w-full bg-[#0d0d0d] border border-white/10 text-white rounded-lg p-3 focus:border-[#00f2fe] focus:outline-none transition-all focus:ring-1 focus:ring-[#00f2fe]/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-500 font-bold uppercase block tracking-wider">Secure Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email (e.g. jessica@corp.com)"
                    className="w-full bg-[#0d0d0d] border border-white/10 text-white rounded-lg p-3 focus:border-[#00f2fe] focus:outline-none transition-all focus:ring-1 focus:ring-[#00f2fe]/20"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-500 font-bold uppercase block tracking-wider">Telemetry Message Body</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Inquire about custom AI automation solutions or recruitment opportunities..."
                  className="w-full bg-[#0d0d0d] border border-white/10 text-white rounded-lg p-3 focus:border-[#00f2fe] focus:outline-none transition-all focus:ring-1 focus:ring-[#00f2fe]/20 font-sans leading-relaxed text-xs"
                />
              </div>

              {/* Submit triggers and notification states */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  {submitStatus === "success" && (
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Transmitted successfully! Muhammad is alerted.</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-1.5 text-xs text-[#ef4444]">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Console transmission error. Try direct email.</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  className="px-6 py-3 bg-[#00f2fe] text-slate-950 font-bold rounded-lg uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 disabled:pointer-events-none transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] border border-[#00f2fe] outline-none shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>SEND TRANSMISSION</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
