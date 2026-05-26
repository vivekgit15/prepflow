import React,{useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { ServerUrl } from "../App";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const InterviewHistory = ()=>{

const [interviews,setInterviews]=useState([]);
const navigate = useNavigate();

useEffect(()=>{
const getMyInterviews = async()=>{
try{

const result = await axios.get(
ServerUrl+"/api/interview/get-interview",
{withCredentials:true}
)


setInterviews(result.data)

}catch(error){
console.log(error.message)
}
}

getMyInterviews()
},[])


return(
<div className="min-h-screen bg-black text-white relative overflow-hidden">

{/* cyber grid */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* glows */}
<div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full"/>
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full"/>


<div className="relative z-10 max-w-7xl mx-auto px-6 py-10">


{/* HEADER */}
<div className="flex justify-between items-center mb-14 flex-wrap gap-6">

<div className="flex items-center gap-5">

<button
onClick={()=>navigate('/')}
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
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
<HiSparkles className="text-green-400"/>
<span className="text-green-300 text-sm">
Interview Records
</span>
</div>

<h1 className="text-5xl font-bold">
History Console
</h1>

<p className="text-zinc-500 mt-3">
Track your past interviews and performance reports
</p>

</div>

</div>


<div className="text-green-400">
Archive Online ●
</div>

</div>




{interviews.length===0 ? (

<div className="
rounded-[40px]
bg-white/5
border border-white/10
backdrop-blur-2xl
p-20
text-center
shadow-2xl
">

<h2 className="text-4xl font-bold mb-5">
No Interviews Yet
</h2>

<p className="text-zinc-500 mb-10">
Start your first AI interview session.
</p>

<button
onClick={()=>navigate("/")}
className="
px-8 py-4 rounded-2xl
bg-gradient-to-r from-green-400 to-cyan-400
text-black font-semibold
"
>
Start Interview
</button>

</div>

):(


<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

{interviews.map((item,index)=>{

const score =
item.finalScore ||
item.report?.finalScore ||
item.score ||
0

return(

<div
key={index}
onClick={()=>navigate(`/report/${item._id}`)}
className="
group cursor-pointer
rounded-[36px]
bg-white/5
border border-white/10
backdrop-blur-2xl
p-8
hover:border-green-500/30
hover:-translate-y-2
transition-all
duration-300
shadow-2xl
"
>

<div className="flex justify-between items-start mb-8">

<div>
<p className="text-zinc-500 text-sm mb-3">
Session #{index+1}
</p>

<h3 className="text-2xl font-semibold mb-2">
{item.role || "Interview"}
</h3>

<p className="text-zinc-400">
{item.experience} • {item.mode}
</p>
</div>


<div className="px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-300 text-sm">
{item.status || "completed"}
</div>

</div>



<div className="grid grid-cols-2 gap-5 mb-8">

<div className="rounded-3xl bg-black/30 p-6 text-center">
<div className="text-4xl font-bold text-green-400">
{score}
</div>

<p className="text-zinc-500 mt-2">
Score
</p>
</div>


<div className="rounded-3xl bg-black/30 p-6 text-center">
<div className="text-4xl font-bold text-cyan-400">
10
</div>

<p className="text-zinc-500 mt-2">
Scale
</p>
</div>

</div>



<div className="border-t border-white/5 pt-6 flex justify-between items-center">

<div>
<p className="text-zinc-500 text-sm">
Date
</p>

<p className="text-white">
{new Date(item.createdAt).toLocaleDateString()}
</p>
</div>


<div className="text-green-400 font-medium group-hover:translate-x-2 transition">
View Report →
</div>

</div>

</div>

)
})}

</div>

)}



</div>

</div>
)
}

export default InterviewHistory
