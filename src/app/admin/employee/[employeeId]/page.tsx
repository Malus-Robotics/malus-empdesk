"use client";

import { useEffect, useState } from "react";
import { Clock, User } from "lucide-react";

export default function EmployeeDetail({ params }: any){

const [records,setRecords] = useState<any[]>([]);
const [employee,setEmployee] = useState<any>(null);
const [employeeId,setEmployeeId] = useState<string | null>(null);


/* ===== Get Params ===== */

useEffect(()=>{

async function getParams(){

const p = await params;
setEmployeeId(p.employeeId);

}

getParams();

},[params]);


/* ===== Load Data ===== */

useEffect(()=>{

if(!employeeId) return;

async function load(){

const res = await fetch(`/api/admin/employee/${employeeId}`);
const data = await res.json();

setEmployee(data.employee);
setRecords(data.records);

}

load();

},[employeeId]);


/* ===== Total Overall Hours ===== */

function getTotalHours(){

let totalSeconds = 0;

records.forEach((r)=>{

if(r.clockIn && r.clockOut){

const start = new Date(r.clockIn).getTime();
const end = new Date(r.clockOut).getTime();

totalSeconds += (end-start)/1000;

}

});

const h = Math.floor(totalSeconds/3600);
const m = Math.floor((totalSeconds%3600)/60);

return `${h}h ${m}m`;

}

const totalHours = getTotalHours();


return(

<div className="min-h-screen bg-gradient-to-br from-[#f6f8fb] via-white to-blue-50 p-10 space-y-10">


{/* HEADER */}

<div>

<h1 className="text-3xl font-bold text-gray-800">
Employee Analytics
</h1>

<p className="text-gray-500">
Malus Robotics Admin Panel
</p>

</div>


{/* EMPLOYEE PROFILE */}

{employee && (

<div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">

<div className="w-16 h-16 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xl font-semibold">

{employee.name?.[0]}

</div>

<div>

<p className="text-lg font-semibold text-gray-800">
{employee.name}
</p>

<p className="text-gray-500 text-sm">
{employee.email}
</p>

<p className="text-gray-500 text-sm">
Employee ID: {employee.employeeId}
</p>

</div>

</div>

)}


{/* STATS */}

<div className="grid grid-cols-3 gap-6">

<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

<p className="text-sm text-gray-500">
Attendance Records
</p>

<p className="text-2xl font-semibold mt-2">
{records.length}
</p>

</div>


<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

<p className="text-sm text-gray-500">
Total Working Hours
</p>

<p className="text-2xl font-semibold mt-2">
{totalHours}
</p>

</div>


<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between">

<div>

<p className="text-sm text-gray-500">
Timesheets Submitted
</p>

<p className="text-2xl font-semibold mt-2">
{records.filter(r=>r.timesheet).length}
</p>

</div>

<Clock className="text-cyan-500"/>

</div>

</div>


{/* ATTENDANCE TABLE */}

<div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

<table className="w-full">

<thead className="bg-gray-50 text-left text-sm text-gray-600">

<tr>

<th className="p-4">Date</th>
<th className="p-4">Clock In</th>
<th className="p-4">Clock Out</th>
<th className="p-4">Daily Hours</th>
<th className="p-4">Timesheet</th>

</tr>

</thead>

<tbody>

{records.map((r:any)=>{

let total = "-";

if(r.clockIn && r.clockOut){

const start = new Date(r.clockIn).getTime();
const end = new Date(r.clockOut).getTime();

const diff = (end-start)/1000;

const h = Math.floor(diff/3600);
const m = Math.floor((diff%3600)/60);

total = `${h}h ${m}m`;

}

return(

<tr key={r.id} className="border-t hover:bg-gray-50">

<td className="p-4 text-gray-700">

{new Date(r.clockIn).toLocaleDateString("en-IN")}

</td>

<td className="p-4 text-gray-700">

{new Date(r.clockIn).toLocaleTimeString("en-IN",{timeZone:"Asia/Kolkata"})}

</td>

<td className="p-4 text-gray-700">

{r.clockOut
? new Date(r.clockOut).toLocaleTimeString("en-IN",{timeZone:"Asia/Kolkata"})
: "-"
}

</td>

<td className="p-4 font-semibold text-gray-800">
{total}
</td>

<td className="p-4 text-gray-500 max-w-[400px]">
{r.timesheet || "-"}
</td>

</tr>

)

})}

</tbody>

</table>

</div>

</div>

)

}