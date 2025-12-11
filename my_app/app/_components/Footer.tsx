"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
   <footer className="w-full backdrop-blur-md bg-black/40 text-gray-300 py-16 px-6 md:px-20 border-t border-gray-800">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Address */}
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">AI Mock Interview</h1>
          <p className="mt-3 text-gray-400">Bangalore, India</p>
        <Link
  href="https://www.linkedin.com/in/chandru-konnur-/"
  target="_blank"
>
  <button className="mt-5 px-5 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 hover:scale-105 transition-all duration-300">
    Get in touch
  </button>
</Link>

        </div>

        {/* Industry */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Industry</h3>
          <ul className="space-y-2">
            {["AI Interviews", "Career Growth", "Tech Hiring"].map((item, idx) => (
              <li
                key={idx}
                className="hover:translate-x-1 transition-all duration-300 hover:text-purple-400 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Use Cases</h3>
          <ul className="space-y-2">
            {[
              "Mock technical interviews",
              "AI resume screening",
              "Job description analysis",
              "Interview feedback reports",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:translate-x-1 transition-all duration-300 hover:text-purple-400 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            {[
              "About us",
              "How it works",
              "Pricing",
              "Contact",
              "Interview Tips Blog",
            ].map((item, idx) => (
              <li
                key={idx}
                className="hover:translate-x-1 transition-all duration-300 hover:text-purple-400 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} AI-Mock-Interview — All Rights Reserved.
        </p>

        {/* Socials */}
        <div className="flex space-x-5 mt-4 md:mt-0">
          <Link
            href="https://www.linkedin.com/in/chandru-konnur-/"
            className="text-gray-400 hover:text-purple-500 hover:scale-110 transition-all duration-300"
          >
            <FaLinkedin size={22} />
          </Link>
          <Link
            href="https://github.com/chandrukonnur"
            className="text-gray-400 hover:text-purple-500 hover:scale-110 transition-all duration-300"
          >
            <FaGithub size={22} />
          </Link>
          <Link
            href="https://www.instagram.com/shekhaaarr/"
            className="text-gray-400 hover:text-purple-500 hover:scale-110 transition-all duration-300"
          >
            <FaInstagram size={22} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
