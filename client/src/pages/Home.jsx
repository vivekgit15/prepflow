import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRight,
} from 'react-icons/bs'
import { HiSparkles } from 'react-icons/hi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AuthModel from '../components/AuthModel'

const Home = () => {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const navigate = useNavigate()

  const handleStart = () => {
    if (!userData) {
      setShowAuth(true)
      return
    }
    navigate('/interview')
  }

  const handleHistory = () => {
    if (!userData) {
      setShowAuth(true)
      return
    }
    navigate('/history')
  }

  const modules = [
    {
      icon: <BsRobot size={24} />,
      title: 'Adaptive AI Engine',
      desc: 'Real-time smart questioning based on responses.',
    },
    {
      icon: <BsMic size={24} />,
      title: 'Voice Simulation',
      desc: 'Conversational mock interview sessions.',
    },
    {
      icon: <BsBarChart size={24} />,
      title: 'Performance Analytics',
      desc: 'Live confidence and response analysis.',
    },
    {
      icon: <BsClock size={24} />,
      title: 'Timed Pressure Rounds',
      desc: 'Interview under real-world constraints.',
    },
    {
      icon: <BsFileEarmarkText size={24} />,
      title: 'AI Feedback Reports',
      desc: 'Detailed post-interview improvement plans.',
    },
  ]

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Software Engineer at Amazon",
      text: "Placed at Amazon with PrepFlow AI! The mock environment felt incredibly real.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
    },
    {
      name: "Arjun Mehta",
      role: "Frontend Developer",
      text: "Best AI interview platform I used. My confidence improved massively within a week.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      name: "Elena Rostova",
      role: "Full Stack Fresh Grad",
      text: "The voice simulation feels so real. Perfect for college campus placements.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      name: "Marcus Chen",
      role: "Data Analyst",
      text: "Amazing analytics dashboard. It pointed out exactly where my communication lagged.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
    }
  ]

  return (
    <div className='min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans'>

      {/* BACKGROUND */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]' />
        <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/5 blur-[140px] rounded-full' />
        <div className='absolute right-1/4 top-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full' />
      </div>

      <div className='relative z-10'>
        <Navbar />

        {/* HERO SECTION */}
        <section className='relative pt-24 pb-20'>
          <div className='max-w-7xl mx-auto px-6'>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className='text-center max-w-4xl mx-auto'
            >
              {/* Badge */}
              <div className='mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-green-500/20 bg-green-500/10 backdrop-blur-xl'>
                <HiSparkles className='text-green-400 text-sm' />
                <span className='text-green-300 text-xs tracking-wider uppercase font-semibold'>
                  AI-Powered Operating System
                </span>
              </div>

              {/* Heading (Comfortably Balanced size) */}
              <h1 className='text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.05]'>
                Smarter Interview
                <span className='block bg-gradient-to-r from-white via-green-200 to-cyan-300 bg-clip-text text-transparent mt-2'>
                  Preparation With AI
                </span>
              </h1>

              {/* Description */}
              <p className='text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed'>
                Simulate realistic interviews, tackle adaptive follow-ups, and elevate your response quality with direct AI evaluations.
              </p>

              {/* Buttons */}
              <div className='flex items-center justify-center gap-5 flex-wrap'>
                <button
                  onClick={handleStart}
                  className='px-7 py-3.5 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold hover:scale-[1.02] transition flex items-center gap-2.5 text-base'
                >
                  Launch Interview
                  <BsArrowRight />
                </button>
                <button
                  onClick={handleHistory}
                  className='px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition text-base'
                >
                  Open History
                </button>
              </div>
            </motion.div>

            {/* CONSOLE / DASHBOARD MOCKUP */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className='mt-20 relative max-w-5xl mx-auto'
            >
              <div className='absolute inset-0 bg-green-500/5 blur-[120px]' />
              <div className='relative rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,.85)]'>
                
                {/* Dashboard Topbar */}
                <div className='h-14 border-b border-white/5 flex items-center justify-between px-6 bg-black/30'>
                  <div className='flex items-center gap-2.5'>
                    <div className='w-3 h-3 rounded-full bg-red-500/30' />
                    <div className='w-3 h-3 rounded-full bg-yellow-500/30' />
                    <div className='w-3 h-3 rounded-full bg-green-500/30' />
                    <span className='text-zinc-400 text-sm ml-2 font-mono'>PrepFlow Console</span>
                  </div>
                  <div className='hidden md:flex gap-8 text-sm text-zinc-500'>
                    <p className='text-zinc-300'>Dashboard</p>
                    <p>Analytics</p>
                    <p>Reports</p>
                  </div>
                  <div className='w-16' />
                </div>

                {/* Dashboard Inner Content */}
                <div className='grid md:grid-cols-[220px_1fr] min-h-[460px]'>
                  {/* Sidebar */}
                  <div className='border-r border-white/5 p-5 bg-black/15 hidden md:block'>
                    <div className='space-y-2'>
                      {['Overview', 'AI Interview', 'Voice Mode', 'Analytics'].map((item, index) => (
                        <div
                          key={index}
                          className={`h-11 rounded-xl px-4 flex items-center text-sm font-medium ${
                            index === 0 ? 'bg-white/[0.06] text-green-400' : 'text-zinc-500'
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Metrics Area */}
                  <div className='p-8 flex flex-col justify-between gap-8'>
                    <div className='grid grid-cols-3 gap-5'>
                      {[
                        { val: '1,428', label: 'Interviews' },
                        { val: '94%', label: 'Confidence Score' },
                        { val: '367', label: 'AI Reports' }
                      ].map((item, index) => (
                        <div key={index} className='rounded-2xl border border-white/5 bg-white/[0.02] p-5'>
                          <p className='text-zinc-500 text-xs uppercase tracking-wider font-semibold'>{item.label}</p>
                          <h3 className='text-2xl md:text-3xl font-bold mt-2 text-zinc-100'>{item.val}</h3>
                        </div>
                      ))}
                    </div>

                    {/* Chart Container */}
                    <div className='rounded-2xl border border-white/5 bg-white/[0.01] h-56 relative overflow-hidden p-6 flex items-end justify-between px-8'>
                      {[35, 65, 45, 85, 55, 95, 70].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.05, duration: 0.7 }}
                          className='w-10 md:w-12 rounded-t-xl bg-gradient-to-t from-green-500/20 to-green-400/80'
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* TESTIMONIALS (Moving Loop) */}
        <section className='py-14 border-y border-white/5 bg-black/20 overflow-hidden relative'>
          <div className='flex gap-6 animate-marquee whitespace-nowrap width-max'>
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className='inline-flex flex-col gap-4 w-[350px] shrink-0 p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md whitespace-normal'
              >
                <div className='flex items-center gap-3.5'>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className='w-12 h-12 rounded-full object-cover border border-white/10'
                  />
                  <div>
                    <h4 className='text-base font-semibold text-zinc-200 leading-none mb-1'>{item.name}</h4>
                    <span className='text-xs text-zinc-500'>{item.role}</span>
                  </div>
                </div>
                <div className='text-sm text-yellow-500 flex gap-0.5'>
                  {Array(5).fill("").map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className='text-sm text-zinc-400 leading-relaxed'>
                  "{item.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className='py-24'>
          <div className='max-w-6xl mx-auto px-6'>
            <div className='flex items-end justify-between mb-12'>
              <div>
                <p className='text-green-400 text-sm font-semibold tracking-widest uppercase mb-2'>Features</p>
                <h2 className='text-3xl md:text-4xl font-bold'>Advanced AI Modules</h2>
              </div>
              <div className='text-sm text-zinc-500 bg-white/5 px-4 py-1.5 rounded-full border border-white/5'>
                System Online <span className='text-green-400 ml-1'>●</span>
              </div>
            </div>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {modules.map((item, index) => (
                <div
                  key={index}
                  className='rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-green-500/20 transition-all duration-300'
                >
                  <div className='w-12 h-12 rounded-2xl mb-5 bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center'>
                    {item.icon}
                  </div>
                  <h3 className='text-lg font-semibold mb-2.5 text-zinc-200'>{item.title}</h3>
                  <p className='text-sm text-zinc-500 leading-relaxed'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className='pb-28'>
          <div className='max-w-5xl mx-auto px-6'>
            <div className='rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-14 text-center relative overflow-hidden'>
              <div className='absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-green-500/5 blur-[90px] rounded-full' />
              
              <h2 className='text-4xl font-bold mb-4 relative z-10'>
                Initialize Interview Mode
              </h2>
              <p className='text-zinc-400 text-base max-w-md mx-auto mb-8 relative z-10'>
                Start practicing with your AI interview copilot and get comprehensive analytics instantly.
              </p>
              <button
                onClick={handleStart}
                className='px-10 py-3.5 rounded-xl bg-white text-black font-semibold text-base hover:bg-zinc-200 transition relative z-10'
              >
                Start Session
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className='border-t border-white/5 bg-black/40 backdrop-blur-2xl py-14 text-sm text-zinc-500'>
          <div className='max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6'>
            <div>
              <div className='flex items-center gap-2.5 mb-2'>
                <div className='w-7 h-7 rounded-xl bg-green-400 flex items-center justify-center text-black font-bold text-sm'>P</div>
                <span className='font-bold text-base text-white tracking-tight'>PrepFlow AI</span>
              </div>
              <p>© 2026 PrepFlow AI • All Rights Reserved</p>
            </div>
            <div className='flex gap-8'>
              <p className='hover:text-green-400 transition cursor-pointer'>Privacy Policy</p>
              <p className='hover:text-green-400 transition cursor-pointer'>Terms of Service</p>
            </div>
          </div>
        </footer>

        {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      </div>
    </div>
  )
}

export default Home
