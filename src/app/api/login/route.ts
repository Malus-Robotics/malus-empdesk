import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {

  const { employeeId, password } = await req.json();

  const employee = await prisma.employee.findUnique({
    where: { employeeId }
  });

  if (!employee) {
    return NextResponse.json({ success: false });
  }

  const valid = await bcrypt.compare(password, employee.password);

  if (!valid) {
    return NextResponse.json({ success: false });
  }

  const token = jwt.sign(
    { employeeId: employee.employeeId },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({ success: true });

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/"
  });

  return res;
}