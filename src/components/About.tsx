import { Mail, Phone, MapPin, Github, GraduationCap, Award, Briefcase, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const profileDetails = {
    name: "Muhammad Mawiya",
    location: "Karachi, Pakistan",
    phone: "0337-0338321",
    email: "muhammadmawiya5@gmail.com",
    githubUrl: "https://github.com/mawiya-47",
    summary:
      "Passionate AI Engineer and Full Stack Python Developer currently pursuing BS in Artificial Intelligence and an Advanced Diploma in AI. Specialized in training machine learning models, deploying custom voice assistants, backend orchestration via Python framework stacks, and automating complex workflows.",
  };

  const educations = [
    {
      degree: "BS Artificial Intelligence (BSAI)",
      institution: "University of Karachi (UBIT)",
      duration: "2025 – Present",
      status: "In Progress",
      description: "Focusing on core Artificial Intelligence curricula, predictive statistical models, regression arrays, computational logic, and advanced mathematics algorithms.",
    },
    {
      degree: "Diploma in Artificial Intelligence",
      institution: "NED University",
      duration: "Ongoing",
      status: "Active Scholar",
      description: "Rigorous certification covering training pipelines, deep neural architectures, PyTorch, computer vision modeling, and Transformers.",
    },
  ];

  return (
    <section id="about-section" className="py-20 px-6 md:px-12 bg-transparent relative z-10 scroll-mt-16 select-text">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>Identity Node & History</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
            About Muhammad Mawiya
          </h2>
          <div className="h-0.5 w-16 bg-[#00f2fe] mx-auto md:mx-0"></div>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card 1: Contact Details & Identity Info */}
          <div className="lg:col-span-5 bg-white/3 border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 backdrop-blur-md shadow-xl relative overflow-hidden group">
            {/* Soft decorative background glows */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-700"></div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/20 text-[#00f2fe] rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-white">Personnel Dossier</h3>
                <p className="text-[10px] font-mono text-cyan-400">STATUS: CORE_SYSTEMS_ACTIVE</p>
              </div>
            </div>

            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              {profileDetails.summary}
            </p>

            <div className="h-px bg-slate-800"></div>

            {/* Quick Contacts Table */}
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-3.5">
                <MapPin className="w-4 h-4 text-[#ef4444]" />
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-widest">Global Coordinates</span>
                  <span className="text-[#00f2fe]">{profileDetails.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <Mail className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-widest">Secure Inquire Link</span>
                  <a href={`mailto:${profileDetails.email}`} className="text-[#00f2fe] hover:underline">
                    {profileDetails.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <Phone className="w-4 h-4 text-green-400" />
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-widest">Active Line ID</span>
                  <a href="tel:03370338321" className="text-[#00f2fe] hover:underline">
                    {profileDetails.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <Github className="w-4 h-4 text-slate-300" />
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase tracking-widest">GitHub Repository Ingress</span>
                  <a
                    href={profileDetails.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#00f2fe] hover:underline"
                  >
                    {profileDetails.githubUrl}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Academic Timeline Pathway */}
          <div className="lg:col-span-7 bg-white/3 border border-white/10 p-6 md:p-8 rounded-2xl space-y-6 backdrop-blur-md shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all duration-700"></div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-950/40 border border-red-500/20 text-[#ef4444] rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold text-white">Academic Pathways</h3>
                <p className="text-[10px] font-mono text-red-400">INSTITUTION_MATRICES_LOADED</p>
              </div>
            </div>

            <div className="space-y-6">
              {educations.map((edu, idx) => (
                <div key={idx} className="relative pl-6 border-l border-slate-800 space-y-2">
                  {/* Bullet node */}
                  <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-[#00f2fe] border-2 border-slate-900 shadow-[0_0_8px_rgba(0,242,254,0.8)]"></div>

                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="font-mono text-sm font-bold text-white tracking-wide">
                      {edu.degree}
                    </h4>
                    <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                      {edu.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                    <Award className="w-3.5 h-3.5" />
                    <span>{edu.institution}</span>
                    <span>•</span>
                    <span>{edu.duration}</span>
                  </div>

                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {edu.description}
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
