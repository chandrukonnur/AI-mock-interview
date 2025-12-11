import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";
import { aj } from "@/utils/arcjet";
import { auth, currentUser } from "@clerk/nextjs/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    const _formData = await req.formData();
    const file = _formData.get("file") as File | null;
    const jobTitle = _formData.get("jobTitle") as string | null;
    const jobDescription = _formData.get("jobDescription") as string | null;
    const {has}=await auth();
    const decision = await aj.protect(req,{
      userId: user?.primaryEmailAddress?.emailAddress ?? "",
      requested: 5
    });
    console.log("Arcjet decision", decision);
    const isSubscribedUser = has({plan:'pro'})

    //@ts-ignore
    if (decision?.reason?.remaining === 0 && !isSubscribedUser) {
      return NextResponse.json({
        status: 429,
        result: "No free credit remaining, try again later"
      });
    }

    if (file) {
      console.log("Received file:", file.name);

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload to ImageKit
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: `upload-${Date.now()}.pdf`,
        isPrivateFile: false,
        useUniqueFileName: true,
      });

      // Call n8n webhook with resume URL
      const result = await axios.post(
        "http://localhost:5678/webhook/Ai_generated_interview_questions",
        { resumeUrl: uploadResponse?.url }
      );

      console.log("n8n response:", result.data);

      const questions = Array.isArray(result.data?.output.questions)
        ? result.data.output.questions
        : [];

      return NextResponse.json({
        questions,
        resumeUrl: uploadResponse?.url,
        status: 200
      });

    } else {
      // No file, send job title + description instead
      const result = await axios.post(
        "http://localhost:5678/webhook/Ai_generated_interview_questions",
        { resumeUrl: null, jobTitle, jobDescription }
      );

      console.log("n8n response:", result.data);

      const questions = Array.isArray(result.data?.output?.questions)
        ? result.data.output.questions
        : [];

      return NextResponse.json({
        questions,
        resumeUrl: null,
        status: 200
      });
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}