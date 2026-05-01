import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import maleVideo from "../assets/Videos/male-ai.mp4";
import femaleVideo from "../assets/Videos/female-ai.mp4";
import Timer from "./Timer";
import { BsArrowLeft } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ServerUrl } from "../App";

const Step2Interview = ({ interviewData, onFinish }) => {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase , setIsIntroPhase] = useState(true);
  const [isMicOn , setIsMicOn] = useState(true);

  const recognitionRef = useRef(null);

  const [isAIPlaying , setIsAIPlaying] = useState(false);
  const [isListening , setIsListening] = useState(false);
  const [currentIndex , setCurrentIndex] = useState(0);
  const [answer , setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [improvedAnswer, setImprovedAnswer] = useState("");
  const [idealAnswer, setIdealAnswer] = useState("");
  const [feedback , setFeedback] = useState("");
  const [timeLeft , setTimeLeft] = useState(questions[0]?.timeLeft || 60);
  const [selectedVoice , setSelectedVoice] = useState(null);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [voiceGender , setVoiceGender] = useState("female");
  const [subtitle , setSubtitle] = useState("");


  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;


  useEffect(() =>{
    const loadVoices = () =>{
      const voices = window.speechSynthesis.getVoices();
      if(!voices.length) return;

      // Try known female voices first

      const femaleVoice = voices.find(v => v.name.toLowerCase().includes("zira") || 
      v.name.toLowerCase().includes("smantha") ||
      v.name.toLowerCase().includes("female") 
    );

    if(femaleVoice){
      setSelectedVoice(femaleVoice);
      setVoiceGender("female")
      return;
    }

    // Try known male voices
    const maleVoice = voices.find(v => 
      v.name.toLowerCase().includes("david") ||
       v.name.toLowerCase().includes("mark") ||
        v.name.toLowerCase().includes("male") 
    );

     if(maleVoice){
      setSelectedVoice(maleVoice);
      setVoiceGender("male")
      return;
    }

    // Fallback : first voice (assume female)

    setSelectedVoice(voices[0]);
    setVoiceGender("female")
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  },[])

  const videoSource = voiceGender === "male" ? maleVideo :femaleVideo;


  // Speak Function

  const speakText = (text) =>{
    return new Promise((resolve) =>{
      if(!window.speechSynthesis || !selectedVoice){
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after commas and periods

      const humanText = text
      .replace(/,/g,",...")
      .replace(/\./g,". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;

      // human-like pacing

      utterance.rate = 0.92;  // slightly slower than normal
      utterance.pitch = 1.05; // small warmth
      utterance.volume = 1;

      utterance.onstart = () =>{
        setIsAIPlaying(true);
        // eslint-disable-next-line react-hooks/immutability
        stopMic()
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if(isMicOn){
          // eslint-disable-next-line react-hooks/immutability
          startMic();
        }


        setTimeout(() => {
          setSubtitle("");
          resolve();
        },300);
      };

      setSubtitle(text)

      window.speechSynthesis.speak(utterance)
    })
  };

  useEffect(() =>{
      if(!selectedVoice){
        return;
      }
      const runIntro = async ()=>{
        if(isIntroPhase){
          await speakText(
            `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
          );

          await speakText(
            "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
          );
          setIsIntroPhase(false)

        }else if(currentQuestion){
          await new Promise(r => setTimeout(r,800));

          // If last question (hard level)

          if(currentIndex === questions.length - 1){
            await speakText("Alright this one might be a bit more challenging.");

          };
          await speakText(currentQuestion.question);

          if(isMicOn){
            startMic();
          }
        }
      }
      runIntro()
  },[selectedVoice, isIntroPhase, currentIndex])


  useEffect(() =>{
    if(isIntroPhase) return;
    if(!currentQuestion) return;
    if(isSubmitting) return
    const timer = setInterval(() =>{
      setTimeLeft((prev) =>{
        if(prev <= 1){
          clearInterval(timer)
          return 0;
        }
        return prev -1 
      })
    },1000);

    return () => clearInterval(timer)
  },[isIntroPhase , currentIndex , isSubmitting])

  useEffect(() =>{
    if(!isIntroPhase && currentQuestion){
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  },[currentIndex]);




   useEffect(() => {
    if (isIntroPhase || isSubmitting || !currentQuestion) return;
    if (timeLeft !== 0) return;

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

    moveToNext();
  }, [timeLeft, isIntroPhase, isSubmitting, currentQuestion, currentIndex, questions.length]);






useEffect(() =>{
    if(!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) =>{
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };
    recognitionRef.current = recognition;
},[])

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


const stopMic = () =>{
  if(recognitionRef.current){
    recognitionRef.current.stop();
  }
}


const toggleMic = () =>{
  if(isMicOn){
    stopMic();

  }else{
    startMic();
  }
  setIsMicOn(!isMicOn);
}


const submitAnswer = async () =>{
  if(isSubmitting) return;
  stopMic()
  setIsSubmitting(true)

  try {
    const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
      interviewId,
      questionIndex: currentIndex,
      answer,
      timeTaken: currentQuestion.timeLimit - timeLeft,
    }, { withCredentials:true })

    setSubmittedAnswer(answer);
    setFeedback(result.data.feedback)
    setImprovedAnswer(result.data.improvedAnswer || "");
    setIdealAnswer(result.data.idealAnswer || "");
    speakText(result.data.feedback)
  } catch (error) {
    console.log(error)
  } finally {
    setIsSubmitting(false)
  }
}

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
    const result = await axios.post(
      `${ServerUrl}/api/interview/finish`,
      { interviewId },
      { withCredentials: true }
    );

    console.log("Interview Finished:", result.data);

    onFinish(result.data); // ✅ move to report screen
  } catch (error) {
    console.log("Finish error:", error.response?.data || error.message);
  }
};

 return (
<div className="min-h-screen bg-black text-white relative overflow-hidden">

{/* Cyber Grid */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* Glow Effects */}
<div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full"/>
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full"/>

<div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

{/* TOP SECTION */}
<div className="grid lg:grid-cols-12 gap-8 min-h-[85vh]">

{/* ================= LEFT PANEL ================= */}
<div className="lg:col-span-5">

<div className="rounded-[36px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">

<div className="flex justify-between items-center mb-6">
<h2 className="text-3xl font-bold">
AI Interviewer
</h2>

<div className="text-green-400 text-sm">
Live Session ●
</div>
</div>


{/* Video */}
<div className="rounded-[30px] overflow-hidden border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,.1)] mb-6">
<video
src={videoSource}
key={videoSource}
ref={videoRef}
muted
playsInline
preload="auto"
className="w-full object-cover"
/>
</div>


{/* Subtitle */}
{subtitle && (
<div className="rounded-[24px] bg-green-500/5 border border-green-500/20 p-5 mb-6">
<p className="text-green-200 text-center leading-relaxed">
{subtitle}
</p>
</div>
)}



{/* Analytics */}
<div className="rounded-[30px] bg-black/40 border border-white/10 p-8">

<div className="flex justify-between items-center mb-6">
<span className="text-zinc-500">
Interview Status
</span>

{isAIPlaying && (
<span className="text-green-400 font-semibold">
AI Speaking
</span>
)}
</div>


<div className="mb-8 flex justify-center">
<Timer
timeLeft={timeLeft}
totalTime={currentQuestion?.timeLimit || 60}
/>
</div>


<div className="grid grid-cols-2 gap-6 text-center">

<div className="rounded-2xl bg-white/5 p-5 border border-white/10">
<div className="text-3xl font-bold text-green-400">
{currentIndex + 1}
</div>

<p className="text-zinc-500 text-sm mt-2">
Current Question
</p>
</div>


<div className="rounded-2xl bg-white/5 p-5 border border-white/10">
<div className="text-3xl font-bold text-cyan-400">
{questions.length}
</div>

<p className="text-zinc-500 text-sm mt-2">
Total Questions
</p>
</div>

</div>

</div>

</div>

</div>




{/* ================= RIGHT PANEL ================= */}
<div className="lg:col-span-7">

<div className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 h-full flex flex-col shadow-2xl">

<div className="flex justify-between items-center mb-8">
<h2 className="text-4xl font-bold">
Interview Console
</h2>

<div className="text-green-400">
Mic {isMicOn ? "Active" : "Muted"}
</div>
</div>



{!isIntroPhase && (
<div className="mb-8 rounded-[30px] bg-green-500/5 border border-green-500/20 p-7">
<p className="text-sm text-zinc-500 mb-3">
Question {currentIndex+1} of {questions.length}
</p>

<h3 className="text-2xl font-semibold leading-relaxed">
{currentQuestion?.question}
</h3>
</div>
)}



{!feedback ? (

<>
<textarea
value={answer}
onChange={(e)=>setAnswer(e.target.value)}
placeholder="Respond to the interviewer..."
className="
flex-1 min-h-[320px]
rounded-[30px]
bg-black/40
border border-white/10
p-7
outline-none
resize-none
focus:border-green-500/30
text-lg
"
/>



<div className="flex items-center gap-5 mt-8">

<button
onClick={toggleMic}
className="
w-16 h-16
rounded-full
bg-gradient-to-r from-green-400 to-cyan-400
text-black
flex items-center justify-center
"
>
{isMicOn
? <FaMicrophone size={22}/>
: <FaMicrophoneSlash size={22}/>
}
</button>


<button
onClick={submitAnswer}
disabled={isSubmitting}
className="
flex-1 py-5 rounded-2xl
font-semibold text-lg
bg-gradient-to-r from-green-400 to-cyan-400
text-black
"
>
{isSubmitting
? "Analyzing Response..."
: "Submit Answer"}
</button>

</div>

</>

) : (

<div className="mt-4">

<div className="rounded-[30px] bg-green-500/5 border border-green-500/20 p-7 mb-8">
<h3 className="text-green-300 text-xl font-semibold mb-4">
AI Feedback
</h3>

<p className="text-zinc-300 leading-8">
{feedback}
</p>
</div>


<button
onClick={handleFinishOrNext}
className="
w-full py-5 rounded-2xl
bg-gradient-to-r from-green-400 to-cyan-400
text-black font-semibold text-lg
"
>
{isLastQuestion
? "Finish Interview"
: "Next Question"}
</button>

</div>

)}

</div>

</div>

</div>




{/* ================= FULL WIDTH ANSWER COMPARISON ================= */}
{submittedAnswer && (
<div className="mt-12">

<div className="rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 shadow-2xl">

<div className="flex justify-between items-center mb-8">
<h2 className="text-3xl font-bold">
Answer Comparison
</h2>

<div className="text-green-400">
AI Evaluation Panel
</div>
</div>



<div className="grid lg:grid-cols-3 gap-8">

{/* YOUR ANSWER */}
<div className="h-[700px] rounded-[32px] bg-zinc-900/80 border border-white/10 flex flex-col overflow-hidden">

<div className="p-6 border-b border-white/10">
<h3 className="text-xl font-bold">
Your Answer
</h3>
</div>

<div className="flex-1 overflow-y-auto p-7">
<p className="leading-8 whitespace-pre-line text-zinc-300">
{submittedAnswer}
</p>
</div>

</div>



{/* IMPROVED */}
<div className="h-[700px] rounded-[32px] bg-gradient-to-b from-green-500/10 to-black/70 border border-green-500/20 flex flex-col overflow-hidden">

<div className="p-6 border-b border-green-500/20">
<h3 className="text-xl font-bold text-green-300">
Improved Answer
</h3>
</div>

<div className="flex-1 overflow-y-auto p-7">
<p className="leading-8 whitespace-pre-line text-zinc-200">
{improvedAnswer}
</p>
</div>

</div>



{/* IDEAL */}
<div className="h-[700px] rounded-[32px] bg-gradient-to-b from-cyan-500/10 to-black/70 border border-cyan-500/20 flex flex-col overflow-hidden">

<div className="p-6 border-b border-cyan-500/20">
<h3 className="text-xl font-bold text-cyan-300">
Ideal Answer
</h3>
</div>

<div className="flex-1 overflow-y-auto p-7">
<p className="leading-8 whitespace-pre-line text-zinc-200">
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
)
};

export default Step2Interview;
