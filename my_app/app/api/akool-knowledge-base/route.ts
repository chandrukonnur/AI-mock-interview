import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { questions } = await req.json();

  if (!Array.isArray(questions) || questions.length === 0) {
    return NextResponse.json(
      { error: "Questions array is missing or empty" },
      { status: 400 }
    );
  }

  const resp = await axios.post(
    "https://openapi.akool.com/api/open/v4/knowledge/create",
    {
      name: "Interview Agent prod" + Date.now(),
      prologue: "Tell me about your self  ",
      prompt: `You are a friendly job interviewer.
Ask the user one interview question at a time.
Wait for their spoken response before asking the next question.
Start with: "Tell me about yourself."
Then proceed with the following questions in order:
${questions.map((q: any) => q.question).join("\n")}
After the user responds, ask the next question in the list. Do not repeat previous questions.`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.AKOOL_API_TOKEN}`,
      },
    }
  );

  console.log(resp.data);
  return NextResponse.json(resp.data);
}
