import { NextRequest, NextResponse } from "next/server";

let students = [];

export async function GET(req: NextRequest) {
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  students.push(data);
  return NextResponse.json({ message: "Student added", data });
}