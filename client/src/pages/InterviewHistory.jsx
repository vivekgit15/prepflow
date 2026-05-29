import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/get-interview",
          { withCredentials: true }
        );
        setInterviews(result.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getMyInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans">
      
      {/* BACKGROUND BACKGROUND LAYERS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-5">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/")}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/20 transition flex items-center justify-center text-base"
            >
              <FaArrowLeft />
            </button>

            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
                <HiSparkles className="text-green-400 text-sm" />
                <span className="text-green-300 text-xs tracking-wider uppercase font-semibold">
                  Interview Records
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                History Console
              </h1>
              <p className="text-zinc-500 text-sm mt-1.5">
                Track your past interviews and performance reports
              </p>
            </div>
          </div>

          <div className="text-sm text-zinc-500 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
            Archive Online <span className="text-green-400 ml-1">●</span>
          </div>
        </div>

        {/* CONTAINER SWITCHES */}
        {interviews.length === 0 ? (
          /* EMPTY STATE */
          <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-16 text-center relative overflow-hidden">
            <h2 className="text-2xl font-bold mb-3 text-zinc-200">
              No Interviews Yet
            </h2>
            <p className="text-zinc-500 text-base mb-8 max-w-sm mx-auto">
              Start your first AI interview session to generate records.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold text-sm hover:opacity-90 transition"
            >
              Start Interview
            </button>
          </div>
        ) : (
          /* HISTORY CARD GRID */
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {interviews.map((item, index) => {
              const score = item.finalScore || item.report?.finalScore || item.score || 0;

              return (
                <div
                  key={index}
                  onClick={() => navigate(`/report/${item._id}`)}
                  className="group cursor-pointer rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-green-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[250px]"
                >
                  {/* Top Header Section */}
                  <div>
                    <div className="flex justify-between items-center gap-3 mb-4">
                      <span className="text-zinc-500 font-mono text-xs tracking-wider">
                        SESSION #{index + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded-md border border-green-500/10 bg-green-500/5 text-green-400 text-xs uppercase font-semibold tracking-wide">
                        {item.status || "completed"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-200 group-hover:text-white transition duration-200 mb-1.5 truncate">
                      {item.role || "Interview Session"}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      {item.experience} • {item.mode || "AI Mode"}
                    </p>
                  </div>

                  {/* Mid Segment Metrics bar */}
                  <div className="my-5 p-4 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase text-zinc-500 tracking-wider font-semibold">Evaluation Score</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-bold text-green-400">{score}</span>
                        <span className="text-zinc-600 text-sm">/ 10</span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 font-mono text-sm font-bold border border-white/5">
                      AI
                    </div>
                  </div>

                  {/* Bottom Segment Meta Details */}
                  <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
                    <div>
                      <p className="text-zinc-400 font-medium">
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="text-green-400 font-semibold flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-200">
                      View Report →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewHistory;
