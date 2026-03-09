"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
Users,
Search,
LayoutDashboard
} from "lucide-react";

export default function AdminPage(){

const router = useRouter();

const [employees,setEmployees] = useState<any[]>([]);
const [search,setSearch] = useState("");
const [loading,setLoading] = useState(true);


/* ===== Check Admin Session ===== */

useEffect(()=>{

async function checkAuth(){

const res = await fetch("/api/admin/check");
const data = await res.json();

if(!data.authorized){
router.push("/admin/login");
return;
}

loadEmployees();

}

async function loadEmployees(){

const res = await fetch("/api/admin/employees");
const data = await res.json();

setEmployees(data.data);
setLoading(false);

}

checkAuth();

},[]);


/* ===== Filter ===== */

const filtered = employees.filter((e)=>
e.employeeId.toLowerCase().includes(search.toLowerCase())
);


if(loading){

return(
<div className="flex items-center justify-center h-screen">
<p className="text-gray-500">Loading admin panel...</p>
</div>
)

}


/* ================= DASHBOARD ================= */

return(

<div className="flex min-h-screen bg-gradient-to-br from-[#f6f8fb] via-white to-blue-50">


{/* SIDEBAR */}

<div className="w-[260px] bg-white/70 backdrop-blur-xl border-r border-gray-200 flex flex-col">

<div className="p-6 border-b">

<h1 className="text-xl font-bold text-cyan-600">
Malus Robotics
</h1>

<p className="text-xs text-gray-500">
Admin Control
</p>

</div>

<nav className="p-4 flex flex-col gap-2 text-sm">

<div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-cyan-50 text-cyan-700">

<LayoutDashboard size={16}/>
Employees

</div>

</nav>

</div>



{/* MAIN */}

<div className="flex-1 p-10 space-y-10">


{/* HEADER */}

<div>

<h1 className="text-3xl font-bold text-gray-800">
Employee Directory
</h1>

<p className="text-gray-500">
Manage Malus Robotics employees
</p>

</div>



{/* STATS */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl p-6 shadow-sm">

<div className="flex justify-between items-center">

<p className="text-sm text-gray-500">
Total Employees
</p>

<Users className="text-cyan-500"/>

</div>

<p className="text-2xl font-semibold mt-2">
{employees.length}
</p>

</div>

</div>



{/* SEARCH */}

<div className="relative w-[420px]">

<Search
size={16}
className="absolute left-3 top-3 text-gray-400"
/>

<input
placeholder="Search by Employee ID"
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-400 outline-none"
/>

</div>



{/* EMPLOYEE GRID */}

<div className="grid grid-cols-3 gap-6">

{filtered.map((e)=>(

<div
key={e.id}
onClick={()=>router.push(`/admin/employee/${e.employeeId}`)}
className="
bg-white/80
backdrop-blur-xl
border
border-gray-200
rounded-2xl
p-6
shadow-sm
hover:shadow-md
cursor-pointer
transition
"
>

<div className="flex items-center gap-4">

<div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold">
{e.name?.[0]}
</div>

<div>

<p className="font-semibold text-gray-800">
{e.name}
</p>

<p className="text-sm text-gray-500">
{e.email}
</p>

</div>

</div>


<div className="mt-4 text-sm text-gray-500">
Employee ID
</div>

<p className="font-semibold text-gray-800">
{e.employeeId}
</p>

</div>

))}

</div>

</div>

</div>

)

}