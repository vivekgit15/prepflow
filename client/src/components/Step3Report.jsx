import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
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
Area
} from "recharts";

const Step3Report = ({ report }) => {

const navigate = useNavigate();

if(!report){
return(
<div className="min-h-screen bg-black flex items-center justify-center text-white">
Loading Report...
</div>
)
}

const {
finalScore=0,
confidence=0,
communication=0,
correctness=0,
questionWiseScore=[]
}=report


const questionScoreData = questionWiseScore.map((q,index)=>({
name:`Q${index+1}`,
score:q.score || 0
}))


const skills = [
{label:"Confidence",value:confidence},
{label:"Communication",value:communication},
{label:"Correctness",value:correctness}
]


let performanceText=""
let shortTagLine=""

if(finalScore >= 8){
performanceText="Ready for real job interviews"
shortTagLine="Excellent clarity and structured responses"
}
else if(finalScore >=5){
performanceText="Minor improvements needed"
shortTagLine="Strong base, refine articulation"
}
else{
performanceText="Improvement required"
shortTagLine="Focus on clarity and confidence"
}

const percentage = (finalScore/10)*100

return (
<div className="min-h-screen bg-black text-white relative overflow-hidden">

{/* cyber grid */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* glows */}
<div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full"/>
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full"/>

<div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

{/* HEADER */}
<div className="flex justify-between items-center mb-10">

<div className="flex items-center gap-5">
<button
onClick={()=>navigate("/history")}
className="
w-14 h-14 rounded-2xl
bg-white/5 border border-white/10
backdrop-blur-xl
hover:border-green-500/30
transition
flex items-center justify-center
"
>
<FaArrowLeft/>
</button>

<div>
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-3">
<HiSparkles className="text-green-400"/>
<span className="text-green-300 text-sm">
AI Performance Report
</span>
</div>

<h1 className="text-5xl font-bold">
Interview Analytics
</h1>
</div>

</div>

<div className="text-green-400">
Analysis Complete ●
</div>

</div>



<div className="grid lg:grid-cols-12 gap-8">

{/* LEFT SIDEBAR */}
<div className="lg:col-span-4 space-y-8">


{/* score card */}
<div className="rounded-[36px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">

<h3 className="text-zinc-400 text-center mb-6">
Overall Performance
</h3>

<div className="w-52 h-52 mx-auto">
                <CircularProgressbar
                  value={percentage}
                  text={`${finalScore}/10`}
                  strokeWidth={10}
                  styles={{
                    path: {
                      stroke: "#34d399",
                      strokeLinecap: "round",
                    },

                    trail: {
                      stroke: "#111827",
                    },

                    text: {
                      fill: "#ffffff",
                      fontSize: "18px",
                      fontWeight: "600",
                      dominantBaseline: "middle",
                      textAnchor: "middle",
                    },
                  }}
                />
              </div>

<div className="text-center mt-8">
<h3 className="text-2xl font-bold mb-3">
{performanceText}
</h3>

<p className="text-zinc-500">
{shortTagLine}
</p>
</div>

</div>



{/* skill radar */}
<div className="rounded-[36px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">

<h3 className="text-2xl font-semibold mb-8">
Skill Evaluation
</h3>

{skills.map((s,i)=>(
<div key={i} className="mb-7">

<div className="flex justify-between mb-3">
<span className="text-zinc-300">
{s.label}
</span>

<span className="text-green-400 font-semibold">
{s.value}/10
</span>
</div>

<div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
<div
className="h-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400"
style={{
width:`${s.value*10}%`
}}
/>
</div>

</div>
))}

</div>


{/* mini stats */}
<div className="grid grid-cols-2 gap-5">

<div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
<div className="text-4xl font-bold text-green-400">
{questionWiseScore.length}
</div>
<p className="text-zinc-500 mt-2">
Questions
</p>
</div>

<div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
<div className="text-4xl font-bold text-cyan-400">
{Math.round((confidence+communication+correctness)/3)}
</div>
<p className="text-zinc-500 mt-2">
Avg Skill
</p>
</div>

</div>


</div>



{/* RIGHT ANALYTICS */}
<div className="lg:col-span-8 space-y-8">


{/* trend graph */}
<div className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">

<div className="flex justify-between items-center mb-8">
<h2 className="text-3xl font-bold">
Performance Trend
</h2>

<span className="text-green-400">
Live Analysis
</span>
</div>

<div className="h-96">
<ResponsiveContainer width="100%" height="100%">
<AreaChart data={questionScoreData}>
<CartesianGrid strokeDasharray="3 3" stroke="#333"/>

<XAxis
dataKey="name"
stroke="#999"
/>

<YAxis
domain={[0,10]}
stroke="#999"
/>

<Tooltip
contentStyle={{
background:"#111",
border:"1px solid #333",
borderRadius:"16px"
}}
/>

<Area
type="monotone"
dataKey="score"
stroke="#34d399"
fill="#34d39922"
strokeWidth={4}
/>

</AreaChart>
</ResponsiveContainer>
</div>

</div>



{/* breakdown */}
<div className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">

<h2 className="text-3xl font-bold mb-8">
Question Breakdown
</h2>

<div className="space-y-5">

{questionWiseScore.map((q,i)=>(
<div
key={i}
className="
rounded-[30px]
bg-black/30
border border-white/10
p-6
hover:border-green-500/20
transition
"
>

<div className="flex justify-between items-center mb-4">

<div>
<p className="text-zinc-500 text-sm">
Question {i+1}
</p>

<h4 className="text-xl font-semibold">
  {q.question || "No question"}
</h4>
</div>

<div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 font-semibold">
{q.score ?? 0}/10
</div>

</div>

<p className="text-zinc-400 leading-relaxed">
{q.feedback || "No feedback available"}
</p>

</div>
))}

</div>

</div>


</div>

</div>

</div>

</div>
)
}

export default Step3Report
