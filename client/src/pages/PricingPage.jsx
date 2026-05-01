import React,{useState} from "react";
import { FaArrowLeft } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { ServerUrl } from "../App";

const PricingPage = () => {

const navigate = useNavigate();
const dispatch = useDispatch();

const [selectedPlan,setSelectedPlan] = useState("pro");
const [loadingPlan,setLoadingPlan] = useState(null);

const plans=[
{
id:"free",
name:"Free",
price:"₹0",
credits:100,
description:"Perfect to start practicing interviews.",
features:[
"100 AI Interview Credits",
"Basic Reports",
"Voice Interviews",
"Limited History"
],
default:true
},
{
id:"basic",
name:"Basic",
price:"₹199",
credits:500,
description:"For regular interview preparation.",
features:[
"500 Credits",
"Detailed Reports",
"Voice + Text Interviews",
"Full History",
"Priority Support"
]
},
{
id:"pro",
name:"Pro",
price:"₹499",
credits:1500,
description:"Advanced prep for serious candidates.",
features:[
"1500 Credits",
"Advanced Analytics",
"Unlimited Interviews",
"Full Progress Tracking",
"Priority Support",
"Early Features"
],
badge:"Best Value"
}
]


const handlePayment = async(plan)=>{
try{
setLoadingPlan(plan.id)

const amount=
plan.id==="basic"
?199
:plan.id==="pro"
?499
:0

if(!amount) return

const result = await axios.post(
ServerUrl+"/api/payment/order",
{
planId:plan.id,
amount,
credits:plan.credits
},
{withCredentials:true}
)

const options = {
key:import.meta.env.VITE_RAZORPAY_KEY_ID,
amount:result.data.amount,
currency:"INR",
name:"PrepFlow",
description:`${plan.name} - ${plan.credits} Credits`,
order_id:result.data.id,

handler:async function(response){
try{
const verifyPay = await axios.post(
ServerUrl+"/api/payment/verify",
response,
{withCredentials:true}
)

dispatch(setUserData(verifyPay.data.user))
alert("Payment Successful!")
navigate("/")

}catch(err){
console.log(err)
alert("Verification failed")
}
},

theme:{
color:"#10b981"
}
}

const rzp = new window.Razorpay(options)

rzp.open()

rzp.on("payment.failed",()=>{
alert("Payment failed")
})

setLoadingPlan(null)

}catch(error){
console.log(error)
alert("Something went wrong")
setLoadingPlan(null)
}
}



return(
<div className="min-h-screen bg-black text-white relative overflow-hidden">

{/* cyber grid */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* glows */}
<div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full"/>
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full"/>


<div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

{/* HEADER */}
<div className="flex justify-between items-center mb-16 flex-wrap gap-6">

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
Credits Engine
</span>
</div>

<h1 className="text-6xl font-bold">
Choose Your
<span className="block bg-gradient-to-r from-green-300 via-cyan-300 to-green-500 bg-clip-text text-transparent">
AI Plan
</span>
</h1>

<p className="text-zinc-500 mt-4 text-lg">
Flexible pricing for every interview journey
</p>
</div>

</div>


<div className="text-green-400">
Billing Online ●
</div>

</div>



{/* TOP STATS */}
<div className="grid md:grid-cols-3 gap-6 mb-14">

<div className="rounded-[30px] bg-white/5 border border-white/10 p-8 backdrop-blur-2xl">
<div className="text-5xl font-bold text-green-400">
10K+
</div>
<p className="text-zinc-500 mt-3">
Mock Interviews Run
</p>
</div>

<div className="rounded-[30px] bg-white/5 border border-white/10 p-8 backdrop-blur-2xl">
<div className="text-5xl font-bold text-cyan-400">
50+
</div>
<p className="text-zinc-500 mt-3">
Supported Roles
</p>
</div>

<div className="rounded-[30px] bg-white/5 border border-white/10 p-8 backdrop-blur-2xl">
<div className="text-5xl font-bold text-green-300">
AI
</div>
<p className="text-zinc-500 mt-3">
Adaptive Engine
</p>
</div>

</div>




{/* PRICING */}
<div className="grid lg:grid-cols-3 gap-8">

{plans.map((plan)=>{

const selected = selectedPlan===plan.id

return(

<div
key={plan.id}
onClick={()=>!plan.default && setSelectedPlan(plan.id)}
className={`
relative
rounded-[40px]
p-10
cursor-pointer
transition-all duration-300
backdrop-blur-2xl
border
${selected
? "border-green-500/40 bg-green-500/[0.04] scale-105 shadow-[0_0_50px_rgba(34,197,94,.12)]"
: "border-white/10 bg-white/5"
}
`}
>

{/* badge */}
{plan.badge && (
<div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs">
{plan.badge}
</div>
)}

{plan.default && (
<div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs">
Default
</div>
)}


<h3 className="text-3xl font-bold mb-6">
{plan.name}
</h3>


<div className="mb-6">
<div className="text-6xl font-bold bg-gradient-to-r from-green-300 to-cyan-400 bg-clip-text text-transparent">
{plan.price}
</div>

<p className="text-zinc-500 mt-3">
{plan.credits} Credits
</p>
</div>


<p className="text-zinc-400 mb-8 leading-relaxed">
{plan.description}
</p>


<div className="space-y-4 mb-10">
{plan.features.map((feature,index)=>(
<div
key={index}
className="flex items-center gap-3 text-zinc-300"
>
<div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-xs">
✓
</div>
{feature}
</div>
))}
</div>


{plan.default ? (

<button
disabled
className="
w-full py-4 rounded-2xl
bg-white/5 text-zinc-500
border border-white/10
"
>
Current Plan
</button>

):(

<button
onClick={(e)=>{
e.stopPropagation()
handlePayment(plan)
}}
disabled={loadingPlan===plan.id}
className="
w-full py-4 rounded-2xl
font-semibold text-lg
bg-gradient-to-r from-green-400 to-cyan-400
text-black
hover:scale-[1.02]
transition
shadow-[0_0_35px_rgba(34,197,94,.25)]
"
>
{loadingPlan===plan.id
?"Processing..."
:`Purchase ${plan.name}`}
</button>

)}

</div>

)
})}

</div>




{/* FOOT CTA */}
{/* <div className="
mt-20
rounded-[42px]
border border-green-500/20
bg-gradient-to-r from-green-500/10 via-black to-cyan-500/10
backdrop-blur-2xl
p-16
text-center
">

<h2 className="text-5xl font-bold mb-6">
Scale Faster With AI Credits
</h2>

<p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-10">
Practice more interviews, unlock deeper analytics and improve faster.
</p>

<button
onClick={()=>setSelectedPlan("pro")}
className="
px-10 py-5 rounded-2xl
bg-gradient-to-r from-green-400 to-cyan-400
text-black font-semibold
"
>
Choose Pro Plan
</button>

</div> */}


</div>

</div>
)
}

export default PricingPage