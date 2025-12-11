import React from 'react'
import { InterviewData } from '../../interview/[interviewId]/start/page'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import FeedbackDialog from './FeedbackDialog'

type props = {
    interviewInfo: InterviewData
}

function InterviewCard({ interviewInfo }: props) {
    return (
        <div
            className="
                p-6 
                rounded-2xl 
                border border-white/10 
                bg-white/5 
                backdrop-blur-xl 
                shadow-lg shadow-purple-500/5
                hover:shadow-purple-500/20 
                hover:scale-[1.02] 
                transition-all duration-300
            "
        >
            {/* Title + Status */}
            <h2 className="font-semibold text-xl flex justify-between items-center mb-2">
                {interviewInfo?.resumeUrl ? "Resume Interview" : interviewInfo.jobTitle}

                <Badge
                    className="
                        text-xs 
                        px-3 py-1 rounded-full 
                        bg-purple-600/20 
                        text-purple-300 
                        border border-purple-400/20
                    "
                >
                    {interviewInfo?.status}
                </Badge>
            </h2>

            {/* Description */}
            <p className="line-clamp-2 text-gray-300 text-sm mb-5">
                {interviewInfo?.resumeUrl
                    ? "We generated Interview from the uploaded resume."
                    : interviewInfo.jobDescription}
            </p>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center mt-4">
                {interviewInfo?.feedback && (
                    <FeedbackDialog feedbackInfo={interviewInfo.feedback} />
                )}

                <Link href={'/interview/' + interviewInfo?._id}>
                    <Button
                        variant="outline"
                        className="
                            border-white/30 
                            text-white 
                            hover:bg-white/10 
                            px-5 
                            rounded-full
                        "
                    >
                        Start Interview <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewCard
