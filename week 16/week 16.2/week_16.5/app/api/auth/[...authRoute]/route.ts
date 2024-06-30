import { NextRequest, NextResponse } from "next/server"

// it will work ffor /api/auth/* route

export function GET () {
    return NextResponse.json({
        success: true
    })
}

export function POST (req : NextRequest, {params} : any) {
    return NextResponse.json({
        success: true,
        params
    })
}