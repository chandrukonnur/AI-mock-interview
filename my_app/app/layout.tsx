"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import "./globals.css";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserDetailProvider } from "@/context/UserDetailContext";

// Font
const outfit = Outfit({ subsets: ["latin"] });

// Convex client
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ClerkProvider>
      <ConvexProvider client={convex}>
        <html lang="en" data-scroll-behavior="smooth">
          <head>
            <link
              href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
              rel="stylesheet"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>AI-Mock-Interview</title>
          </head>

          <body className={outfit.className}>
            {/* BACKGROUND */}
            <div
              className="fixed inset-0 -z-10 h-screen w-screen 
              [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
            />

            <div
              className="fixed inset-0 -z-10 opacity-20 
              bg-[url('/grid.svg')] bg-[size:40px_40px]"
            />

            <UserDetailProvider>
              <AnimatePresence mode="wait">
                <motion.div
                  key="static"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}

                  // 🟣 UI FIX: prevent content from going behind navbar
                  className="pt-[120px]"   // <--- only UI change added
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </UserDetailProvider>
          </body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}
