import { useState } from "react";
import { Download, Printer, Award, FileText, ChevronRight, Briefcase, Calendar, GraduationCap } from "lucide-react";
import { EXPERIENCE_TIMELINE, CERTIFICATIONS } from "../data";

interface ResumeProps {
  onDownload: () => void;
}

export default function Resume({ onDownload }: ResumeProps) {
  const [activeTab, setActiveTab] = useState<"experience" | "certifications">("experience");

  // Print command handler
  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="resume-section" className="py-20 px-6 md:px-12 bg-transparent relative z-10 scroll-mt-16 select-text">
      {/* Clean printable resume stylesheet injected just for this section under window.print() */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume-container, #printable-resume-container * {
            visibility: visible;
          }
          #printable-resume-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            margin: 0;
            padding: 24px;
            font-size: 11px;
            line-height: 1.4;
          }
          #print-exclude, #chat-widget-panel, #ai-bot-trigger {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="print-exclude">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 animate-pulse" />
              <span>Dossier Resume & Accreditations</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
              Professional Credentials
            </h2>
            <div className="h-0.5 w-16 bg-[#00f2fe] mx-auto md:mx-0"></div>
          </div>

          {/* Download & Print Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handlePrint}
              className="p-2.5 px-4 bg-slate-900 border border-slate-800 hover:border-slate-400 text-slate-300 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer outline-none"
            >
              <Printer className="w-4 h-4" />
              <span>Print CV</span>
            </button>

            <button
              onClick={onDownload}
              className="p-2.5 px-4 bg-[#00f2fe]/10 border border-[#00f2fe]/40 hover:border-[#00f2fe] text-[#00f2fe] hover:bg-[#00f2fe]/20 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer outline-none"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Dynamic section selection list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="print-exclude">
          
          {/* Tab Selector & Overview details */}
          <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 p-6 rounded-2xl flex flex-col justify-between backdrop-blur-md shadow-xl">
            <div className="space-y-4">
              <div>
                <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">Milestone Chronology</h3>
                <p className="text-[10px] font-mono text-cyan-400">SELECTS_ACCORDION_VIEW</p>
              </div>

              {/* Selection menu */}
              <div className="flex flex-col gap-2 font-mono text-xs pt-2">
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "experience"
                      ? "bg-[#0f0f0f] border-[#00f2fe] text-[#00f2fe] shadow-[0_0_10px_rgba(0,242,254,0.1)]"
                      : "bg-transparent border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span>PROFESSIONAL TIMELINE</span>
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "experience" ? "rotate-90 text-[#00f2fe]" : "text-slate-600"}`} />
                </button>

                <button
                  onClick={() => setActiveTab("certifications")}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === "certifications"
                      ? "bg-[#0f0f0f] border-[#00f2fe] text-[#00f2fe] shadow-[0_0_10px_rgba(0,242,254,0.1)]"
                      : "bg-transparent border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>CERTIFICATIONS</span>
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "certifications" ? "rotate-90 text-[#00f2fe]" : "text-slate-600"}`} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-400 space-y-2 mt-6">
              <span className="text-[10px] font-mono text-[#ef4444] block font-bold uppercase tracking-widest">DID YOU KNOW?</span>
              <p className="text-[11px] leading-relaxed">
                You can press the **Print CV** button to trigger your system's output drawer and save the resume as a formatted clean vector document.
              </p>
            </div>
          </div>

          {/* Large container of current selections */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-xl flex flex-col justify-start min-h-[400px]">
            {activeTab === "experience" ? (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">Experience History</h3>
                  <p className="text-[10px] font-mono text-slate-500">CHRONOLOGICAL_MILESTONE_LIST</p>
                </div>

                <div className="space-y-6 relative border-l border-slate-800/80 pl-6">
                  {EXPERIENCE_TIMELINE.map((item, idx) => (
                    <div key={idx} className="relative space-y-1.5 pb-2">
                      {/* Active locator node */}
                      <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-4 ring-slate-950/90 shadow-[0_0_8px_rgba(0,242,254,0.6)]"></div>

                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="text-white font-sans text-sm font-bold">{item.role}</span>
                        <span className="text-[9px] font-mono font-medium tracking-wide bg-slate-950 border border-slate-800/80 p-0.5 px-2 rounded-full text-[#00f2fe]/90">
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                        <span>{item.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.duration}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-slate-400 leading-relaxed pt-1.5">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">Accredited Certifications</h3>
                  <p className="text-[10px] font-mono text-slate-500">TRUSTED_AUTHORITIES_LIST</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div
                      key={idx}
                      className="bg-white/[0.02] border border-white/10 p-4 rounded-xl flex flex-col justify-between group hover:border-[#00f2fe]/40 transition-all cursor-pointer leading-relaxed"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between font-mono text-[9px] text-[#00f2fe]/90 bg-[#00f2fe]/5 p-1 rounded">
                          <span>{cert.badge}</span>
                          <span className="font-bold">{cert.date}</span>
                        </div>
                        <h4 className="font-sans text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {cert.title}
                        </h4>
                        <p className="font-sans text-[11px] text-slate-400">
                          {cert.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/60 font-mono text-[9px] text-slate-500 uppercase tracking-wider mt-3">
                        Issuer: {cert.issuer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Printable/Preview Resume Paper Layout */}
        <div
          id="printable-resume-container"
          className="hidden bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl leading-relaxed font-sans max-w-4xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-750 pb-5">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-white">Muhammad Mawiya</h1>
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest leading-relaxed">
                AI Engineer • Machine Learning Developer • Full Stack Python Developer
              </p>
            </div>
            <div className="text-left md:text-right font-mono text-[10px] text-slate-400 space-y-0.5 mt-3 md:mt-0 leading-relaxed">
              <div>Phone: 0337-0338321</div>
              <div>Email: muhammadmawiya5@gmail.com</div>
              <div>Location: Karachi, Pakistan</div>
              <div>GitHub: https://github.com/mawiya-47</div>
            </div>
          </div>

          {/* Quick Summary segment */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-wider">Professional Profile</h3>
            <p className="text-xs text-slate-300">
              Passionate AI Engineer and Full Stack Python Developer currently pursuing BS Artificial Intelligence and Diploma in AI. Specialized in automated AI systems, advanced machine learning tools, intelligent assistant algorithms, full-stack website orchestration (Django/FastAPI), and practical optimization workflows.
            </p>
          </div>

          {/* Education & Experience parallel grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center justify-between">
                <span>Education Background</span>
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-white leading-relaxed">
                    <span>BS Artificial Intelligence</span>
                    <span className="font-mono text-[10px] text-slate-400">2025 - Present</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">University of Karachi (UBIT) • GPA: Active</div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-white leading-relaxed">
                    <span>Diploma in Artificial Intelligence</span>
                    <span className="font-mono text-[10px] text-slate-400">Ongoing</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">NED University of Engineering and Technology</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center justify-between">
                <span>Frameworks Portfolio Summary</span>
                <span>🛠️</span>
              </h3>

              <div className="text-xs text-slate-300 grid grid-cols-2 gap-2 leading-relaxed font-mono">
                <div>• Django / FastAPI</div>
                <div>• TensorFlow / PyTorch</div>
                <div>• Scikit-Learn</div>
                <div>• React / Vite</div>
                <div>• NumPy & Pandas</div>
                <div>• Docker & DevOps</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-wider border-b border-slate-800 pb-1 flex items-center justify-between">
              <span>Experience Chronology Overview</span>
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            </h3>

            <div className="space-y-4 text-xs">
              {EXPERIENCE_TIMELINE.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-white font-bold leading-relaxed">
                    <span>{item.role} @ {item.company}</span>
                    <span className="font-mono text-[10px] text-slate-400">{item.duration}</span>
                  </div>
                  <p className="text-clip text-slate-400 text-[11px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
