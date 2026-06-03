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
import toast from "react-hot-toast";

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

    if (userData?.credits <= 0) {
        toast.error("You have no credits remaining. Please upgrade your plan.");
        return;
    }

    if (userData?.credits <= 2) {
        toast("⚠ Warning: Only a few credits remaining.");
    }

    setLoading(true);

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
        );

        if (userData) {
            dispatch(
                setUserData({
                    ...userData,
                    credits: result.data.creditsLeft
                })
            );
        }

        toast.success("Interview created successfully!");

        onStart?.(result.data);

    } catch (error) {

        if (error.response?.status === 403) {
            toast.error("Insufficient credits.");
        } else {
            toast.error("Failed to start interview.");
        }

        console.log(error);

    } finally {
        setLoading(false);
    }
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

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* ================= LEFT COMMAND PANEL ================= */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10
                                hover:border-green-500/20 backdrop-blur-xl transition flex items-center justify-center text-base"
                            >
                                <FaArrowLeft />
                            </button>

                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                                <HiSparkles className="text-green-400 text-sm" />
                                <span className="text-green-300 text-xs tracking-wider uppercase font-semibold">
                                    Interview Initialization
                                </span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                            Configure Your
                            <span className="block bg-gradient-to-r from-green-300 via-cyan-300 to-green-500 bg-clip-text text-transparent mt-1">
                                AI Mock Session
                            </span>
                        </h1>

                        <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                            Prepare realistic adaptive interviews powered by your target role, 
                            resume analytics, and domain skillset.
                        </p>

                        {/* Feature Mini Cards */}
                        <div className="space-y-4 pt-3">
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
                                    className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 backdrop-blur-2xl hover:border-green-500/10 transition duration-300"
                                >
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center text-lg shrink-0">
                                            {item.icon}
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold text-zinc-200">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500 mt-0.5">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= RIGHT SETUP CONSOLE ================= */}
                    <div className="lg:col-span-7">

                        <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-8 shadow-xl">

                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-5">
                                <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
                                    Interview Workspace
                                </h2>
                                <div className="text-green-400 text-xs font-semibold bg-green-500/5 border border-green-500/10 px-3 py-1 rounded-md">
                                    System Online ●
                                </div>
                            </div>

                            <div className="space-y-6">

                                {/* Role Input */}
                                <div>
                                    <label className="text-zinc-400 text-xs font-bold mb-2.5 block uppercase tracking-wider">
                                        Target Role
                                    </label>
                                    <div className="relative">
                                        <FaUserTie className="absolute left-4 top-4 text-zinc-500 text-base" />
                                        <input
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            placeholder="e.g., Frontend Developer"
                                            className="w-full pl-12 pr-4 h-13 rounded-xl bg-black/40 border border-white/10 outline-none text-base text-zinc-200 focus:border-green-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Experience Input */}
                                <div>
                                    <label className="text-zinc-400 text-xs font-bold mb-2.5 block uppercase tracking-wider">
                                        Experience Level
                                    </label>
                                    <div className="relative">
                                        <FaUserTie className="absolute left-4 top-4 text-zinc-500 text-base" />
                                        <input
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            placeholder="e.g., Fresher / 2 Years"
                                            className="w-full pl-12 pr-4 h-13 rounded-xl bg-black/40 border border-white/10 outline-none text-base text-zinc-200 focus:border-green-500/20 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Mode Select */}
                                <div>
                                    <label className="text-zinc-400 text-xs font-bold mb-2.5 block uppercase tracking-wider">
                                        Interview Mode
                                    </label>
                                    <select
                                        value={mode}
                                        onChange={(e) => setMode(e.target.value)}
                                        className="w-full h-13 px-4 rounded-xl bg-black/40 border border-white/10 outline-none text-base text-zinc-300 focus:border-green-500/20 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Technical" className="bg-[#0f0f0f]">Technical Interview</option>
                                        <option value="HR" className="bg-[#0f0f0f]">HR Interview</option>
                                    </select>
                                </div>

                                {/* Upload Field */}
                                {!analysisDone && (
                                    <div
                                        onClick={() => document.getElementById("resumeUpload").click()}
                                        className="rounded-xl border-2 border-dashed border-green-500/20 bg-green-500/[0.02] p-8 text-center cursor-pointer hover:border-green-500/40 transition duration-200 flex flex-col items-center justify-center min-h-[160px]"
                                    >
                                        <FaFileUpload className="text-4xl mb-4 text-green-400/80" />
                                        <input
                                            id="resumeUpload"
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={(e) => setResumeFile(e.target.files[0])}
                                        />
                                        <p className="text-sm text-zinc-300 font-medium">
                                            {resumeFile ? resumeFile.name : "Upload Resume PDF (Optional)"}
                                        </p>

                                        {resumeFile && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleResumeUpload()
                                                }}
                                                className="mt-5 px-6 h-10 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold text-sm tracking-wide shadow-md hover:opacity-90 transition-all"
                                            >
                                                {analyzing ? "Analyzing Stack..." : "Analyze File"}
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Intelligence Output */}
                                {analysisDone && skills.length > 0 && (
                                    <div className="rounded-xl bg-green-500/5 border border-green-500/10 p-6 animate-fadeIn">
                                        <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-4">
                                            Extracted Core Competencies
                                        </h3>
                                        <div className="flex flex-wrap gap-2.5">
                                            {skills.map((skill, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/10 text-green-300 text-sm font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Start Button */}
                                <button
                                    onClick={handleStart}
                                    disabled={!role || !experience || loading}
                                    className="w-full h-13 mt-4 rounded-xl font-bold text-base bg-gradient-to-r from-green-400 to-cyan-400 text-black shadow-lg shadow-green-500/10 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition duration-200"
                                >
                                    {loading ? "Calibrating Environment..." : "Start Assessment Session"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Step1SetUp;
