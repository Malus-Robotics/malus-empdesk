import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

async function generateEmployeeId() {

  const year = new Date().getFullYear();

  const count = await prisma.employee.count({
    where: {
      createdAt: {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${year + 1}-01-01`)
      }
    }
  });

  const serial = (count + 1).toString().padStart(4,"0");

  return `MRPL-${year}-${serial}`;
}

export async function POST(req:Request){

  const { name,email,password } = await req.json();

  if(!email.endsWith("@malusrobotics.com")){
    return NextResponse.json({error:"Use company email"});
  }

  const employeeId = await generateEmployeeId();

  const hashedPassword = await bcrypt.hash(password,10);

  const employee = await prisma.employee.create({
    data:{
      employeeId,
      name,
      email,
      password:hashedPassword
    }
  });

  const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:Number(process.env.EMAIL_PORT),
    secure:false,
    auth:{
      user:process.env.EMAIL_USER,
      pass:process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from:`"Malus Robotics Desk" <${process.env.EMAIL_USER}>`,
    to:email,
    subject:"Your Employee ID",
    text:`
Welcome to Malus Robotics

Name: ${name}
Employee ID: ${employeeId}

Use this ID to login to the employee desk.
`
  });

  return NextResponse.json({
    success:true,
    employeeId
  });

}