import axios from 'axios';
import {NextRequest,NextResponse} from "next/server";

export async function POST(req:NextRequest) {
    const{messages}=await req.json();

    const result=await axios.post("http://localhost:5678/webhook/c931f5e4-d5a5-4940-b885-f4bd4d1a08e6",{
      messages:JSON.stringify(messages)  
    })
    console.log(result);
    return NextResponse.json(result?.data?.output);
}