import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ employeeId: string }> }
){

  const { employeeId } = await context.params;

  const employee = await prisma.employee.findUnique({
    where:{
      employeeId
    }
  });

  const records = await prisma.attendance.findMany({
    where:{
      employeeId
    },
    orderBy:{
      clockIn:"desc"
    }
  });

  return NextResponse.json({
    employee,
    records
  });

}