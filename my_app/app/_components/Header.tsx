"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
      <Link href="/Hero">
      <Image 
        src="/logo.svg"   // <-- change this to your image path
        alt="Logo" 
        width={32} 
        height={32}
        className="rounded-md"
      />
      </Link>
      <h1 className="text-base font-bold md:text-2xl">AI Mock Interview</h1>

    </div>
         <Link href="/dashboard">
            <Button className="px-10 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30">
          Get Started
          </Button>
          </Link>
      </nav>
    </header>
  );
}
