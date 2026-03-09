import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){

  const { employeeId } = await req.json();

  const last = await prisma.attendance.findFirst({
    where: { employeeId },
    orderBy: { clockIn: "desc" }
  });

  if(!last){
    return NextResponse.json({
      status: "OUT",
      clockInTime: null
    });
  }

  // User currently clocked in
  if(last.clockIn && !last.clockOut){
    return NextResponse.json({
      status: "IN",
      clockInTime: last.clockIn
    });
  }

  // User currently clocked out
  return NextResponse.json({
    status: "OUT",
    clockInTime: null
  });

}