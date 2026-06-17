import { useEffect, useState } from "react";
import { FolderGit2, Star, Link, ExternalLink, Calendar, GitFork, ArrowUpRight, Code2 } from "lucide-react";
import { GithubProject } from "../types";

export default function Projects() {
  const [repos, setRepos] = useState<GithubProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterLang, setFilterLang] = useState<string>("All");

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => res.json())
      .then((data) => {
        // Filter out fork repositories or keep public ones sorted by stars
        const sorted = data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
        setRepos(sorted);
      })
      .catch((e) => console.error("Error loaded repos cache", e))
      .finally(() => setIsLoading(false));
  }, []);

  const languages = ["All", "Python", "JavaScript", "HTML", "Jupyter Notebook"];

  const filteredRepos = repos.filter(
    (repo) => filterLang === "All" || repo.language?.toLowerCase() === filterLang.toLowerCase()
  );

  return (
    <section id="projects-section" className="py-20 px-6 md:px-12 bg-transparent relative z-10 scroll-mt-16 select-text">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2fe] uppercase tracking-wider">
              <FolderGit2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Version Control Repositories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
              Featured Software Systems
            </h2>
            <div className="h-0.5 w-16 bg-[#00f2fe] mx-auto md:mx-0"></div>
          </div>

          {/* Filtering row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] uppercase">
            {languages.map((lang, idx) => (
              <button
                key={idx}
                onClick={() => setFilterLang(lang)}
                className={`p-1.5 px-3 rounded border transition-all cursor-pointer ${
                  filterLang === lang
                    ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                    : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Shimmer loaders if active */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-[210px] bg-white/[0.02] border border-white/10 rounded-xl p-6 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-slate-800 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-800 rounded w-full"></div>
                  <div className="h-3 bg-slate-800 rounded w-5/6"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 bg-slate-800 rounded w-12"></div>
                  <div className="h-3 bg-slate-800 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Actual grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => {
              // Extract active Vercel link presets if custom matching
              const hasVercelLink = repo.homepage || (repo.name.toLowerCase() === "cafe-eclipse" ? "https://cafe-eclipse.vercel.app" : "");
              
              return (
                <div
                  key={repo.id}
                  className="bg-white/[0.03] border border-white/10 hover:border-[#00f2fe]/60 rounded-xl p-5 md:p-6 backdrop-blur-md flex flex-col justify-between hover:translate-y-[-4px] shadow-lg hover:shadow-[0_4px_25px_rgba(0,242,254,0.15)] transition-all cursor-pointer group leading-relaxed"
                  onClick={() => window.open(repo.html_url, "_blank")}
                >
                  <div className="space-y-4">
                    {/* Top title and Arrow tag */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-sans text-base font-bold text-white group-hover:text-[#00f2fe] transition-colors break-words">
                        {repo.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#00f2fe] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>

                    <p className="font-sans text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {repo.description || "Comprehensive software pipeline focusing on data automations, model architectures, and dynamic database integrations."}
                    </p>

                    {/* Topic Tags */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[8px] font-mono font-medium tracking-wide uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80 text-[#00f2fe]/80"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Foot meta parameters */}
                  <div className="pt-5 border-t border-slate-800/60 mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-3.5 font-mono text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        {repo.language || "Python"}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500/10" />
                        {repo.stargazers_count}
                      </span>
                    </div>

                    {/* Separate Action Trigger for Vercel link if live */}
                    {hasVercelLink && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent opening github twice
                          window.open(hasVercelLink, "_blank");
                        }}
                        className="text-[9px] font-mono text-[#00f2fe]/90 bg-[#00f2fe]/10 p-1 px-2 border border-[#00f2fe]/30 rounded hover:bg-cyan-500 hover:text-slate-950 hover:font-bold hover:shadow-[0_0_8px_rgba(0,242,254,0.4)] transition-all flex items-center gap-1 cursor-pointer outline-none"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live Vercel</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
