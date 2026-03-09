"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Lock, Cpu, BarChart3, Clock } from "lucide-react";

export default function RegisterPage(){

const router = useRouter();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");
const [loading,setLoading] = useState(false);

function validatePassword(password:string){

const regex =
/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

return regex.test(password);

}

async function register(e:React.FormEvent){

e.preventDefault();

if(password !== confirmPassword){
toast.error("Passwords do not match");
return;
}

if(!validatePassword(password)){
toast.error("Password must be 8+ characters with uppercase, number and special character");
return;
}

setLoading(true);

const res = await fetch("/api/register",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ name,email,password })
});

const data = await res.json();

setLoading(false);

if(data.success){

toast.success(`Your Employee ID: ${data.employeeId}`);
router.push("/login");

}else{
toast.error(data.error || "Registration failed");
}

}

return(

<div className="relative min-h-screen flex overflow-hidden bg-gradient-to-br from-[#f8fbff] via-white to-cyan-50">

{/* Circuit grid background */}

<div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#00eaff33_1px,transparent_1px),linear-gradient(to_bottom,#00eaff33_1px,transparent_1px)] bg-[size:60px_60px]" />

<div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-300 opacity-20 rounded-full blur-[150px]"/>
<div className="absolute top-[30%] -right-40 w-[600px] h-[600px] bg-blue-300 opacity-20 rounded-full blur-[150px]"/>


{/* HERO SECTION */}

<div className="hidden lg:flex flex-col justify-center w-1/2 px-20 relative space-y-10">

<motion.div
animate={{ y:[-10,10,-10] }}
transition={{ duration:4, repeat:Infinity }}
className="space-y-2"
>

<h1 className="text-5xl font-bold text-slate-800">

<span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
Malus Robotics
</span>

</h1>

<p className="text-slate-500 text-lg">
Industrial Automation Platform
</p>

</motion.div>


<p className="text-slate-500 max-w-md">
Create your employee account to manage attendance,
track engineering work and log automation projects
inside the Malus Robotics internal platform.
</p>


{/* Feature cards */}

<div className="grid grid-cols-2 gap-6">

<div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-white/40 shadow-sm hover:shadow-md transition">

<Cpu className="text-cyan-500 mb-2"/>

<p className="font-semibold text-slate-700">
Automation Projects
</p>

<p className="text-sm text-slate-500">
Track PLC and robotics work
</p>

</div>

<div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-white/40 shadow-sm hover:shadow-md transition">

<Clock className="text-cyan-500 mb-2"/>

<p className="font-semibold text-slate-700">
Smart Attendance
</p>

<p className="text-sm text-slate-500">
Clock in and track shifts
</p>

</div>

<div className="bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-white/40 shadow-sm hover:shadow-md transition">

<BarChart3 className="text-cyan-500 mb-2"/>

<p className="font-semibold text-slate-700">
Work Analytics
</p>

<p className="text-sm text-slate-500">
Monitor productivity insights
</p>

</div>

</div>

</div>


{/* REGISTER FORM */}

<div className="flex flex-1 items-center justify-center p-10">

<motion.form
onSubmit={register}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="w-[420px] bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-10 space-y-6"
>

<div className="text-center space-y-2">

<h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
Create Account
</h1>

<p className="text-slate-500 text-sm">
Employee Registration
</p>

</div>


{/* Name */}

<div className="relative">

<User size={18} className="absolute left-3 top-3 text-slate-400"/>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full pl-10 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none"
required
/>

</div>


{/* Email */}

<div className="relative">

<Mail size={18} className="absolute left-3 top-3 text-slate-400"/>

<input
type="email"
placeholder="Company Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full pl-10 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none"
required
/>

</div>


{/* Password */}

<div className="relative">

<Lock size={18} className="absolute left-3 top-3 text-slate-400"/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full pl-10 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none"
required
/>

</div>


{/* Confirm */}

<div className="relative">

<Lock size={18} className="absolute left-3 top-3 text-slate-400"/>

<input
type="password"
placeholder="Confirm Password"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
className="w-full pl-10 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-400 outline-none"
required
/>

</div>


<p className="text-xs text-slate-500">
Password must contain uppercase, number and special character.
</p>


<button
disabled={loading}
className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition"
>
{loading ? "Creating account..." : "Register"}
</button>


<p className="text-center text-sm text-slate-500">

Already have an account?{" "}

<span
onClick={()=>router.push("/login")}
className="text-cyan-600 cursor-pointer hover:underline"
>
Login
</span>

</p>

</motion.form>

</div>

</div>

)

}