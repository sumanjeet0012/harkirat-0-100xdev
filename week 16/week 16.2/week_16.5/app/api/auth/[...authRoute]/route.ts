import { NextRequest, NextResponse } from "next/server"

// it will work ffor /api/auth/* route

export function GET () {
    return NextResponse.json({
        success: true
    })
}

export function POST (req : NextRequest, args : any) {
    console.log(args);
    return NextResponse.json({
        success: true,
        args
    })
}