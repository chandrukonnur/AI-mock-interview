import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'

const MenuOption = [
  {
    name: "Dashboard",
    path: "/dashboard"
  },
  {
    name: "Upgrade",
    path: "/upgrade"
  },
  {
    name: "How it works?",
    path: "/how-it-works"
  },
]

function AppHeader() {
  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50 
        backdrop-blur-lg 
        bg-white/5 
        border-b border-white/10 
        px-6 
        h-16 
        flex items-center justify-between
      "
    >

      {/* LEFT SIDE: LOGO */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-base font-bold md:text-2xl">AI Mock Interview</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-auto flex items-center gap-8">

        {/* NAV LINKS */}
        <ul className="flex gap-8">
          {MenuOption.map((option, index) => (
            <li
              key={index}
              className="
                text-lg cursor-pointer 
                hover:text-primary transition-all 
                hover:opacity-80
              "
            >
              <Link href={option.path}>{option.name}</Link>
            </li>
          ))}
        </ul>

        {/* USER BUTTON */}
        <div className="scale-105 hover:scale-110 transition-all">
          <UserButton />
        </div>

      </div>

    </nav>
  )
}

export default AppHeader
