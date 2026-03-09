"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {

const router = useRouter();

const messages = [
"Booting Malus Robotics Core...",
"Loading industrial automation modules...",
"Connecting to Malus Cloud Infrastructure...",
"Initializing employee desk services...",
"System ready"
];

const [step,setStep] = useState(0);

useEffect(()=>{

if(step < messages.length-1){

const timer = setTimeout(()=>{
setStep(step+1);
},900);

return ()=>clearTimeout(timer);

}else{

setTimeout(()=>{
router.push("/login");
},1500);

}

},[step]);

const progress = ((step+1) / messages.length) * 100;

return(

<div className="relative flex items-center justify-center h-screen overflow-hidden bg-[#0b0f17]">

{/* ================= GRID ================= */}

<div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#0ff1ff33_1px,transparent_1px),linear-gradient(to_bottom,#0ff1ff33_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* ================= LIGHT GLOW ================= */}

<div className="absolute -top-60 -left-60 w-[800px] h-[800px] bg-cyan-400/20 blur-[200px] rounded-full"/>
<div className="absolute bottom-[-200px] right-[-200px] w-[700px] h-[700px] bg-blue-400/20 blur-[200px] rounded-full"/>


{/* ================= MAIN PANEL ================= */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
className="
relative
w-[760px]
bg-[#0f1724]/80
backdrop-blur-xl
border
border-cyan-400/20
rounded-3xl
shadow-[0_0_120px_rgba(0,255,255,0.15)]
p-12
space-y-10
"
>

{/* ===== HEADER ===== */}

<div className="flex justify-between items-center">

<div>

<h1 className="text-4xl font-bold text-cyan-400 tracking-wide">
MALUS ROBOTICS
</h1>

<p className="text-slate-400 text-sm mt-1">
Industrial Automation Platform
</p>

</div>

<div className="flex items-center gap-3 text-sm text-slate-400">

<span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>

SYSTEM ONLINE

</div>

</div>


{/* ===== MODULE STATUS ===== */}

<div className="grid grid-cols-3 gap-6 text-sm">

<div className="bg-[#0b1320] border border-cyan-400/20 rounded-xl p-4 text-cyan-300">
⚙ Robotics Core
</div>

<div className="bg-[#0b1320] border border-cyan-400/20 rounded-xl p-4 text-cyan-300">
☁ Malus Cloud
</div>

<div className="bg-[#0b1320] border border-cyan-400/20 rounded-xl p-4 text-cyan-300">
🔐 Authentication
</div>

</div>


{/* ===== TERMINAL ===== */}

<div className="bg-black border border-cyan-400/20 rounded-xl p-6 font-mono text-sm space-y-2 text-cyan-300">

{messages.slice(0,step+1).map((msg,i)=>(
<motion.p
key={i}
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:0.4}}
>
{">"} {msg}
</motion.p>
))}

<span className="animate-pulse">█</span>

</div>


{/* ===== PROGRESS ===== */}

<div className="space-y-2">

<div className="w-full h-2 bg-[#0b1320] rounded-full overflow-hidden">

<motion.div
className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
initial={{width:0}}
animate={{width:`${progress}%`}}
transition={{duration:0.5}}
/>

</div>

<p className="text-xs text-slate-400 text-right">
{Math.round(progress)}% System Initialization
</p>

</div>


{/* ===== FOOTER ===== */}

<p className="text-center text-sm text-slate-500">
Dream it • Design it • Deploy it
</p>

</motion.div>

</div>

);

}