import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Format date in IST
function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Kolkata"
  });
}

// Calculate working hours
function calculateHours(start: Date, end: Date) {
  const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return diff.toFixed(2);
}

export async function GET() {

  const today = new Date();

  // Start of current week (Sunday)
  const startOfWeek = new Date();
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0,0,0,0);

  // Fetch attendance records
  const records = await prisma.attendance.findMany({
    where:{
      createdAt:{
        gte:startOfWeek
      }
    },
    include:{
      employee:true
    },
    orderBy:{
      createdAt:"asc"
    }
  });

  if(records.length === 0){
    return NextResponse.json({
      success:false,
      message:"No attendance records this week"
    });
  }

  // Group records by employee
  const grouped:any = {};

  records.forEach((r:any)=>{

    if(!grouped[r.employeeId]){
      grouped[r.employeeId] = {
        name:r.employee.name,
        records:[]
      };
    }

    grouped[r.employeeId].records.push(r);

  });

  // Build report
  let report = `Malus Robotics Weekly Attendance Report\n`;
  report += `Generated: ${new Date().toLocaleDateString("en-IN",{timeZone:"Asia/Kolkata"})}\n\n`;

  for(const id in grouped){

    const emp = grouped[id];

    report += `Employee: ${emp.name} (${id})\n\n`;
    report += `Date        Clock In     Clock Out     Hours\n`;
    report += `------------------------------------------------\n`;

    emp.records.forEach((r:any)=>{

      const hours = r.clockOut
        ? calculateHours(r.clockIn,r.clockOut)
        : "-";

      report += `${formatDate(r.clockIn)}   `;

      report += `${r.clockIn.toLocaleTimeString("en-IN",{
        hour:"2-digit",
        minute:"2-digit",
        timeZone:"Asia/Kolkata"
      })}   `;

      report += `${r.clockOut ? r.clockOut.toLocaleTimeString("en-IN",{
        hour:"2-digit",
        minute:"2-digit",
        timeZone:"Asia/Kolkata"
      }) : "-"}   `;

      report += `${hours}\n`;

    });

    report += `\nTimesheets\n`;

    emp.records.forEach((r:any)=>{
      if(r.timesheet){
        report += `• ${r.timesheet}\n`;
      }
    });

    report += `\n-------------------------------------------\n\n`;

  }

  // Email transporter
  const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:Number(process.env.EMAIL_PORT),
    secure:false,
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  });

  // Send email
  await transporter.sendMail({
    from:`"Malus Robotics HR" <${process.env.EMAIL_USER}>`,
    to:process.env.EMAIL_TO,
    subject:"Malus Robotics Weekly Attendance Report",
    text:report
  });

  return NextResponse.json({
    success:true,
    message:"Weekly report sent to HR"
  });

}