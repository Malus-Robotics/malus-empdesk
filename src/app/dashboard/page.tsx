"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
Clock,
Folder,
FileText,
LogOut,
LayoutDashboard,
FolderKanban,
CalendarDays
} from "lucide-react";

export default function Dashboard(){

const [employeeId,setEmployeeId] = useState("");
const [timesheet,setTimesheet] = useState("");
const [projectName,setProjectName] = useState("");
const [projectCode,setProjectCode] = useState("");

const [loading,setLoading] = useState(false);
const [status,setStatus] = useState<"IN" | "OUT" | "">("");

const [seconds,setSeconds] = useState(0);
const [clockInTime,setClockInTime] = useState<string | null>(null);


/* ================= LOAD USER ================= */

useEffect(()=>{

async function loadUser(){

const res = await fetch("/api/me");
const data = await res.json();

if(!data.employeeId) return;

setEmployeeId(data.employeeId);

const statusRes = await fetch("/api/attendance/status",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ employeeId:data.employeeId })
});

const statusData = await statusRes.json();

setStatus(statusData.status);
setClockInTime(statusData.clockInTime);

}

loadUser();

},[]);


/* ================= TIMER ================= */

useEffect(()=>{

if(status !== "IN" || !clockInTime) return;

const interval = setInterval(()=>{

const start = new Date(clockInTime).getTime();
const now = Date.now();

const diff = Math.floor((now - start) / 1000);

setSeconds(diff);

},1000);

return ()=>clearInterval(interval);

},[status,clockInTime]);


function formatTime(sec:number){

const h = Math.floor(sec/3600);
const m = Math.floor((sec%3600)/60);
const s = sec%60;

return `${h}h ${m}m ${s}s`;

}


/* ================= CLOCK ACTION ================= */

async function send(action:string){

setLoading(true);

const res = await fetch("/api/attendance",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({
employeeId,
action,
timesheet,
projectName,
projectCode
})
});

const data = await res.json();

setLoading(false);

if(!data.success){
toast.error(data.error || "Something went wrong");
return;
}

setStatus(data.status);

if(data.clockInTime){
setClockInTime(data.clockInTime);
}

if(action==="CLOCK_IN"){
toast.success("Clock In successful");
}

if(action==="CLOCK_OUT"){
toast.success("Clock Out recorded");
setTimesheet("");
setProjectName("");
setProjectCode("");
setSeconds(0);
setClockInTime(null);
}

}


/* ================= LOGOUT ================= */

async function logout(){
await fetch("/api/logout",{method:"POST"});
window.location.href="/login";
}


/* ================= UI ================= */

return(

<div className="relative min-h-screen bg-gradient-to-br from-[#f6f8fb] via-white to-blue-50 overflow-hidden">

{/* Ambient Background */}

<div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-200 rounded-full blur-3xl opacity-30"/>
<div className="absolute top-[30%] -right-40 w-[600px] h-[600px] bg-blue-200 rounded-full blur-3xl opacity-30"/>
<div className="absolute bottom-[-200px] left-[30%] w-[600px] h-[600px] bg-purple-200 rounded-full blur-3xl opacity-20"/>


<div className="relative z-10 flex min-h-screen">

{/* ================= SIDEBAR ================= */}

<div className="w-[260px] bg-white/70 backdrop-blur-xl border-r border-white/40 shadow-sm flex flex-col">

<div className="p-6 border-b">
<h1 className="text-xl font-bold text-cyan-600">
Malus Robotics
</h1>
</div>

<nav className="flex flex-col gap-2 p-4 text-sm">

<a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-100 font-medium">
<LayoutDashboard size={16}/>
Dashboard
</a>







</nav>

<div className="mt-auto p-4">

<button
onClick={logout}
className="flex items-center gap-2 w-full justify-center bg-gray-900 text-white py-2 rounded-xl hover:bg-black transition"
>
<LogOut size={16}/>
Logout
</button>

</div>

</div>


{/* ================= MAIN ================= */}

<div className="flex-1 flex flex-col">


{/* ================= TOPBAR ================= */}

<div className="h-[72px] bg-white/70 backdrop-blur-xl border-b border-white/40 flex items-center justify-between px-10">

<div>
<p className="text-sm text-gray-500">Employee</p>
<p className="font-semibold text-gray-800">{employeeId}</p>
</div>

<div className="flex items-center gap-6">

{status==="IN" && (
<span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm border border-green-200">
Clocked In
</span>
)}

{status==="OUT" && (
<span className="px-4 py-1 rounded-full bg-red-100 text-red-700 text-sm border border-red-200">
Clocked Out
</span>
)}

{status==="IN" && (
<div className="text-sm text-gray-600">
Working: <span className="font-semibold">{formatTime(seconds)}</span>
</div>
)}

<div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold">
{employeeId?.[0]}
</div>

</div>

</div>


{/* ================= CONTENT ================= */}

<div className="p-10 space-y-10">


{/* ================= STATS ================= */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow hover:shadow-lg transition">
<div className="flex items-center justify-between mb-2">
<p className="text-sm text-gray-500">Status</p>
<Clock size={16} className="text-cyan-500"/>
</div>
<p className="text-xl font-semibold">
{status==="IN" ? "Working" : "Offline"}
</p>
</div>

<div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow hover:shadow-lg transition">
<div className="flex items-center justify-between mb-2">
<p className="text-sm text-gray-500">Project</p>
<Folder size={16} className="text-cyan-500"/>
</div>
<p className="text-xl font-semibold">
{projectName || "None"}
</p>
</div>

<div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow hover:shadow-lg transition">
<div className="flex items-center justify-between mb-2">
<p className="text-sm text-gray-500">Employee</p>
<LayoutDashboard size={16} className="text-cyan-500"/>
</div>
<p className="text-xl font-semibold">
{employeeId}
</p>
</div>

</div>


{/* ================= WORK CARD ================= */}

<div className="flex justify-center">

<div className="w-[650px] rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.08)] p-10 space-y-6">

<h2 className="text-2xl font-semibold flex items-center gap-2">
<Clock size={20}/>
Today's Work
</h2>


<div className="flex gap-4">

<button
disabled={loading || status==="IN"}
onClick={()=>send("CLOCK_IN")}
className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-200 transition disabled:opacity-40"
>
Clock In
</button>

<button
disabled={loading || status!=="IN"}
onClick={()=>send("CLOCK_OUT")}
className="flex-1 bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl shadow-lg transition disabled:opacity-40"
>
Clock Out
</button>

</div>


{status==="IN" && (

<div className="space-y-5 pt-6 border-t">

<input
placeholder="Project Code"
value={projectCode}
onChange={(e)=>setProjectCode(e.target.value)}
className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
/>

<input
placeholder="Project Name"
value={projectName}
onChange={(e)=>setProjectName(e.target.value)}
className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none"
/>

<textarea
placeholder="Describe your work..."
value={timesheet}
onChange={(e)=>setTimesheet(e.target.value)}
className="w-full border border-gray-200 p-4 rounded-xl h-[140px] focus:ring-2 focus:ring-cyan-400 outline-none"
/>

</div>

)}

</div>

</div>

</div>

</div>

</div>

</div>

);

}