import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const records = await prisma.attendance.findMany({
    include:{
      employee:true
    },
    orderBy:{
      clockIn:"desc"
    }
  });

  return NextResponse.json({
    success:true,
    data:records
  });

}