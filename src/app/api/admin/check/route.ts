import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){

  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if(!session){
    return NextResponse.json({
      authorized:false
    });
  }

  return NextResponse.json({
    authorized:true
  });

}