import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel'
import axios from 'axios'
import { HiSparkles } from 'react-icons/hi'
import { BsLightningChargeFill } from 'react-icons/bs'

const Navbar = () => {

const { userData } = useSelector((state)=>state.user)
const [showCreditPopup,setShowCreditPopup]=useState(false)
const [showUserPopup,setShowUserPopup]=useState(false)
const [showAuth,setShowAuth]=useState(false)

const navigate = useNavigate()
const dispatch = useDispatch()

const handleLogout = async()=>{
try {
await axios.get(
ServerUrl+'/api/auth/logout',
{withCredentials:true}
)

dispatch(setUserData(null))
setShowCreditPopup(false)
setShowUserPopup(false)
navigate('/')
} catch (error){
  console.log(error)
}
}

return (
<div className='px-4 pt-6 flex justify-center relative z-50'>

<div className='w-full max-w-7xl rounded-[30px]
backdrop-blur-2xl
bg-white/5
border border-white/10
shadow-[0_0_50px_rgba(0,0,0,.35)]
px-8 py-5 flex items-center justify-between'>

{/* LEFT */}
<div
onClick={()=>navigate('/')}
className='flex items-center gap-4 cursor-pointer group'
>

<div className='relative'>
<div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center text-black font-bold shadow-[0_0_25px_rgba(34,197,94,.4)]'>
P
</div>
<div className='absolute -inset-1 rounded-2xl bg-green-400/20 blur-lg -z-10'/>
</div>

<div>
<h1 className='text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-green-300 to-cyan-300 bg-clip-text text-transparent'>
PrepFlow
</h1>
<div className='hidden md:flex items-center gap-2 text-xs text-green-400 mt-1'>
<HiSparkles/>
AI Interview OS
</div>
</div>

</div>


{/* CENTER STATUS */}
<div className='hidden lg:flex items-center gap-3 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-xl'>
<div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'/>
<span className='text-green-300 text-sm'>System Online</span>
</div>


{/* RIGHT */}
<div className='flex items-center gap-5 relative'>

{/* Credits */}
<div className='relative'>
<button
onClick={()=>{
if(!userData){
setShowAuth(true)
return
}
setShowCreditPopup(!showCreditPopup)
setShowUserPopup(false)
}}
className='group px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-green-500/30 transition flex items-center gap-3'
>
<div className='w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400'>
<BsLightningChargeFill/>
</div>

<div className='text-left'>
<p className='text-[11px] text-zinc-500'>Credits</p>
<p className='font-semibold text-white'>
{userData?.credits || 0}
</p>
</div>
</button>

{showCreditPopup && (
<div className='absolute right-0 mt-4 w-72 rounded-[28px] bg-zinc-950/95 border border-green-500/20 backdrop-blur-2xl shadow-2xl p-6'>

<div className='mb-4'>
<p className='text-green-300 font-semibold mb-2'>Credit Engine</p>
<p className='text-zinc-400 text-sm'>Need more credits to continue interviews?</p>
</div>

<button
onClick={()=>navigate('/pricing')}
className='w-full py-3 rounded-2xl bg-gradient-to-r from-green-400 to-cyan-400 text-black font-semibold hover:scale-[1.02] transition'
>
Buy More Credits
</button>

</div>
)}
</div>


{/* Avatar */}
<div className='relative'>
<button
onClick={()=>{
if(!userData){
setShowAuth(true)
return
}
setShowUserPopup(!showUserPopup)
setShowCreditPopup(false)
}}
className='relative w-11 h-11 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-green-500/30 text-green-300 font-semibold shadow-[0_0_20px_rgba(34,197,94,.18)] hover:scale-105 transition'
>
{userData ? userData?.name.slice(0,1).toUpperCase() : 'V'}
</button>

{showUserPopup && (
<div className='absolute right-0 mt-4 w-64 rounded-[28px] bg-zinc-950/95 border border-white/10 backdrop-blur-2xl shadow-2xl p-6'>

<div className='pb-5 border-b border-white/5'>
<p className='text-green-300 font-semibold text-lg'>
{userData?.name}
</p>
<p className='text-zinc-500 text-sm'>Interview Candidate</p>
</div>

<div className='pt-5 space-y-3'>
<button
onClick={()=>navigate('/history')}
className='w-full text-left p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition text-zinc-300'
>
Interview History
</button>

<button
onClick={handleLogout}
className='w-full text-left p-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 transition text-red-400'
>
Logout
</button>
</div>

</div>
)}
</div>

</div>

</div>

{showAuth && (
<AuthModel onClose={()=>setShowAuth(false)} />
)}

</div>
)
}

export default Navbar
