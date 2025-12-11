"use client";
import { api } from '@/convex/_generated/api';
import { useConvex, useMutation } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { Id } from "@/convex/_generated/dataModel";
import axios from "axios";
import { GenericAgoraSDK } from 'akool-streaming-avatar-sdk';
import { Mic, MicOff, PhoneCall, PhoneOff, User } from 'lucide-react';
import { toast } from 'sonner';
import { FeedbackInfo } from '@/app/(routes)/dashboard/_components/FeedbackDialog';

type InterviewQuestions = {
  answer: string,
  question: string
};

export type InterviewData = {
  jobTitle?: string | null,
  jobDescription?: string | null,
  interviewQuestions: InterviewQuestions[],
  resumeUrl?: string | null,
  userId?: Id<any> | string | null,
  _id: Id<"InterviewSessionTable">,
  status: string | null,
  feedback?: FeedbackInfo | null
};

type Messages = {
  from: 'user' | 'bot',
  text: string,
};

const CONTAINER_ID = 'akool-avatar-container';
const AVATAR_ID = 'dvp_Alinna_realisticbg_20241224';

function StartInterview() {
  const { interviewId } = useParams();
  const convex = useConvex();
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const videoContainerRef = useRef<any>(null);
  const [micOn, setMicOn] = useState(false);
  const [kbId, setKbId] = useState<string | null>();
  const [agoraSdk, setAgoraSdk] = useState<GenericAgoraSDK | null>(null);
  const called = useRef(false);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([]);
  const updateFeedback = useMutation(api.Interview.UpdateFeedback)
  const router = useRouter();

  /* --- LOGIC UNCHANGED --- */

  useEffect(() => {
    if (called.current) return;
    called.current = true;
    GetInterviewQuestions();
  }, [interviewId]);

  const GetInterviewQuestions = async () => {
    try {
      const convexId = interviewId as Id<"InterviewSessionTable">;
      const result = await convex.query(api.Interview.GetInterviewQuestions, {
        interviewRecordId: convexId,
      });
      setInterviewData(result);
    } catch (err) {
      console.error("🔥 Error fetching interview:", err);
    }
  };

  useEffect(() => {
    interviewData && GetKnowledgeBase();
  }, [interviewData]);

  const GetKnowledgeBase = async () => {
    if (!interviewData?.interviewQuestions ||
      !Array.isArray(interviewData.interviewQuestions) ||
      interviewData.interviewQuestions.length === 0) {
      return;
    }

    const result = await axios.post('/api/akool-knowledge-base/', {
      questions: interviewData.interviewQuestions
    });

    setKbId(result?.data?.data?._id);
  };


  /* --- SDK Loading Logic UNCHANGED --- */
  useEffect(() => {
    const loadSDK = async () => {
      const { GenericAgoraSDK } = await import("akool-streaming-avatar-sdk");
      const sdk = new GenericAgoraSDK({ mode: "rtc", codec: "vp8" });

      sdk.on({
        onStreamMessage: (uid, message) => {
          //@ts-ignore
          message.pld?.text?.length > 0 &&
            setMessages((prev: any) => [...prev, message.pld]);
        },
        onException: (error) => console.log("Exception:", error),
        onUserPublished: async (user, mediaType) => {
          if (mediaType === 'video') {
            await sdk.getClient().subscribe(user, mediaType);
            user?.videoTrack?.play(videoContainerRef.current);
          } else if (mediaType === 'audio') {
            await sdk.getClient().subscribe(user, mediaType);
            user?.audioTrack?.play();
          }
        }
      });

      setAgoraSdk(sdk);

      return () => {
        sdk.leaveChat();
        sdk.leaveChannel();
        sdk.closeStreaming();
      };
    };

    loadSDK();
  }, []);

  /* --- Start Conversation Logic UNCHANGED --- */

  const StartConversation = async () => {
    if (!agoraSdk) return;

    setLoading(true);
    const result = await axios.post('/api/akool-session', {
      avatar_id: AVATAR_ID,
      knowledge_id: kbId
    });

    const credentials = result?.data?.data?.credentials;
    if (!credentials) throw new Error("Missing Credentials");

    await agoraSdk.joinChannel(credentials);
    await agoraSdk.joinChat({
      vid: "6889b628662160e2caad5dbc",
      lang: "en",
      mode: 2
    });

    const Prompt = `You are a friendly job interviewer.
Ask one question at a time.
Start with "Tell me about yourself."
Then follow this list:
${interviewData?.interviewQuestions.map((q: any) => q.question).join("\n")}
Do not repeat questions.`;

    await agoraSdk.sendMessage(Prompt);
    await agoraSdk.toggleMic();
    setMicOn(true);
    setJoined(true);
    setLoading(false);
  };

  const leaveConversation = async () => {
    if (!agoraSdk) return;

    await agoraSdk.leaveChat();
    await agoraSdk.leaveChannel();
    await agoraSdk.closeStreaming();

    setJoined(false);
    setMicOn(false);

    await GenrateFeedback();
  };

  const toggleMic = async () => {
    if (!agoraSdk) return;
    await agoraSdk.toggleMic();
    setMicOn(agoraSdk.isMicEnabled());
  };

  const GenrateFeedback = async () => {
    toast.warning("Generating feedback…");

    const result = await axios.post('/api/interview-feedback', {
      messages: messages
    });

    await updateFeedback({
      feedback: result.data,
      //@ts-ignore
      recordId: interviewId
    });

    toast.success("Interview Completed!");
    router.replace('/dashboard');
  };

  /* UI STARTS — LOGIC ABOVE UNCHANGED */

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen px-0 pt-24 overflow-visible">
      {/* LEFT SECTION */}
      <div className="flex flex-col lg:w-[60%] items-center">


        <h2 className="text-base font-bold md:text-5xl mb-6">
  Interview Session
</h2>


        {/* VIDEO BOX - improved UI only */}
        <div
          className="glow-wrapper rounded-3xl p-[2px] transition-all"
          style={{
            width: 954,
            height: 570,
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.06) 40%, rgba(0,0,0,0.12))'
          }}
        >
          <div
            ref={videoContainerRef}
            id={CONTAINER_ID}
            className="rounded-3xl overflow-hidden flex flex-col items-center justify-center border border-white/10 backdrop-blur-xl relative"
            style={{
              width: 954,
              height: 570,
              background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(8,6,15,0.9) 60%, rgba(36,16,60,0.35) 100%)"
            }}
          >
            {/* Avatar placeholder (visible when not joined) */}
            {!joined && (
              <>
                <User size={96} className="text-gray-400 opacity-80" />
                <p className="mt-3 text-sm text-gray-400/90">Waiting for interviewer…</p>
              </>
            )}

            {/* micro shadow / hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400/70 select-none">
              Camera / Avatar area
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex space-x-4">
          {!joined ? (
            <button
              onClick={StartConversation}
              disabled={loading}
              className="flex items-center px-6 py-3 rounded-full bg-green-500 hover:bg-green-400 text-white font-semibold shadow-lg shadow-green-700/40 transition disabled:opacity-40"
            >
              <PhoneCall className="mr-2" size={24} />
              {loading ? "Connecting..." : "Connect Call"}
            </button>
          ) : (
            <>
              <button
                onClick={toggleMic}
                className="flex items-center px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-medium shadow-md transition"
              >
                {micOn ? (
                  <>
                    <Mic size={20} className="mr-2" /> Mute
                  </>
                ) : (
                  <>
                    <MicOff size={20} className="mr-2" /> Unmute
                  </>
                )}
              </button>

              <button
                onClick={leaveConversation}
                className="flex items-center px-6 py-3 rounded-full bg-red-500 hover:bg-red-400 text-white font-semibold shadow-lg"
              >
                <PhoneOff size={20} className="mr-2" />
                End Call
              </button>
            </>
          )}
        </div>
      </div>

      {/* RIGHT CHAT PANEL - improved UI only (outer glow wrapper) */}
      <div className="lg:w-1/3 px-4 mt-10 lg:mt-0">

        <h2 className="text-base font-bold md:text-5xl mb-3">
  Conversation
</h2>


        {/* Outer gradient wrapper so glow has room to render (mirrors video area) */}
        <div
          className="glow-wrapper rounded-2xl p-[2px] transition-all"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.06) 40%, rgba(0,0,0,0.12))'
          }}
        >
          <div className="h-[80vh] overflow-y-scroll p-6 rounded-[10px] border border-white/10 backdrop-blur-md bg-black/30 space-y-4 chat-scroll">
            {messages?.length === 0 && (
              <p className="text-gray-300/90">
                Your conversation will appear here once the call starts.
              </p>
            )}

            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`
                  max-w-[80%] p-3 rounded-xl text-sm leading-relaxed break-words
                  ${msg.from === "user"
                    ? "bg-purple-600/20 text-white self-end ml-auto shadow-[0_6px_18px_rgba(124,58,237,0.15)]"
                    : "bg-gray-800/70 text-gray-100 shadow-[0_3px_10px_rgba(0,0,0,0.4)]"
                  }
                `}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline component-scoped styles */}
     <style jsx>{`
  /* Import Orbitron font */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap');

  /* MAIN HEADING STYLE – now matches your navbar text */
  .futuristic-heading {
    font-family: 'Orbitron', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    color: #ffffff !important;
    letter-spacing: 0.08em;
    font-weight: 700;
    text-transform: none;
    line-height: 1.05;
    background: none !important;
    -webkit-background-clip: unset !important;
    background-clip: unset !important;
  }

  /* REMOVED glow/underline by disabling pseudo-elements */
  .futuristic-heading::after {
    display: none !important;
  }

  .futuristic-heading::before {
    display: none !important;
  }

  /* Mobile tweak (kept same) */
  @media (max-width: 768px) {
    .futuristic-heading {
      letter-spacing: 0.04em;
    }
  }

  /* Hide Scrollbar (Webkit – Chrome, Edge, Safari) */
  .chat-scroll::-webkit-scrollbar {
    display: none;
  }

  /* Hide Scrollbar (Firefox) */
  .chat-scroll {
    scrollbar-width: none;
  }

  /* Hide Scrollbar (IE/Legacy Edge) */
  .chat-scroll {
    -ms-overflow-style: none;
  }
`}</style>


    </div>
  );
}

export default StartInterview;
