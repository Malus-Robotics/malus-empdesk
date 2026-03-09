import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

  const employees = await prisma.employee.findMany({
    orderBy:{
      createdAt:"desc"
    }
  });

  return NextResponse.json({
    data: employees
  });

}