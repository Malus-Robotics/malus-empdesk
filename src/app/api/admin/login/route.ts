import { NextResponse } from "next/server";

export async function POST(req: Request){

  const { password } = await req.json();

  if(password !== process.env.ADMIN_PASSWORD){

    return NextResponse.json({
      success:false,
      error:"Invalid password"
    });

  }

  const res = NextResponse.json({ success:true });

  res.cookies.set("admin_session","true",{
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    path:"/",
    maxAge: 60 * 30   // session expires in 30 minutes
  });

  return res;

}