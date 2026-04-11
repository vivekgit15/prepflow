import React, { useState } from 'react'
import axios from 'axios'
import {
    FaUserTie,
    FaFileUpload,
    FaMicrophoneAlt
} from "react-icons/fa";
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Step1SetUp = ({ onStart }) => {

    const {userData} = useSelector((state) => state.user);
    const dispatch = useDispatch(); 
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [loading , setLoading] = useState(false)

    const handleResumeUpload = async () => {
        if (!resumeFile || analyzing) return;

        setAnalyzing(true);

        const formdata = new FormData();
        formdata.append("resume", resumeFile);

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/resume",
                formdata,
                { withCredentials: true }
            );

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
        } catch (error) {
            console.log(error);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleStart = async () =>{
        setLoading(true)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role , experience , mode , resumeText, projects, skills}, {withCredentials:true})
            console.log(result.data)
            if(userData){
                dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
            }

            setLoading(false)
            onStart?.(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4'>
            <div className='w-full max-w-6xl bg-white rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden'>

                {/* LEFT SIDE */}
                <div className='bg-gradient-to-br from-green-50 to-green-100 p-12 flex flex-col justify-center'>
                    <h2 className='text-4xl font-bold text-gray-800 mb-6'>
                        Start your AI interview
                    </h2>

                    <p className='text-gray-600 mb-10'>
                        Practice real interview scenarios powered by AI.
                        Improve communication, technical skills, and confidence.
                    </p>

                    <div className="space-y-5">
                        {[
                            {
                                icon: <FaUserTie className="text-green-600 text-xl" />,
                                text: "Choose role and experience",
                            },
                            {
                                icon: <FaFileUpload className="text-green-600 text-xl" />,
                                text: "Upload resume for analysis",
                            },
                            {
                                icon: <FaMicrophoneAlt className="text-green-600 text-xl" />,
                                text: "Smart voice interview",
                            },
                        ].map((item, index) => (
                            <div key={index} className='flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm'>
                                {item.icon}
                                <span className='text-gray-700 font-medium'>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className='p-12 bg-white'>
                    <h2 className='text-3xl font-bold text-gray-800 mb-8'>
                        Interview Setup
                    </h2>

                    <div className='space-y-6'>

                        {/* ROLE */}
                        <div className='relative'>
                            <FaUserTie className="absolute top-4 left-4 text-gray-400" />
                            <input
                                type='text'
                                placeholder='Enter role'
                                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none'
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />
                        </div>

                        {/* EXPERIENCE */}
                        <div className='relative'>
                            <FaUserTie className="absolute top-4 left-4 text-gray-400" />
                            <input
                                type='text'
                                placeholder='Experience'
                                className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none'
                                onChange={(e) => setExperience(e.target.value)}
                                value={experience}
                            />
                        </div>

                        {/* MODE */}
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full py-3 px-4 border border-gray-200 rounded-xl outline-none'
                        >
                            <option value="Technical">Technical Interview</option>
                            <option value="HR">HR Interview</option>
                        </select>

                        {/* RESUME UPLOAD */}
                        {!analysisDone && (
                            <div
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50'
                            >
                                <FaFileUpload className="text-4xl mx-auto text-green-600 mb-3" />

                                <input
                                    type="file"
                                    accept='application/pdf'
                                    id='resumeUpload'
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />

                                <p className='text-gray-600 font-medium'>
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleResumeUpload();
                                        }}
                                        className='mt-4 bg-gray-900 text-white px-5 py-2 rounded-lg'
                                    >
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* RESULT */}
                        {analysisDone && skills.length > 0 && (
                            <div className='bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-4'>
                                <h3 className='text-lg font-semibold text-gray-800'>
                                    Resume Analysis Result
                                </h3>

                                <p className='font-medium text-gray-700'>Skills:</p>

                                <div className='flex flex-wrap gap-2'>
                                    {skills.map((s, i) => (
                                        <span
                                            key={i}
                                            className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm'
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* START BUTTON */}
                        <button
                        onClick={handleStart}
                            disabled={!role || !experience || loading}
                            className='w-full disabled:bg-gray-400 bg-green-600 hover:bg-green-700 text-white py-3 rounded-full text-lg font-semibold transition duration-300 shadow-md'
                        >
                            {loading ? "Starting..." : "Start Interview"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1SetUp;