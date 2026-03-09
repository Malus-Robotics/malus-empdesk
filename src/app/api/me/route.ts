import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  employeeId: string;
}

export async function GET(req: NextRequest) {

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Not logged in" },
      { status: 401 }
    );
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    return NextResponse.json({
      employeeId: decoded.employeeId
    });

  } catch {

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );

  }

}