import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import {
BsRobot,
BsMic,
BsClock,
BsBarChart,
BsFileEarmarkText,
} from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel'

const Home = () => {
const {userData} = useSelector((state)=>state.user)
const [showAuth,setShowAuth] = useState(false)
const navigate = useNavigate()

const handleStart = ()=>{
if(!userData){
setShowAuth(true)
return
}
navigate('/interview')
}

const handleHistory = ()=>{
if(!userData){
setShowAuth(true)
return
}
navigate('/history')
}

const modules = [
{
icon:<BsRobot size={28}/>,
title:'Adaptive AI Engine',
desc:'Real-time smart questioning based on responses.'
},
{
icon:<BsMic size={28}/>,
title:'Voice Simulation',
desc:'Conversational mock interview sessions.'
},
{
icon:<BsBarChart size={28}/>,
title:'Performance Analytics',
desc:'Live confidence and response analysis.'
},
{
icon:<BsClock size={28}/>,
title:'Timed Pressure Rounds',
desc:'Interview under real-world constraints.'
},
{
icon:<BsFileEarmarkText size={28}/>,
title:'AI Feedback Reports',
desc:'Detailed post-interview improvement plans.'
},
]

return (
<div className='min-h-screen bg-black text-white overflow-hidden relative'>

<div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:60px_60px]' />

<div className='absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full'/>
<div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full'/>

<div className='relative z-10'>
<Navbar />

<div className='max-w-7xl mx-auto px-6 py-16'>

{/* HERO DASHBOARD */}
<div className='grid lg:grid-cols-12 gap-8 mb-24'>

<div className='lg:col-span-7'>
<div className='mb-8 inline-flex items-center gap-3 px-5 py-3 rounded-full border border-green-500/20 bg-green-500/10 backdrop-blur-xl'>
<HiSparkles className='text-green-400'/>
<span className='text-green-300 text-sm'>AI Powered Interview Operating System</span>
</div>

<h1 className='text-6xl md:text-7xl font-bold leading-tight mb-8'>
Train With Your
<span className='block bg-gradient-to-r from-green-300 via-cyan-400 to-green-500 bg-clip-text text-transparent'>
AI Interview Copilot
</span>
</h1>

<p className='text-zinc-400 text-xl max-w-2xl mb-10'>
Simulate interviews, receive adaptive follow-ups and improve through real-time AI feedback.
</p>

<div className='flex flex-wrap gap-5'>
<button
onClick={handleStart}
className='px-8 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold shadow-[0_0_35px_rgba(34,197,94,.4)] hover:scale-105 transition'
>
Launch Interview
</button>

<button
onClick={handleHistory}
className='px-8 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition'
>
Open History
</button>
</div>
</div>


{/* RIGHT DASHBOARD */}
<div className='lg:col-span-5 space-y-6'>

<div className='rounded-[34px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl'>
<div className='flex justify-between mb-8'>
<div>
<p className='text-zinc-500 text-sm'>AI Confidence Score</p>
<h3 className='text-5xl font-bold text-green-400'>94%</h3>
</div>
<div className='w-16 h-16 rounded-3xl bg-green-500/10 flex items-center justify-center border border-green-500/20'>
<BsBarChart size={28}/>
</div>
</div>

<div className='space-y-4'>
<div>
<div className='flex justify-between text-sm mb-2'>
<span>Communication</span>
<span>91%</span>
</div>
<div className='h-2 rounded-full bg-zinc-800'>
<div className='h-2 rounded-full bg-green-400 w-[91%]'/>
</div>
</div>

<div>
<div className='flex justify-between text-sm mb-2'>
<span>Technical</span>
<span>87%</span>
</div>
<div className='h-2 rounded-full bg-zinc-800'>
<div className='h-2 rounded-full bg-cyan-400 w-[87%]'/>
</div>
</div>
</div>
</div>

<div className='grid grid-cols-2 gap-6'>
<div className='rounded-[30px] bg-white/5 border border-white/10 p-8 backdrop-blur-xl'>
<p className='text-zinc-500'>Sessions</p>
<h3 className='text-4xl font-bold mt-3'>10K+</h3>
</div>

<div className='rounded-[30px] bg-white/5 border border-white/10 p-8 backdrop-blur-xl'>
<p className='text-zinc-500'>Roles</p>
<h3 className='text-4xl font-bold mt-3'>50+</h3>
</div>
</div>

</div>
</div>


{/* COMMAND MODULES */}
<div className='mb-28'>
<div className='flex items-center justify-between mb-12'>
<h2 className='text-5xl font-bold'>AI Modules</h2>
<div className='text-green-400'>System Online ●</div>
</div>

<div className='grid md:grid-cols-3 gap-7'>
{modules.map((item,index)=>(
<div
key={index}
className='group rounded-[34px] bg-white/5 border border-white/10 p-8 backdrop-blur-2xl hover:border-green-500/40 hover:-translate-y-2 transition-all duration-300'
>
<div className='w-16 h-16 rounded-3xl mb-7 bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(34,197,94,.35)]'>
{item.icon}
</div>

<h3 className='text-2xl font-semibold mb-4'>
{item.title}
</h3>

<p className='text-zinc-500 leading-relaxed'>
{item.desc}
</p>
</div>
))}
</div>
</div>


{/* FUTURISTIC FEATURE PANELS */}
<div className='grid md:grid-cols-2 gap-8 mb-28'>

<div className='rounded-[38px] p-10 border border-green-500/20 bg-gradient-to-br from-green-500/10 to-transparent backdrop-blur-2xl'>
<p className='text-green-400 mb-4'>INTERVIEW ENGINE</p>
<h3 className='text-4xl font-bold mb-6'>Adaptive Follow-Up Intelligence</h3>
<p className='text-zinc-400 text-lg mb-8'>
Questions evolve based on your answers like real interviewers.
</p>

<div className='grid grid-cols-2 gap-6'>
<div className='bg-black/30 rounded-3xl p-6'>Difficulty ↑</div>
<div className='bg-black/30 rounded-3xl p-6'>Smart Prompts</div>
</div>
</div>

<div className='rounded-[38px] p-10 bg-white/5 border border-white/10 backdrop-blur-2xl'>
<p className='text-cyan-400 mb-4'>ANALYTICS CORE</p>
<h3 className='text-4xl font-bold mb-6'>Performance Radar</h3>

<div className='space-y-5 mt-10'>
{['Communication','Confidence','Problem Solving'].map((item,i)=>(
<div key={i} className='flex justify-between border-b border-white/5 pb-4'>
<span className='text-zinc-400'>
{item}
</span>
<span className='text-white font-semibold'>Strong</span>
</div>
))}
</div>

</div>

</div>


{/* CTA */}
<div className='rounded-[42px] border border-green-500/20 bg-gradient-to-r from-green-500/10 via-black to-cyan-500/10 backdrop-blur-2xl p-16 text-center shadow-2xl'>
<h2 className='text-6xl font-bold mb-6'>Initialize Interview Mode</h2>
<p className='text-zinc-400 text-xl max-w-3xl mx-auto mb-10'>
Start practicing with your AI interview copilot and level up faster.
</p>

<button
onClick={handleStart}
className='px-12 py-5 rounded-2xl bg-gradient-to-r from-green-400 to-cyan-400 text-black text-lg font-semibold shadow-[0_0_40px_rgba(34,197,94,.45)] hover:scale-105 transition'
>
Start Session
</button>
</div>

</div>

{showAuth && <AuthModel onClose={()=>setShowAuth(false)} />}

</div>
</div>
)
}

export default Home
