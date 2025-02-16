import { NextResponse } from "next/server";

export async function GET(reguest:Request) {
    return NextResponse.json({hello:"world"})
    
}