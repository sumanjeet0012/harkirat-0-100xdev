import { NextResponse } from "next/server";

//it will work for /api/auth route

export function GET () {
    return NextResponse.json({
        message: "its working"
    })
}