import React, { useEffect, useState, useRef } from "react";
// import axios from "react-stone"; // fallback standard imports or your dynamic setup
import axiosInstance from "axios";
import maleVideo from "../assets/Videos/male-ai.mp4";
import femaleVideo from "../assets/Videos/female-ai.mp4";
import { BsArrowLeft } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ServerUrl } from "../App";

const Step2Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const recognitionRef = useRef(null);

  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [improvedAnswer, setImprovedAnswer] = useState("");
  const [idealAnswer, setIdealAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("smantha") ||
          v.name.toLowerCase().includes("female")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const humanText = text.replace(/,/g, ",...").replace(/\./g, ". ... ");
      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;

      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          startMic();
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) return;
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );
        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));

        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }
        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }
    };
    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if (isIntroPhase || isSubmitting || !currentQuestion) return;

    const moveToNext = async () => {
      stopMic();

      if (isLastQuestion) {
        await speakText("Time's up — finishing the interview.");
        await finishInterview();
        return;
      }

      await speakText("Time's up — moving to the next question.");
      setAnswer("");
      setFeedback("");
      setCurrentIndex((prev) => prev + 1);
    };

    // Placeholder if you decide to activate automated timer checks later.
  }, [isIntroPhase, isSubmitting, currentQuestion, currentIndex, questions.length]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };
    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (!recognitionRef.current || isAIPlaying || isListening) return;
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };

  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic();
    setIsSubmitting(true);

    try {
      const result = await axiosInstance.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
        },
        { withCredentials: true }
      );

      setSubmittedAnswer(answer);
      setFeedback(result.data.feedback);
      setImprovedAnswer(result.data.improvedAnswer || "");
      setIdealAnswer(result.data.idealAnswer || "");
      speakText(result.data.feedback);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    stopMic();
    setAnswer("");
    setFeedback("");
    setSubmittedAnswer("");
    setImprovedAnswer("");
    setIdealAnswer("");

    await speakText("Alright, let's move to the next question.");
    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);
  };

  const handleFinishOrNext = async () => {
    if (isLastQuestion) {
      await finishInterview();
      return;
    }
    await handleNext();
  };

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);

    try {
      const result = await axiosInstance.post(
        `${ServerUrl}/api/interview/finish`,
        { interviewId },
        { withCredentials: true }
      );
      onFinish(result.data);
    } catch (error) {
      console.log("Finish error:", error.response?.data || error.message);
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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* TOP PANEL CONTROL GRID */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ================= LEFT INTERVIEW PANEL ================= */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-6 shadow-xl flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-100">AI Interviewer</h2>
                  <div className="text-green-400 text-xs bg-green-500/10 px-2.5 py-1 rounded-md font-medium tracking-wide border border-green-500/10">
                    Live Session ●
                  </div>
                </div>

                {/* Video Window */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-video mb-4 relative">
                  <video
                    src={videoSource}
                    key={videoSource}
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Subtitle text display */}
                {subtitle && (
                  <div className="rounded-xl bg-green-500/5 border border-green-500/10 p-4 mb-4">
                    <p className="text-xs text-green-300 text-center leading-relaxed font-medium">
                      {subtitle}
                    </p>
                  </div>
                )}
              </div>

              {/* Counter Modules */}
              <div className="rounded-xl bg-black/30 border border-white/5 p-5 mt-auto">
                <div className="flex justify-between items-center mb-3 text-xs">
                  <span className="text-zinc-500 font-medium">System State</span>
                  {isAIPlaying && (
                    <span className="text-green-400 font-semibold animate-pulse">
                      Interviewer Speaking
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <div className="text-xl font-bold text-green-400 font-mono">
                      {currentIndex + 1}
                    </div>
                    <p className="text-zinc-500 text-[11px] uppercase tracking-wider mt-1 font-medium">Current</p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3.5 border border-white/5">
                    <div className="text-xl font-bold text-cyan-400 font-mono">
                      {questions.length}
                    </div>
                    <p className="text-zinc-500 text-[11px] uppercase tracking-wider mt-1 font-medium">Total</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT MAIN INTERACTIVE INTERVIEW CONSOLE ================= */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className={`
                relative overflow-hidden rounded-2xl border backdrop-blur-2xl p-6 h-full flex flex-col justify-between shadow-xl transition-all duration-300
                ${isAIPlaying 
                  ? "bg-green-500/[0.03] border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,.1)]" 
                  : "bg-white/[0.02] border-white/5"
                }
              `}
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-100">Console Monitor</h2>
                  <div className={`text-xs font-mono font-medium ${isMicOn ? 'text-green-400' : 'text-zinc-500'}`}>
                    Mic: {isMicOn ? "Active" : "Muted"}
                  </div>
                </div>

                {!isIntroPhase && (
                  <div className="mb-5 rounded-xl bg-green-500/5 border border-green-500/10 p-5">
                    <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-2">
                      Prompt Context {currentIndex + 1} of {questions.length}
                    </p>
                    <h3 className="text-base md:text-lg font-semibold text-zinc-200 leading-relaxed">
                      {currentQuestion?.question}
                    </h3>
                  </div>
                )}
              </div>

              {/* Dynamic Action Fields */}
              {!feedback ? (
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Respond to the interviewer naturally or speak clearly into your mic..."
                    className="w-full flex-1 min-h-[220px] rounded-xl bg-black/40 border border-white/5 p-5 outline-none resize-none focus:border-green-500/20 text-sm leading-relaxed text-zinc-300"
                  />

                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={toggleMic}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition border ${
                        isMicOn 
                        ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                        : 'bg-white/5 border-white/10 text-zinc-500'
                      }`}
                    >
                      {isMicOn ? <FaMicrophone size={16} /> : <FaMicrophoneSlash size={16} />}
                    </button>

                    <button
                      onClick={submitAnswer}
                      disabled={isSubmitting || !answer.trim()}
                      className={`flex-1 h-12 rounded-xl font-semibold text-sm transition-all
                        ${isSubmitting || !answer.trim() 
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5" 
                          : "bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:opacity-90"
                        }`}
                    >
                      {isSubmitting ? "Processing Metrics..." : "Submit Response"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between mt-2">
                  <div className="rounded-xl bg-green-500/5 border border-green-500/10 p-5 mb-5 flex-1 overflow-y-auto max-h-[280px]">
                    <h3 className="text-green-400 text-sm font-semibold mb-2 tracking-wide uppercase text-[11px]">
                      Immediate Assessment
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">{feedback}</p>
                  </div>

                  <button
                    onClick={handleFinishOrNext}
                    className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all duration-200"
                  >
                    {isLastQuestion ? "Finish Assessment" : "Proceed to Next Question"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= STEPPED LOWER ANSWER METRICS COMPARISON PANEL ================= */}
        {submittedAnswer && (
          <div className="mt-8">
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-zinc-100">Answer Breakdown</h2>
                  <p className="text-zinc-500 text-xs mt-0.5">Evaluate structural enhancements proposed by generative feedback loops</p>
                </div>
                <div className="text-xs font-mono text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  AI Evaluation Engine
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {/* USER RECORD */}
                <div className="rounded-xl bg-zinc-900/50 border border-white/5 flex flex-col overflow-hidden min-h-[350px] max-h-[450px]">
                  <div className="p-4 border-b border-white/5 bg-black/20">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Your Response</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <p className="text-xs leading-relaxed text-zinc-400 whitespace-pre-line">
                      {submittedAnswer}
                    </p>
                  </div>
                </div>

                {/* ENHANCED MODEL */}
                <div className="rounded-xl bg-gradient-to-b from-green-500/[0.03] to-transparent border border-green-500/10 flex flex-col overflow-hidden min-h-[350px] max-h-[450px]">
                  <div className="p-4 border-b border-green-500/10 bg-green-500/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-green-400">Refined Version</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <p className="text-xs leading-relaxed text-zinc-300 whitespace-pre-line">
                      {improvedAnswer}
                    </p>
                  </div>
                </div>

                {/* CRITICAL BENCHMARK */}
                <div className="rounded-xl bg-gradient-to-b from-cyan-500/[0.03] to-transparent border border-cyan-500/10 flex flex-col overflow-hidden min-h-[350px] max-h-[450px]">
                  <div className="p-4 border-b border-cyan-500/10 bg-cyan-500/5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Ideal Paradigm</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <p className="text-xs leading-relaxed text-zinc-300 whitespace-pre-line">
                      {idealAnswer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2Interview;
