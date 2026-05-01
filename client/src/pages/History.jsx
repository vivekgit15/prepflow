import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { HiSparkles } from "react-icons/hi";
import { FaArrowLeft, FaHistory, FaRobot } from "react-icons/fa";

const History = () => {

const { userData } = useSelector((state)=>state.user)
const navigate = useNavigate()

return (
<div className="min-h-screen bg-black text-white relative overflow-hidden">

{/* cyber grid */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* glows */}
<div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full"/>
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full"/>

<div className="relative z-10">
<Navbar/>

<div className="max-w-7xl mx-auto px-6 py-14">


{/* Header */}
<div className="flex justify-between items-center mb-14 flex-wrap gap-6">

<div className="flex items-center gap-5">

<button
onClick={()=>navigate("/")}
className="
w-14 h-14 rounded-2xl
bg-white/5 border border-white/10
hover:border-green-500/30
backdrop-blur-xl
transition
flex items-center justify-center
"
>
<FaArrowLeft/>
</button>


<div>
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
<HiSparkles className="text-green-400"/>
<span className="text-green-300 text-sm">
History Archive
</span>
</div>

<h1 className="text-6xl font-bold">
Interview
<span className="block bg-gradient-to-r from-green-300 via-cyan-300 to-green-500 bg-clip-text text-transparent">
Command Center
</span>
</h1>

<p className="text-zinc-500 mt-4 text-lg">
Review sessions, analytics and performance history.
</p>

</div>

</div>


<div className="text-green-400">
Archive Online ●
</div>

</div>




{/* top stats */}
<div className="grid md:grid-cols-3 gap-7 mb-12">

<div className="rounded-[34px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">
<div className="w-16 h-16 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-6">
<FaHistory size={28}/>
</div>

<h3 className="text-4xl font-bold mb-3">
0
</h3>

<p className="text-zinc-500">
Completed Interviews
</p>
</div>


<div className="rounded-[34px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">
<div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
<FaRobot size={28}/>
</div>

<h3 className="text-4xl font-bold mb-3">
AI
</h3>

<p className="text-zinc-500">
Interview Engine Ready
</p>
</div>


<div className="rounded-[34px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">
<div className="w-16 h-16 rounded-3xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-6">
<HiSparkles size={28}/>
</div>

<h3 className="text-4xl font-bold mb-3">
∞
</h3>

<p className="text-zinc-500">
Growth Potential
</p>
</div>

</div>




{/* Main panel */}
<div className="
rounded-[42px]
bg-white/5
border border-white/10
backdrop-blur-2xl
p-12
shadow-2xl
">

<div className="grid lg:grid-cols-2 gap-12 items-center">


{/* Left */}
<div>

<h2 className="text-5xl font-bold leading-tight mb-8">
Interview History
Module Initializing
</h2>

<p className="text-zinc-400 text-lg leading-relaxed mb-8">
{userData
? `Logged in as ${userData.name}. Your interview analytics and session history will appear here.`
: "Sign in to unlock interview archives and performance reports."
}
</p>


<div className="space-y-5">

<div className="rounded-3xl bg-black/30 border border-white/10 p-6">
<div className="flex justify-between">
<span className="text-zinc-500">
Past Interviews
</span>

<span className="text-green-400">
0
</span>
</div>
</div>


<div className="rounded-3xl bg-black/30 border border-white/10 p-6">
<div className="flex justify-between">
<span className="text-zinc-500">
Reports Generated
</span>

<span className="text-cyan-400">
0
</span>
</div>
</div>


<div className="rounded-3xl bg-black/30 border border-white/10 p-6">
<div className="flex justify-between">
<span className="text-zinc-500">
AI Confidence Trend
</span>

<span className="text-green-300">
Pending
</span>
</div>
</div>

</div>

</div>



{/* Right Placeholder */}
<div className="
rounded-[36px]
border border-green-500/20
bg-gradient-to-br from-green-500/10 to-transparent
p-12
text-center
">

<div className="
w-28 h-28 mx-auto mb-8
rounded-[32px]
bg-green-500/10
border border-green-500/20
flex items-center justify-center
text-green-400
">
<FaHistory size={44}/>
</div>


<h3 className="text-4xl font-bold mb-5">
History Coming Soon
</h3>

<p className="text-zinc-400 mb-10 leading-relaxed">
Your interview archive will live here.
Start practicing now to generate reports.
</p>

<button
onClick={()=>navigate("/")}
className="
px-10 py-5 rounded-2xl
bg-gradient-to-r from-green-400 to-cyan-400
text-black font-semibold
hover:scale-105
transition
shadow-[0_0_35px_rgba(34,197,94,.35)]
"
>
Start New Interview
</button>

</div>


</div>

</div>



{/* footer cta */}
<div className="
mt-14
rounded-[42px]
border border-green-500/20
bg-gradient-to-r from-green-500/10 via-black to-cyan-500/10
backdrop-blur-2xl
p-14
text-center
">

<h2 className="text-5xl font-bold mb-6">
Train. Improve. Repeat.
</h2>

<p className="text-zinc-400 text-lg max-w-3xl mx-auto">
Build interview confidence with AI powered practice sessions.
</p>

</div>


</div>

</div>

</div>
)
}

export default History
