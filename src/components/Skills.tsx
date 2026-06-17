import { useState } from "react";
import { Cpu, Server, Layout, ShieldAlert, Layers, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SKILLS_DATA, Skill } from "../data";

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState<"All" | "AI/ML" | "Backend" | "Frontend" | "DevOps">("All");

  const categories = [
    { name: "All" as const, icon: Layers },
    { name: "AI/ML" as const, icon: Cpu },
    { name: "Backend" as const, icon: Server },
    { name: "Frontend" as const, icon: Layout },
    { name: "DevOps" as const, icon: ShieldAlert },
  ];

  const filteredSkills = SKILLS_DATA.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  // Customize custom vector radial points for Radar Chart
  // We plot 6 axes representing core cognitive channels:
  const radarAxes = [
    { title: "Deep Learning", val: 86 },
    { title: "Backend Orchestration", val: 92 },
    { title: "System Automations", val: 96 },
    { title: "Data Pipelines", val: 92 },
    { title: "Frontend UI", val: 88 },
    { title: "DevOps / Linux", val: 84 },
  ];

  // Helper points calculators for radar (300x300 viewBox, center = 150, 150)
  const cx = 150;
  const cy = 150;
  const maxR = 100;

  const calculateRadarPoint = (index: number, value: number) => {
    const angle = (index * (Math.PI * 2)) / radarAxes.length - Math.PI / 2;
    const r = (value / 100) * maxR;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  };

  const polyPointsString = radarAxes
    .map((axis, idx) => {
      const { x, y } = calculateRadarPoint(idx, axis.val);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section id="skills-section" className="py-20 px-6 md:px-12 bg-transparent relative z-10 scroll-mt-16 select-text">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>Synaptic Strength Matrix</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
            Technical Skill Framework
          </h2>
          <div className="h-0.5 w-16 bg-[#00f2fe] mx-auto md:mx-0"></div>
        </div>

        {/* Sidebar layouts: Column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left panel: Category triggers + custom dynamic radar SVG */}
          <div className="lg:col-span-4 bg-white/[0.03] border border-white/10 p-6 rounded-2xl space-y-6 backdrop-blur-md shadow-xl flex flex-col items-center">
            <div className="w-full">
              <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-2">Cognitive Strengths</h3>
              <p className="text-[10px] font-mono text-cyan-400">RADAR_VECTOR_REPRESENTATION</p>
            </div>

            {/* Custom SVG Radar chart */}
            <div className="relative w-full aspect-square max-w-[260px] flex items-center justify-center p-3 select-none">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* 1. Grid Rings */}
                {[20, 40, 60, 80, 100].map((level, rIdx) => {
                  const r = (level / 100) * maxR;
                  const ringPoints = radarAxes
                    .map((_, axisIdx) => {
                      const angle = (axisIdx * (Math.PI * 2)) / radarAxes.length - Math.PI / 2;
                      return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
                    })
                    .join(" ");

                  return (
                    <polygon
                      key={rIdx}
                      points={ringPoints}
                      fill="none"
                      stroke="rgba(0, 242, 254, 0.08)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* 2. Grid Web Line axes */}
                {radarAxes.map((axis, idx) => {
                  const end = calculateRadarPoint(idx, 100);
                  const angle = (idx * (Math.PI * 2)) / radarAxes.length - Math.PI / 2;
                  const isLeft = Math.cos(angle) < -0.1;
                  const isTop = Math.sin(angle) < -0.1;

                  return (
                    <g key={idx}>
                      <line
                        x1={cx}
                        y1={cy}
                        x2={end.x}
                        y2={end.y}
                        stroke="rgba(0, 242, 254, 0.15)"
                        strokeWidth="1"
                      />
                      {/* Label on axis */}
                      <text
                        x={end.x + Math.cos(angle) * 12}
                        y={end.y + Math.sin(angle) * 12}
                        textAnchor={isLeft ? "end" : "start"}
                        alignmentBaseline={isTop ? "baseline" : "middle"}
                        className="fill-slate-400 font-mono text-[9px] uppercase tracking-wider"
                      >
                        {axis.title}
                      </text>
                    </g>
                  );
                })}

                {/* 3. Filled Strength Polygon Area */}
                <polygon
                  points={polyPointsString}
                  fill="rgba(0, 242, 254, 0.22)"
                  stroke="#00f2fe"
                  strokeWidth="2"
                  className="shadow-md"
                />

                {/* 4. Draw points */}
                {radarAxes.map((axis, idx) => {
                  const { x, y } = calculateRadarPoint(idx, axis.val);
                  return (
                    <circle
                      key={idx}
                      cx={x}
                      cy={y}
                      r="4"
                      className="fill-[#ef4444] stroke-slate-900 stroke-2 hover:r-5 cursor-pointer transition-all"
                    >
                      <title>{`${axis.title}: ${axis.val}%`}</title>
                    </circle>
                  );
                })}
              </svg>
            </div>

            {/* Filter buttons */}
            <div className="w-full flex flex-col gap-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest pl-1">Filters:</span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex items-center gap-1.5 p-1.5 px-3 rounded-lg font-mono text-[10px] tracking-wider uppercase border transition-all cursor-pointer ${
                        activeCategory === cat.name
                          ? "bg-[#00f2fe] text-slate-950 border-[#00f2fe] font-bold shadow-[0_0_10px_rgba(0,242,254,0.3)]"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right panel: Active skill meters inside clean list */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 backdrop-blur-md shadow-xl min-h-[420px]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-sans text-sm font-bold text-white uppercase tracking-wider">Skill Inventory</h3>
                <p className="text-[10px] font-mono text-slate-500">SORT_ORDER_PRIORITY</p>
              </div>
              <span className="text-[10px] font-mono text-[#00f2fe]/90 bg-[#00f2fe]/10 p-1 px-2.5 border border-[#00f2fe]/30 rounded">
                CATEGORY: {activeCategory.toUpperCase()}
              </span>
            </div>

            {/* Grid list of skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {filteredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="space-y-1.5 p-2 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-slate-800/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-medium group-hover:text-[#00f2fe] transition-colors flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-cyan-400/50 group-hover:rotate-12 transition-all" />
                      {skill.name}
                    </span>
                    <span className="text-cyan-400/80 font-bold">{skill.level}%</span>
                  </div>

                  {/* Level bar */}
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden relative border border-slate-800/60">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-[#00f2fe] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Display hovered skill detailed summary box (Tony stark HUD effect!) */}
            {hoveredSkill && (
              <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/30 rounded-lg font-mono text-[10px] text-cyan-200/90 animate-pulse flex items-center justify-between">
                <span>SYSTEM_PROBING: Checking `{hoveredSkill.name.toUpperCase()}` telemetry coordinates...</span>
                <span>LEVEL_STRENGTH: {hoveredSkill.level >= 90 ? "PROT_LEVEL_9_EXPERT" : "LEVEL_8_COMPETENT"}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
