import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { FaArrowLeft } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
} from "recharts";
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const Step3Report = ({ report }) => {
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-400 font-sans text-base">
        Processing Metrics Report...
      </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((q, index) => ({
    name: `Q${index + 1}`,
    score: q.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagLine = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job markets";
    shortTagLine = "Excellent clarity and structured responses";
  } else if (finalScore >= 5) {
    performanceText = "Minor improvements needed";
    shortTagLine = "Strong base, refine articulation";
  } else {
    performanceText = "Improvement required";
    shortTagLine = "Focus on clarity and confidence";
  }

  const percentage = (finalScore / 10) * 100;

  const downloadPdf = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let currentY = 20;

    // HEADER
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(34, 197, 94);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" });

    currentY += 5;
    doc.setDrawColor(34, 197, 94);
    doc.setLineWidth(0.5);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
    currentY += 12;

    // SCORE CARD
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 3, 3, "F");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Performance Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, { align: "center" });
    currentY += 30;

    // SKILLS SECTION
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Confidence: ${confidence}/10`, margin + 8, currentY + 13);
    doc.text(`Communication: ${communication}/10`, pageWidth / 2 - 20, currentY + 13);
    doc.text(`Correctness: ${correctness}/10`, pageWidth - 55, currentY + 13);
    currentY += 32;

    // ADVICE
    let advice = "";
    if (finalScore >= 8) {
      advice = "Excellent performance. Maintain confidence and structure. Continue refining clarity and support your answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice = "Good foundation shown. Improve clarity and structure. Practice delivering concise and confident answers with stronger supporting examples.";
    } else {
      advice = "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering interview questions aloud regularly.";
    }

    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 16);
    const adviceHeight = splitAdvice.length * 6 + 18;

    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, adviceHeight, 3, 3);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Professional Evaluation Advice", margin + 8, currentY + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(splitAdvice, margin + 8, currentY + 18);
    currentY += adviceHeight + 10;

    // TABLE
    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        i + 1,
        `Question ${i + 1}`,
        `${q.score ?? 0}/10`,
        q.feedback || "No feedback available",
      ]),
      styles: { fontSize: 8.5, cellPadding: 3.5, overflow: "linebreak", valign: "top" },
      headStyles: { fillColor: [34, 197, 94], textColor: 255, fontStyle: "bold", halign: "center" },
      alternateRowStyles: { fillColor: [249, 250, 251] },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 32 },
        2: { cellWidth: 18, halign: "center" },
        3: { cellWidth: "auto" },
      },
      pageBreak: "auto",
      rowPageBreak: "auto",
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8.5);
      doc.setTextColor(120);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 287, { align: "center" });
    }

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden font-sans">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        
        {/* HEADER BLOCK */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-5">
          <div className="flex items-center gap-5">
            <button
              onClick={() => navigate("/history")}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/20 transition flex items-center justify-center text-base"
            >
              <FaArrowLeft />
            </button>

            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
                <HiSparkles className="text-green-400 text-sm" />
                <span className="text-green-300 text-xs tracking-wider uppercase font-semibold">
                  AI Performance Insights
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Interview Analytics</h1>
            </div>
          </div>

          <button 
            onClick={downloadPdf} 
            className="bg-emerald-500 hover:opacity-90 text-black h-12 px-6 rounded-xl shadow-md transition-all font-semibold text-sm tracking-wide"
          >
            Download PDF Report
          </button>
        </div>

        {/* METRICS & VISUAL GRIDS */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR OVERVIEW ================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Score Wheel */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-7 shadow-xl">
              <h3 className="text-zinc-500 text-xs text-center font-bold tracking-widest uppercase mb-6">
                Overall Metric
              </h3>

              <div className="w-48 h-48 mx-auto">
                <CircularProgressbar
                  value={percentage}
                  text={`${finalScore}/10`}
                  strokeWidth={9}
                  styles={{
                    path: { stroke: "#34d399", strokeLinecap: "round" },
                    trail: { stroke: "#111827" },
                    text: { fill: "#ffffff", fontSize: "18px", fontWeight: "700", dominantBaseline: "middle", textAnchor: "middle" },
                  }}
                />
              </div>

              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-zinc-100 mb-1.5">{performanceText}</h3>
                <p className="text-zinc-400 text-sm">{shortTagLine}</p>
              </div>
            </div>

            {/* Parameter Bars */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-7 shadow-xl">
              <h3 className="text-base font-bold text-zinc-100 mb-6 tracking-tight">Core Competence</h3>

              {skills.map((s, i) => (
                <div key={i} className="mb-5 last:mb-0">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-300 font-medium">{s.label}</span>
                    <span className="text-green-400 font-bold">{s.value}/10</span>
                  </div>

                  <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400"
                      style={{ width: `${s.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Summary Panels */}
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-xl bg-white/[0.02] border border-white/5 p-5 text-center">
                <div className="text-3xl font-bold text-green-400 font-mono">
                  {questionWiseScore.length}
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mt-1">Questions</p>
              </div>

              <div className="rounded-xl bg-white/[0.02] border border-white/5 p-5 text-center">
                <div className="text-3xl font-bold text-cyan-400 font-mono">
                  {Math.round((confidence + communication + correctness) / 3)}
                </div>
                <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mt-1">Avg Skill</p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT METRIC TRACKING PARALLEL ================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Trend Chart Area */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-7 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-bold tracking-tight text-zinc-100">Performance Timeline</h2>
                <span className="text-green-400 text-xs font-semibold bg-green-500/5 border border-green-500/10 px-3 py-1 rounded-md">Live Analysis</span>
              </div>

              <div className="h-72 text-xs font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                    <XAxis dataKey="name" stroke="#71717a" />
                    <YAxis domain={[0, 10]} stroke="#71717a" />
                    <Tooltip
                      contentStyle={{
                        background: "#0a0a0a",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        fontSize: "12px"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#34d399"
                      fill="url(#colorScore)"
                      strokeWidth={3}
                    />
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34d399" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Text Breakdown Modules */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-7 shadow-xl">
              <h2 className="text-base font-bold text-zinc-100 mb-6 tracking-tight">Structured Item Breakdown</h2>

              <div className="space-y-5">
                {questionWiseScore.map((q, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-black/20 border border-white/5 p-5 hover:border-green-500/10 transition duration-200"
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <p className="text-zinc-500 font-mono text-xs tracking-wider uppercase mb-0.5">
                          Question {i + 1}
                        </p>
                        <h4 className="text-base font-semibold text-zinc-200 leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      <div className="px-3 py-1 rounded-lg bg-green-500/5 border border-green-500/10 text-green-400 font-bold font-mono text-sm shrink-0">
                        {q.score ?? 0}/10
                      </div>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed pt-3 border-t border-white/[0.04]">
                      {q.feedback || "No assessment breakdown available for this sequence."}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Report;
