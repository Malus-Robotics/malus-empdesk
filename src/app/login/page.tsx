"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Lock, Cpu, Clock, BarChart3 } from "lucide-react";

export default function LoginPage(){

const router = useRouter();

const [employeeId,setEmployeeId] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

async function login(e:React.FormEvent){

e.preventDefault();
setLoading(true);

const res = await fetch("/api/login",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
employeeId,
password
})
});

const data = await res.json();

setLoading(false);

if(data.success){
toast.success("Login successful");
router.push("/dashboard");
}else{
toast.error(data.error || "Invalid credentials");
}

}

return(

<div className="relative min-h-screen flex overflow-hidden bg-gradient-to-br from-[#f7fbff] via-white to-cyan-50">

{/* ===== Robotics Grid Background ===== */}

<div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#00eaff33_1px,transparent_1px),linear-gradient(to_bottom,#00eaff33_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* ===== Glow Lights ===== */}

<div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-cyan-300/30 blur-[160px] rounded-full"/>
<div className="absolute top-[30%] -right-40 w-[700px] h-[700px] bg-blue-300/30 blur-[160px] rounded-full"/>


{/* ===== HERO SECTION ===== */}

<div className="hidden lg:flex flex-col justify-center w-1/2 px-20 space-y-10">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
>

<h1 className="text-5xl font-bold">

<span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
Malus Robotics
</span>

</h1>

<p className="text-slate-500 text-lg">
Industrial Automation Platform
</p>

</motion.div>


<p className="text-slate-500 max-w-md">
Access the internal engineering workspace to manage attendance,
track PLC automation work and submit daily timesheets.
</p>


{/* ===== Feature Cards ===== */}

<div className="grid grid-cols-2 gap-6">

<motion.div
whileHover={{y:-5}}
className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-xl shadow-sm"
>

<Cpu className="text-cyan-500 mb-2"/>

<p className="font-semibold text-slate-700">
Automation Projects
</p>

<p className="text-sm text-slate-500">
Track robotics and PLC engineering work
</p>

</motion.div>


<motion.div
whileHover={{y:-5}}
className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-xl shadow-sm"
>

<Clock className="text-cyan-500 mb-2"/>

<p className="font-semibold text-slate-700">
Smart Attendance
</p>

<p className="text-sm text-slate-500">
Clock in and track shifts
</p>

</motion.div>


<motion.div
whileHover={{y:-5}}
className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-xl shadow-sm"
>

<BarChart3 className="text-cyan-500 mb-2"/>

<p className="font-semibold text-slate-700">
Work Analytics
</p>

<p className="text-sm text-slate-500">
Monitor engineering productivity
</p>

</motion.div>

</div>

</div>


{/* ===== LOGIN PANEL ===== */}

<div className="flex flex-1 items-center justify-center p-10">

<motion.form
onSubmit={login}
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="
w-[420px]
bg-white/80
backdrop-blur-xl
border
border-white/40
rounded-3xl
shadow-[0_30px_80px_rgba(0,0,0,0.08)]
p-10
space-y-6
"
>

{/* Brand */}

<div className="text-center space-y-2">

<motion.h1
animate={{ y:[-4,4,-4] }}
transition={{ duration:4, repeat:Infinity }}
className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent"
>
Malus Robotics
</motion.h1>

<p className="text-slate-500 text-sm">
Employee Desk Login
</p>

</div>


{/* Employee ID */}

<div className="relative">

<User
size={18}
className="absolute left-3 top-3 text-slate-400"
/>

<input
placeholder="Employee ID"
value={employeeId}
onChange={(e)=>setEmployeeId(e.target.value)}
className="
w-full
pl-10
p-3
rounded-xl
border
border-slate-200
focus:outline-none
focus:ring-2
focus:ring-cyan-400
"
/>

</div>


{/* Password */}

<div className="relative">

<Lock
size={18}
className="absolute left-3 top-3 text-slate-400"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="
w-full
pl-10
p-3
rounded-xl
border
border-slate-200
focus:outline-none
focus:ring-2
focus:ring-cyan-400
"
/>

</div>


{/* Login Button */}

<motion.button
whileTap={{scale:0.97}}
disabled={loading}
className="
w-full
bg-gradient-to-r
from-cyan-500
to-blue-600
text-white
p-3
rounded-xl
font-semibold
shadow-lg
shadow-cyan-200
hover:opacity-90
transition
"
>

{loading ? "Logging in..." : "Login"}

</motion.button>


<p className="text-center text-sm text-slate-500">

New employee?{" "}

<span
onClick={()=>router.push("/register")}
className="text-cyan-600 cursor-pointer hover:underline"
>
Get your Employee ID
</span>

</p>

</motion.form>

</div>

</div>

)

}