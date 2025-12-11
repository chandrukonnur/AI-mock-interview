import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

type Props = {
  feedbackInfo: FeedbackInfo
}

export type FeedbackInfo = {
  Feedback: string,
  rating: number,
  suggestion: string
}

function FeedbackDialog({ feedbackInfo }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Feedback</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='font-bold text-2xl'>Interview Feedback</DialogTitle>
 </DialogHeader>
        {/* Main content must be OUTSIDE DialogHeader */}
        <div className='mt-4'>
          <h2 className='font-bold text-xl text-primary'>Feedback:</h2>
          <p className='text-lg'>
            {feedbackInfo?.Feedback || "No feedback provided"}
          </p>

          <div>
            <h2 className='font-bold text-xl text-primary mt-5'>Suggestion:</h2>
            <p className='p-2 my-1 text-gray-300 text-lg'>
              {feedbackInfo?.suggestion?.trim()
                ? feedbackInfo.suggestion
                : "No suggestions provided"}
            </p>
          </div>

          <h2 className='font-bold text-xl text-primary'>
            Rating:{" "}
            <span className='text-primary'>
              {feedbackInfo?.rating ?? "N/A"}
            </span>
          </h2>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackDialog
