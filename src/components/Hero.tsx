import { useEffect, useState, useRef } from "react";
import { Download, MessageSquare, Terminal, Github, Bot, Server, ShieldCheck, Heart } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onContactClick: () => void;
  onResumeClick: () => void;
  onResumeDownload: () => void;
}

export default function Hero({ onContactClick, onResumeClick, onResumeDownload }: HeroProps) {
  const [profile, setProfile] = useState<any>({
    login: "mawiya-47",
    public_repos: 12,
    followers: 47,
    html_url: "https://github.com/mawiya-47",
  });
  
  const [roleText, setRoleText] = useState("");
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const roles = ["AI Software Architect", "Machine Learning Operator", "Full Stack Python Developer", "Automation Strategist"];

  const orbitCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fetch GitHub profile info
  useEffect(() => {
    fetch("/api/github/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((e) => console.warn("Fallback profiles loaded", e));

    // Dynamic typewriter loop
    const typeWriter = () => {
      const currentRole = roles[roleIndex.current];
      if (isDeleting.current) {
        setRoleText(currentRole.substring(0, charIndex.current - 1));
        charIndex.current--;
      } else {
        setRoleText(currentRole.substring(0, charIndex.current + 1));
        charIndex.current++;
      }

      let speed = isDeleting.current ? 40 : 100;

      if (!isDeleting.current && charIndex.current === currentRole.length) {
        speed = 2200; // hold
        isDeleting.current = true;
      } else if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false;
        roleIndex.current = (roleIndex.current + 1) % roles.length;
        speed = 400; // wait before next role
      }

      setTimeout(typeWriter, speed);
    };

    const typeTimer = setTimeout(typeWriter, 500);

    // Vector Brain orbit Canvas
    const canvas = orbitCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let frameId: number;
        canvas.width = 300;
        canvas.height = 300;
        let angle = 0;

        const drawHologramOrbit = () => {
          ctx.clearRect(0, 0, 300, 300);
          const cx = 150;
          const cy = 150;

          // Draw neon cyan boundary rings
          ctx.beginPath();
          ctx.arc(cx, cy, 110, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0, 242, 254, 0.15)";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cx, cy, 110, angle, angle + Math.PI / 3);
          ctx.strokeStyle = "rgba(0, 242, 254, 0.7)";
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cx, cy, 110, angle + Math.PI, angle + (4 * Math.PI) / 3);
          ctx.strokeStyle = "rgba(0, 242, 254, 0.7)";
          ctx.lineWidth = 3;
          ctx.stroke();

          // Outer rotators
          ctx.beginPath();
          ctx.arc(cx, cy, 125, -angle * 0.7, -angle * 0.7 + Math.PI / 45);
          ctx.strokeStyle = "rgba(239, 68, 68, 0.8)";
          ctx.lineWidth = 5;
          ctx.stroke();

          // Brain synapses mesh nodes inside center (orbit nodes)
          const nodeCount = 14;
          const nodes: any[] = [];
          for (let i = 0; i < nodeCount; i++) {
            const nodeAngle = (i * (Math.PI * 2)) / nodeCount + Math.sin(angle + i) * 0.12;
            const r = 55 + Math.cos(angle * 1.5 + i) * 10;
            nodes.push({
              x: cx + Math.cos(nodeAngle) * r,
              y: cy + Math.sin(nodeAngle) * r,
            });
          }

          // Link central mesh
          ctx.beginPath();
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
              if (d < 65) {
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = "rgba(0, 242, 254, 0.18)";
                ctx.lineWidth = 1;
              }
            }
          }
          ctx.stroke();

          // Draw nodes
          nodes.forEach((n, idx) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, idx % 2 === 0 ? 3 : 1.5, 0, Math.PI * 2);
            ctx.fillStyle = idx % 3 === 0 ? "#ef4444" : "#00f2fe";
            ctx.shadowBlur = 6;
            ctx.shadowColor = "#00f2fe";
            ctx.fill();
            ctx.shadowBlur = 0;
          });

          // Draw Core Reactor Sphere
          ctx.beginPath();
          ctx.arc(cx, cy, 32 + Math.sin(angle * 3) * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 35);
          grad.addColorStop(0, "rgba(0, 242, 254, 0.9)");
          grad.addColorStop(0.4, "rgba(0, 242, 254, 0.3)");
          grad.addColorStop(1, "rgba(0, 242, 254, 0)");
          ctx.fillStyle = grad;
          ctx.fill();

          // Core details
          ctx.beginPath();
          ctx.arc(cx, cy, 14, 0, Math.PI * 2);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          angle += 0.012;
          frameId = requestAnimationFrame(drawHologramOrbit);
        };

        drawHologramOrbit();
        return () => {
          cancelAnimationFrame(frameId);
        };
      }
    }

    return () => clearTimeout(typeTimer);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center p-6 md:p-12 overflow-hidden bg-transparent select-text"
    >
      {/* Absolute floating technical HUD decorations (Iron Man JARVIs style) */}
      <div className="absolute top-28 left-6 md:left-12 font-mono text-[9px] text-slate-500/80 uppercase tracking-widest leading-relaxed hidden lg:block border-l border-slate-700 pl-3">
        <div>SYS_MATRIX_STATUS_ACTIVE : 200_OK</div>
        <div>OPERATING_GRID : SECURE_CLOUD</div>
        <div>LOCATION_LOG : KARACHI_PK</div>
        <div>LATENCY_PING : 0.042s</div>
      </div>

      <div className="absolute top-28 right-6 md:right-12 font-mono text-[9px] text-cyan-400/70 text-right uppercase tracking-widest hidden lg:block border-r border-[#00f2fe]/40 pr-3">
        <div>MAWIYA_AI_CORE_SYSTEMS</div>
        <div>TENSOR_FLOW_GPU_LOAD : 4%</div>
        <div>DJANGO_PORT_INGRESS : 3000</div>
        <div>UI_TILT_CAPABILITY_ENABLED</div>
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 py-16 md:py-24">
        {/* Left Typography Block */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Accent holographic status line */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-full text-[11px] font-mono text-[#00f2fe] tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>AI SOFTWARE ENGINEER INCEPTION</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
              Muhammad Mawiya
            </h1>
            <div className="h-8 flex items-center justify-center lg:justify-start gap-1">
              <span className="text-sm md:text-base font-mono text-cyan-400 font-bold tracking-wider uppercase">
                &gt;&nbsp;{roleText}
              </span>
              <span className="w-1.5 h-4 bg-cyan-400 animate-ping"></span>
            </div>
          </div>

          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
            Specialized in training AI systems, engineering robust machine learning algorithms, crafting automations, and designing python full-stack architectures. Pursuing advanced engineering degrees in Karachi, Pakistan.
          </p>

          <blockquote className="border-l-2 border-[#ff3b30] pl-4 italic text-xs md:text-sm font-mono text-slate-400 bg-white/5 p-3 rounded max-w-md mx-auto lg:mx-0">
            "If it can be automated, I will automate it."
          </blockquote>

          {/* Call to actions */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              onClick={onContactClick}
              id="hero-contact-btn"
              className="px-6 py-3 bg-[#00f2fe] text-[#0f172a] rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,242,254,0.4)] cursor-pointer hover:shadow-[0_0_25px_rgba(0,242,254,0.8)] border border-[#00f2fe] outline-none"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Agent</span>
            </button>

            <button
              onClick={onResumeClick}
              className="px-6 py-3 bg-white/5 border border-slate-700 text-slate-300 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 hover:border-slate-400 active:scale-95 transition-all cursor-pointer outline-none"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Preview Resume</span>
            </button>

            <button
              onClick={onResumeDownload}
              className="px-5 py-3 bg-cyan-950/45 border border-cyan-500/30 text-cyan-400 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#00f2fe]/10 hover:border-[#00f2fe] transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Get Resume</span>
            </button>
          </div>

          {/* Micro Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0">
            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg text-center backdrop-blur-sm shadow-md">
              <div className="text-xl md:text-2xl font-extrabold font-mono text-[#00f2fe]">
                {profile.public_repos || 12}+
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">GitHub Repos</div>
            </div>
            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg text-center backdrop-blur-sm shadow-md">
              <div className="text-xl md:text-2xl font-extrabold font-mono text-[#ef4444]">
                {profile.followers || 47}+
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Active Followers</div>
            </div>
            <div className="bg-white/[0.03] border border-white/10 p-3 rounded-lg text-center backdrop-blur-sm shadow-md">
              <div className="text-xl md:text-2xl font-extrabold font-mono text-green-400">
                100%
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Automation Rate</div>
            </div>
          </div>
        </div>

        {/* Right Side Rotating Core Model Graphic */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center">
          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            {/* Ambient Background Grid Ring */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-slate-800 animate-[spin_50s_linear_infinite]" />
            <div className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-cyan-950/20 animate-[spin_80s_linear_infinite]" />

            {/* Glowing Core Orbit Canvas */}
            <canvas ref={orbitCanvasRef} className="relative z-20 pointer-events-auto" />

            {/* Absolute HUD holographic data flags around core */}
            <div className="absolute -top-4 -right-16 bg-black/60 border border-white/10 backdrop-blur-lg px-2 py-1 rounded text-[9px] font-mono text-[#00f2fe] tracking-wider uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-green-400" />
              <span>CORE_STABLE</span>
            </div>

            <div className="absolute -bottom-4 -left-16 bg-black/60 border border-white/10 backdrop-blur-lg px-2 py-1 rounded text-[9px] font-mono text-slate-400 tracking-wider uppercase flex items-center gap-1">
              <Server className="w-3 h-3 text-cyan-400" />
              <span>AUTOMATIONS_LIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
