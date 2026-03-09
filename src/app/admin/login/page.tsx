"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Lock } from "lucide-react";

export default function AdminLogin(){

const router = useRouter();
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

async function login(){

setLoading(true);

const res = await fetch("/api/admin/login",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({ password })
});

const data = await res.json();

setLoading(false);

if(data.success){
router.push("/admin");
}else{
alert("Invalid admin password");
}

}

return(

<div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8fbff] via-white to-cyan-50 overflow-hidden">

{/* Circuit grid */}

<div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#00eaff33_1px,transparent_1px),linear-gradient(to_bottom,#00eaff33_1px,transparent_1px)] bg-[size:60px_60px]" />

{/* Glow lights */}

<div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-300/30 blur-[160px] rounded-full"/>
<div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-300/30 blur-[160px] rounded-full"/>


{/* Admin Panel */}

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.7}}
className="
relative
w-[420px]
bg-white/80
backdrop-blur-xl
border
border-white/40
rounded-3xl
shadow-[0_30px_80px_rgba(0,0,0,0.1)]
p-10
space-y-6
text-center
"
>

{/* Logo */}

<motion.div
animate={{ y:[-4,4,-4] }}
transition={{ duration:4, repeat:Infinity }}
className="flex justify-center"
>

<div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg">

<Shield size={28}/>

</div>

</motion.div>


<h1 className="text-2xl font-bold text-gray-800">
Malus Robotics
</h1>

<p className="text-gray-500 text-sm">
Admin Control Access
</p>


{/* Password */}

<div className="relative">

<Lock size={16} className="absolute left-3 top-3 text-gray-400"/>

<input
type="password"
placeholder="Admin password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
/>

</div>


{/* Login Button */}

<motion.button
whileTap={{scale:0.96}}
onClick={login}
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

{loading ? "Authenticating..." : "Unlock Admin Panel"}

</motion.button>


<p className="text-xs text-gray-400">
Restricted access • Authorized personnel only
</p>

</motion.div>

</div>

)

}