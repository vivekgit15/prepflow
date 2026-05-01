// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const Step3Report = ({ report }) => {
//   const navigate = useNavigate()
//   return (
//     <div className='min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4'>
//       <div className='w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-10'>
//         <h1 className='text-3xl font-bold text-emerald-600 mb-6'>Interview Summary</h1>
//         {report ? (
//           <div className='space-y-6'>
//             <div className='grid md:grid-cols-2 gap-6'>
//               <div className='bg-gray-50 border border-gray-200 rounded-3xl p-6'>
//                 <h2 className='font-semibold text-lg mb-2'>Final Score</h2>
//                 <p className='text-5xl font-bold text-emerald-700'>{report.finalScore}</p>
//               </div>
//               <div className='bg-gray-50 border border-gray-200 rounded-3xl p-6'>
//                 <h2 className='font-semibold text-lg mb-2'>Accuracy Metrics</h2>
//                 <div className='grid grid-cols-3 gap-4 text-center'>
//                   <div>
//                     <p className='text-xl font-semibold'>{report.confidence}</p>
//                     <p className='text-sm text-gray-500'>Confidence</p>
//                   </div>
//                   <div>
//                     <p className='text-xl font-semibold'>{report.communication}</p>
//                     <p className='text-sm text-gray-500'>Communication</p>
//                   </div>
//                   <div>
//                     <p className='text-xl font-semibold'>{report.correctness}</p>
//                     <p className='text-sm text-gray-500'>Correctness</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='bg-gray-50 border border-gray-200 rounded-3xl p-6'>
//               <h2 className='font-semibold text-lg mb-4'>Question by Question Feedback</h2>
//               <div className='space-y-4'>
//                 {report.questionWiseScore?.map((item, index) => (
//                   <div key={index} className='rounded-2xl bg-white border border-gray-200 p-4'>
//                     <div className='text-sm text-gray-400 mb-2'>Question {index + 1}</div>
//                     <p className='font-semibold text-gray-800 mb-2'>{item.question}</p>
//                     <div className='flex flex-wrap gap-3 text-sm text-gray-600'>
//                       <span className='px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full'>Score: {item.score}</span>
//                       <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full'>Confidence: {item.confidence}</span>
//                       <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full'>Communication: {item.communication}</span>
//                       <span className='px-3 py-1 bg-slate-100 text-slate-700 rounded-full'>Correctness: {item.correctness}</span>
//                     </div>
//                     <p className='mt-3 text-gray-700'>{item.feedback}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className='text-center py-20 text-gray-500'>No report available yet.</div>
//         )}
//         <button
//           onClick={() => navigate('/')}
//           className='mt-8 w-full rounded-full bg-emerald-600 text-white py-3 text-lg font-semibold hover:bg-emerald-700 transition'
//         >
//           Return Home
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Step3Report




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
styles={buildStyles({
pathColor:"#34d399",
trailColor:"#111827",
textColor:"#fff"
})}
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
Response Analysis
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