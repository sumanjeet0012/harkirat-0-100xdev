import { NextResponse } from "next/server"

// it will work ffor /api/auth/* route

export function GET () {
    return NextResponse.json({
        success: true
    })
}