"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import Link from 'next/link'

function Interview() {
  const { interviewId } = useParams();

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="max-w-4xl w-full">

        {/* --- Improved Hero Image with Rounded Corners + Shadow --- */}
        <div className="overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/Interviewimg.jpg"
            alt="interview"
            width={200}
            height={50}
            className="w-full h-[320px] object-cover"
            priority
          />
        </div>

        {/* --- Main Content Section --- */}
        <div className="mt-10 flex flex-col items-center space-y-6">

          <h2 className="font-extrabold text-4xl text-center text-white drop-shadow-md">
            Ready to Start Interview?
          </h2>

          <p className="text-gray-300 text-lg text-center max-w-xl">
            This interview session will take approximately <span className="font-semibold text-white">30 minutes</span>.
            Make sure you are in a quiet environment before continuing.
          </p>

          {/* Start Button */}
          <div className="flex justify-center w-full">
            <Link href={'/interview/'+interviewId+'/start'}>
              <Button className="
                px-6 py-3 text-lg font-semibold
                bg-gradient-to-r from-violet-500 to-indigo-600 
                hover:scale-105 transition-all duration-200
                shadow-lg rounded-xl
              ">
                Start Interview
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>

          {/* Invite Section */}
          <div className="
            mt-6 p-8 w-full max-w-xl
            bg-white/10 backdrop-blur-xl
            border border-white/20 rounded-3xl
            shadow-lg
          ">
            <h2 className="font-semibold text-2xl text-center text-white">
              Want to send interview link to someone?
            </h2>

            <p className="text-gray-300 text-center text-sm mt-1">
              Share this interview session with a friend or classmate.
            </p>

            <div className="flex gap-4 w-full items-center mt-5">
              <Input
                placeholder="Enter email address"
                className="
                  w-full bg-white/20 border-white/30 text-white
                  placeholder-gray-300
                "
              />
              <Button className="
                bg-violet-600 hover:bg-violet-700 
                shadow-md rounded-xl
              ">
                <Send size={20} />
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Interview
