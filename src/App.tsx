import { useEffect, useState, useRef } from "react";
import {
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Keyboard,
  Compass,
  Cpu,
  MonitorPlay,
  Hammer,
  ShieldCheck,
  Award,
  Download,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import CanvasBackground from "./components/CanvasBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import AiAssistant from "./components/AiAssistant";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [matrixMode, setMatrixMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("LOCATING_COGNITIVE_GRID");
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Trailing mouse cursor coordinate state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  // Tracks active scrolling sections to auto-highlight nav active tab
  const [activeSection, setActiveSection] = useState("hero");

  // Retro sound synthesizer using native Web Audio API
  const playBeep = (freq: number = 650, duration: number = 0.08, type: OscillatorType = "sine") => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  // Trailing cursor tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Set up active section observer and bootstrap visitor analytics
  useEffect(() => {
    // 1. Log visit event
    fetch("/api/analytic/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "visit" }),
    }).catch(() => {});

    // 2. Load theme preferences
    const cachedTheme = localStorage.getItem("mawiya_theme");
    if (cachedTheme === "light" || cachedTheme === "dark") {
      setTheme(cachedTheme);
    } else {
      setTheme("dark");
    }

    // 3. Section Tracker Observer
    const sections = ["hero-section", "about-section", "skills-section", "projects-section", "resume-section", "contact-section", "admin-section"];
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "hero-section") setActiveSection("hero");
          if (id === "about-section") setActiveSection("about");
          if (id === "skills-section") setActiveSection("skills");
          if (id === "projects-section") setActiveSection("projects");
          if (id === "resume-section") setActiveSection("credentials");
          if (id === "contact-section") setActiveSection("contact");
          if (id === "admin-section") setActiveSection("portal");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // 4. Keyboard Shortcuts / Easter Egg handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setMatrixMode((prev) => {
          const next = !prev;
          playBeep(next ? 400 : 700, 0.25, "square");
          return next;
        });
      }
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSoundEnabled((prev) => {
          const next = !prev;
          if (next) {
            // Test beep
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
              const c = new AudioCtx();
              const o = c.createOscillator();
              o.connect(c.destination);
              o.start();
              o.stop(c.currentTime + 0.1);
            }
          }
          return next;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [soundEnabled]);

  // Handle hacker bootloading simulation
  useEffect(() => {
    let currentPercent = 0;
    const statusSteps = [
      { p: 10, msg: "MOUNTING_PYTHON_DJANGO_KERNELS" },
      { p: 35, msg: "HARNESSING_TENSOR_FLOW_NEURAL_SYNAPSES" },
      { p: 60, msg: "PARSING_GITHUB_PROFILE_METRICS" },
      { p: 85, msg: "LAUNCHING_JARVIS_COGNITIVE_CORES" },
      { p: 100, msg: "SYSTEMS_STABLE_READY_ACCESS" },
    ];

    const timer = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 8) + 3;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          playBeep(900, 0.18, "sine");
        }, 350);
      }
      setLoadingPercent(currentPercent);

      const step = statusSteps.find((s) => currentPercent <= s.p);
      if (step) {
        setLoadingStatus(step.msg);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("mawiya_theme", nextTheme);
    playBeep(nextTheme === "light" ? 850 : 500, 0.1);

    // Save analytics
    fetch("/api/analytic/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "theme", metadata: nextTheme }),
    }).catch(() => {});
  };

  const handleScrollTo = (sectionId: string) => {
    playBeep(720, 0.05);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadResume = () => {
    playBeep(1000, 0.15, "square");
    fetch("/api/analytic/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "download", metadata: "mawiya_resume_pushed" }),
    }).catch(() => {});

    // Direct dynamic generation of printed resume text fallback
    const resumeUrl = "/metadata.json"; // custom pointer, trigger system print dialogue or download backup
    
    // Create a dynamic text downloader to save index
    const textBlobStr = `===========================================
MUHAMMAD MAWIYA - AI ENGINEER & PYTHON FULL STACK DEVELOPER
===========================================
- Phone: 0337-0338321
- Email: muhammadmawiya5@gmail.com
- Github: https://github.com/mawiya-47
- Location: Karachi, Pakistan

ACADEMICS:
* BS Artificial Intelligence (VSAI) at University of Karachi (UBIT), 2025-Present
* Diploma in Artificial Intelligence at NED University, Ongoing

SKILLS:
* AI/ML: Python, TensorFlow, PyTorch, Scikit-Learn, NumPy, LLM Automation
* Backend: Django, Flask, FastAPI, REST Design
* Frontend: React, Vite, Tailwind CSS, JavaScript
* DevOps: Docker, Linux, Git, MySQL, Nginx

PROJECTS:
1. JARVIS Virtual Assistant: Voice Automation (Python/NLP)
2. NEXUS: University Student portal (Django/MySQL)
3. Cyber Neural OS: Cybersecurity simulation web layout
4. Drive Sphere Motors: Immersive specs viewport
===========================================`;

    const blob = new Blob([textBlobStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Muhammad_Mawiya_AI_Resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const navTabs = [
    { label: "Core", targetId: "hero-section", key: "hero", icon: Compass },
    { label: "History", targetId: "about-section", key: "about", icon: Cpu },
    { label: "Matrix", targetId: "skills-section", key: "skills", icon: Hammer },
    { label: "Systems", targetId: "projects-section", key: "projects", icon: MonitorPlay },
    { label: "Credentials", targetId: "resume-section", key: "credentials", icon: Award },
    { label: "Contact", targetId: "contact-section", key: "contact", icon: Sparkles },
    { label: "Portal", targetId: "admin-section", key: "portal", icon: ShieldCheck },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] text-cyan-400 z-999 flex flex-col justify-center items-center p-6 select-none font-mono">
        <div className="space-y-6 max-w-lg w-full text-center">
          {/* Futuristic hologram glyph */}
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-[#00f2fe]/40 flex items-center justify-center animate-[spin_10s_linear_infinite]">
              <div className="w-8 h-8 rounded-full bg-[#00f2fe]/20 flex items-center justify-center animate-pulse">
                <span className="text-[12px] font-bold text-[#00f2fe]">&lambda;</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-white font-sans text-xl font-extrabold tracking-widest uppercase">
              COGNITIVE ROOT LOCK IN PROGRESS
            </div>
            <div className="text-[10px] text-cyan-400/80 tracking-widest animate-pulse font-mono">
              STATUS: {loadingStatus}
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-4">
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold tracking-wider">
              <span>ROOT_INITIALIZING</span>
              <span>{loadingPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0d0d0d] border border-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-cyan-500 to-[#00f2fe] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(0,242,254,0.6)]"
                style={{ width: `${loadingPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-slate-50 text-slate-900" : "bg-[#050505] text-[#E0E0E0]"} relative transition-colors duration-350 scan-glow`}>
      
      {/* Floating neon Cursor halo */}
      <div
        className="glow-cursor hidden md:block"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: isHovered ? "32px" : "14px",
          height: isHovered ? "32px" : "14px",
          borderColor: isHovered ? "#ef4444" : "#00f2fe",
          boxShadow: isHovered ? "0 0 16px rgba(239, 68, 68, 0.6)" : "0 0 10px rgba(0, 242, 254, 0.4)",
        }}
      />

      {/* Interactive nodes particle ecosystem background */}
      <CanvasBackground theme={theme} matrixMode={matrixMode} />

      {/* Cyber HUD Floating Top Banner Nav Bar */}
      <header
        id="print-exclude"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[92%] bg-[#050505]/80 border border-white/10 backdrop-blur-md p-2 px-3 sm:px-4 rounded-xl flex items-center justify-between shadow-lg"
      >
        {/* Hacker logo initials */}
        <button
          onClick={() => handleScrollTo("hero-section")}
          className="font-mono text-xs font-bold text-[#00f2fe] tracking-widest hover:scale-103 active:scale-97 transition-all cursor-pointer flex items-center gap-1 bg-transparent border-0 outline-none"
        >
          <span>MAWIYA://AI_</span>
        </button>

        {/* Central sliding links list */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-[10px] font-bold uppercase">
          {navTabs.map((tab) => {
            const ActiveIcon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => handleScrollTo(tab.targetId)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer outline-none ${
                  activeSection === tab.key
                    ? "bg-[#00f2fe] text-slate-950 shadow-[0_0_8px_rgba(0,242,254,0.3)] font-bold scale-102"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <ActiveIcon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* System parameters settings (Sound, theme, Matrix mode toggles) */}
        <div className="flex items-center gap-1.5">
          {/* Sound toggle trigger */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) {
                // Test a quick confirm beep
                try {
                  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                  const c = new AudioCtx();
                  const o = c.createOscillator();
                  o.connect(c.destination);
                  o.start();
                  o.stop(c.currentTime + 0.1);
                } catch (e) {}
              }
            }}
            title={soundEnabled ? "Disable SFX Synth" : "Enable SFX Synth"}
            className={`p-2 rounded-lg border transition-all cursor-pointer outline-none ${
              soundEnabled
                ? "border-[#00f2fe]/40 bg-[#00f2fe]/10 text-[#00f2fe]"
                : "border-slate-800 bg-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Matrix green raindrops code simulator toggle */}
          <button
            onClick={() => {
              setMatrixMode(!matrixMode);
              playBeep(matrixMode ? 700 : 400, 0.2, "sawtooth");
            }}
            title={matrixMode ? "Disable Matrix Rain" : "Activate Matrix Drops"}
            className={`p-2 rounded-lg border transition-all cursor-pointer outline-none hidden sm:block ${
              matrixMode
                ? "border-green-500 bg-green-500/10 text-green-400"
                : "border-slate-800 bg-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <span>&lambda;_M</span>
          </button>

          {/* Quick theme toggles */}
          <button
            onClick={toggleTheme}
            className="p-2 border border-slate-800 hover:border-slate-600 rounded-lg text-slate-400 hover:text-[#00f2fe] bg-transparent cursor-pointer outline-none transition-all"
            title="Switch Core Luminosity"
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Keyboard shortcut list toggle overlay */}
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="p-2 border border-slate-800 hover:border-slate-600 rounded-lg text-slate-500 hover:white bg-transparent cursor-pointer outline-none transition-all"
            title="System Command Keyboard Keys"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Dialog overlay indicating command keys shortcuts */}
      {showShortcuts && (
        <div className="fixed inset-0 bg-black/60 z-99 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 font-mono text-xs text-slate-300 space-y-4">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase border-b border-white/10 pb-2">COMMANDS_TELEMETRY_SHORTCUTS</h3>
            
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span>[Ctrl + M]</span>
                <span className="text-slate-500 leading-relaxed text-[11px]">Toggle Matrix green falling code drops</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[Ctrl + K]</span>
                <span className="text-slate-500 leading-relaxed text-[11px]">Mute/Unmute local audio feedback</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[Mouse Hover]</span>
                <span className="text-slate-500 leading-relaxed text-[11px]">Hover over skills / headers to trace vector paths</span>
              </div>
            </div>

            <button
              onClick={() => setShowShortcuts(false)}
              className="w-full p-2.5 bg-[#0d0d0d] border border-white/10 hover:border-[#ef4444]/30 rounded-xl text-center text-[#ef4444] font-bold tracking-wider cursor-pointer outline-none"
            >
              DISMISS_SHEET
            </button>
          </div>
        </div>
      )}

      {/* Main Sections Body View Wrapper */}
      <main className="relative z-10 w-full overflow-x-hidden pt-12">
        <Hero
          onContactClick={() => handleScrollTo("contact-section")}
          onResumeClick={() => handleScrollTo("resume-section")}
          onResumeDownload={handleDownloadResume}
        />
        
        <About />
        
        <Skills />
        
        <Projects />
        
        <Resume onDownload={handleDownloadResume} />
        
        <Contact />
        
        <Admin />
      </main>

      {/* Dynamic Voice/Text Intelligent Chatbot MAWIYA AI */}
      <AiAssistant />

      {/* Technical cyber sub-meter absolute bottom footer */}
      <footer id="print-exclude" className="py-8 bg-[#030303] border-t border-white/10 relative z-30 font-mono text-[10px] text-slate-500 select-none">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span>© {new Date().getFullYear()} MUHAMMAD_MAWIYA. ENGINEERED_IN_KARACHI_SINDH.</span>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com/mawiya-47" target="_blank" rel="noreferrer" className="hover:text-cyan-400">GITHUB</a>
            <span>•</span>
            <a href="mailto:muhammadmawiya5@gmail.com" className="hover:text-cyan-400">SECURE_MAIL</a>
            <span>•</span>
            <button onClick={() => handleScrollTo("admin-section")} className="hover:text-cyan-400 uppercase outline-none bg-transparent">PORTAL</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
