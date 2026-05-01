import React, { useState } from "react";
import axios from "axios";
import {
    FaUserTie,
    FaFileUpload,
    FaMicrophoneAlt,
    FaArrowLeft
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { ServerUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Step1SetUp = ({ onStart }) => {

    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [role, setRole] = useState("")
    const [experience, setExperience] = useState("")
    const [mode, setMode] = useState("Technical")
    const [resumeFile, setResumeFile] = useState(null)
    const [projects, setProjects] = useState([])
    const [skills, setSkills] = useState([])
    const [resumeText, setResumeText] = useState("")
    const [analysisDone, setAnalysisDone] = useState(false)
    const [analyzing, setAnalyzing] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleResumeUpload = async () => {
        if (!resumeFile || analyzing) return

        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/resume",
                formdata,
                { withCredentials: true }
            )

            setRole(result.data.role || "")
            setExperience(result.data.experience || "")
            setProjects(result.data.projects || [])
            setSkills(result.data.skills || [])
            setResumeText(result.data.resumeText || "")
            setAnalysisDone(true)

        } catch (error) {
            console.log(error)
        }
        finally {
            setAnalyzing(false)
        }
    }


    const handleStart = async () => {
        setLoading(true)

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                {
                    role,
                    experience,
                    mode,
                    resumeText,
                    projects,
                    skills
                },
                {
                    withCredentials: true
                }
            )

            if (userData) {
                dispatch(
                    setUserData({
                        ...userData,
                        credits: result.data.creditsLeft
                    })
                )
            }

            onStart?.(result.data)

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">

            {/* cyber grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

            {/* glows */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-12 gap-10">

                    {/* LEFT COMMAND PANEL */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-4 mb-8">
                            <button
                                onClick={() => navigate("/")}
                                className="w-14 h-14 rounded-2xl p-5 bg-white/5 border border-white/10
      hover:border-green-500/30 backdrop-blur-xl transition flex items-center justify-center"
                            >
                                <FaArrowLeft />
                            </button>

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                                <HiSparkles className="text-green-400" />

                                <span className="text-green-300 text-sm">
                                    Interview Initialization
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-6xl font-bold leading-tight mb-8">
                            Configure Your
                            <span className="block bg-gradient-to-r from-green-300 via-cyan-300 to-green-500 bg-clip-text text-transparent">
                                AI Mock Session
                            </span>
                        </h1>

                        <p className="text-zinc-400 text-lg mb-12">
                            Prepare realistic adaptive interviews powered by your role,
                            resume and skills.
                        </p>


                        <div className="space-y-6">

                            {[
                                {
                                    icon: <FaUserTie />,
                                    title: "Role Intelligence",
                                    text: "Select role and experience calibration"
                                },
                                {
                                    icon: <FaFileUpload />,
                                    title: "Resume Parsing",
                                    text: "AI extracts projects and technologies"
                                },
                                {
                                    icon: <FaMicrophoneAlt />,
                                    title: "Voice Simulation",
                                    text: "Practice realistic spoken interviews"
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-[30px] bg-white/5 border border-white/10 p-7 backdrop-blur-2xl hover:border-green-500/30 transition"
                                >
                                    <div className="flex gap-5 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center text-xl">
                                            {item.icon}
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-zinc-500">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>



                    {/* RIGHT CONTROL PANEL */}
                    <div className="lg:col-span-7">

                        <div className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl p-10 shadow-2xl">

                            <div className="flex items-center justify-between mb-10">
                                <h2 className="text-4xl font-bold">
                                    Interview Setup
                                </h2>

                                <div className="text-green-400 text-sm">
                                    System Online ●
                                </div>
                            </div>



                            <div className="space-y-7">

                                {/* role */}
                                <div>
                                    <label className="text-zinc-500 text-sm mb-3 block">
                                        Target Role
                                    </label>

                                    <div className="relative">
                                        <FaUserTie className="absolute left-5 top-5 text-zinc-500" />

                                        <input
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            placeholder="Frontend Developer"
                                            className="
w-full
pl-14 pr-5 py-4
rounded-2xl
bg-black/40
border border-white/10
outline-none
focus:border-green-500/40
"
                                        />
                                    </div>
                                </div>


                                {/* exp */}
                                <div>
                                    <label className="text-zinc-500 text-sm mb-3 block">
                                        Experience
                                    </label>

                                    <div className="relative">
                                        <FaUserTie className="absolute left-5 top-5 text-zinc-500" />

                                        <input
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            placeholder="2 Years"
                                            className="
w-full
pl-14 pr-5 py-4
rounded-2xl
bg-black/40
border border-white/10
outline-none
focus:border-green-500/40
"
                                        />
                                    </div>
                                </div>


                                {/* mode */}
                                <div>
                                    <label className="text-zinc-500 text-sm mb-3 block">
                                        Interview Mode
                                    </label>

                                    <select
                                        value={mode}
                                        onChange={(e) => setMode(e.target.value)}
                                        className="
w-full py-4 px-5 rounded-2xl
bg-black/40 border border-white/10
outline-none
"
                                    >
                                        <option value="Technical">
                                            Technical Interview
                                        </option>

                                        <option value="HR">
                                            HR Interview
                                        </option>
                                    </select>
                                </div>



                                {/* upload */}
                                {!analysisDone && (
                                    <div
                                        onClick={() => document.getElementById("resumeUpload").click()}
                                        className="
rounded-[30px]
border-2 border-dashed border-green-500/30
bg-green-500/5
p-10
text-center
cursor-pointer
hover:border-green-400
transition
"
                                    >

                                        <FaFileUpload className="text-5xl mx-auto mb-5 text-green-400" />

                                        <input
                                            id="resumeUpload"
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={(e) => setResumeFile(e.target.files[0])}
                                        />

                                        <p className="text-zinc-400 font-medium">
                                            {resumeFile
                                                ? resumeFile.name
                                                : "Upload Resume (Optional)"}
                                        </p>

                                        {resumeFile && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleResumeUpload()
                                                }}
                                                className="
mt-6 px-7 py-3 rounded-2xl
bg-gradient-to-r from-green-400 to-cyan-400
text-black font-semibold
"
                                            >
                                                {analyzing ? "Analyzing..." : "Analyze Resume"}
                                            </button>
                                        )}

                                    </div>
                                )}



                                {/* analysis */}
                                {analysisDone && skills.length > 0 && (
                                    <div className="rounded-[30px] bg-white/5 border border-green-500/20 p-7">
                                        <h3 className="text-xl font-semibold mb-5">
                                            Resume Intelligence Output
                                        </h3>

                                        <div className="flex flex-wrap gap-3">
                                            {skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}



                                <button
                                    onClick={handleStart}
                                    disabled={!role || !experience || loading}
                                    className="
w-full
py-5
rounded-2xl
font-semibold text-lg
bg-gradient-to-r from-green-400 to-cyan-400
text-black
disabled:opacity-50
shadow-[0_0_35px_rgba(34,197,94,.35)]
hover:scale-[1.01]
transition
"
                                >
                                    {loading ? "Initializing..." : "Start Interview"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Step1SetUp