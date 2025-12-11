"use client";

import React from "react";

export default function Upgrade() {
  return (
    <div
      style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 1rem"}}
     className="lex flex-col items-center justify-between pt-[120px]"


    >
      <h2 className="font-bold text-4xl mb-14 text-white">
        Upgrade to Pro Plan
      </h2>

      {/* Pricing Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {/* Free Plan */}
        <div className="group border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl p-8 transition-all duration-300 
        hover:shadow-[0_0_40px_rgba(139,92,246,0.9)] hover:scale-105">

          <h3 className="text-3xl font-bold text-white">Free Plan 🎉</h3>
          <p className="text-gray-300 mt-2">Get started with basic access</p>

          <p className="text-6xl font-extrabold mt-6 text-white">₹0</p>

          <ul className="mt-8 space-y-3 text-gray-300 text-lg">
            <li>🟣 2 AI Interview sessions / day</li>
            <li>🟣 Resume interview (basic)</li>
            <li>🟣 AI Text-based feedback</li>
            <li>❌ Talking Avatar video mode</li>
            <li>❌ Performance analytics</li>
            <li>❌ Priority support</li>
          </ul>

          <button className="w-full mt-10 py-4 rounded-2xl text-lg font-semibold bg-gray-700 hover:bg-gray-600 transition-all">
            Current Plan
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="group border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl p-8 transition-all duration-300 
        hover:shadow-[0_0_40px_rgba(139,92,246,0.9)] hover:scale-105">

          <h3 className="text-3xl font-bold text-white">Monthly Plan ⚡</h3>
          <p className="text-gray-300 mt-2">Unlock all premium features</p>

          <p className="text-6xl font-extrabold mt-6 text-purple-400">₹499
            <span className="text-xl text-gray-300">/month</span>
          </p>

          <ul className="mt-8 space-y-3 text-gray-300 text-lg">
            <li>⚡ Unlimited AI Interview sessions</li>
            <li>🎤 Talking Avatar video interview</li>
            <li>📄 Advanced resume interview generator</li>
            <li>📊 Performance analytics & insights</li>
            <li>🧠 Smart feedback improvement</li>
            <li>💜 Priority support</li>
          </ul>

          <button className="w-full mt-10 py-4 rounded-2xl text-lg font-semibold bg-purple-600 hover:bg-purple-500 transition-all">
            Upgrade Monthly
          </button>
        </div>

        {/* Annual Plan */}
        <div className="group border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl p-8 transition-all duration-300 
        hover:shadow-[0_0_40px_rgba(139,92,246,0.9)] hover:scale-105">

          <h3 className="text-3xl font-bold text-white">Annual Plan 💎</h3>
          <p className="text-gray-300 mt-2">Save more & unlock everything</p>

          <p className="text-6xl font-extrabold mt-6 text-purple-400">₹3999
            <span className="text-xl text-gray-300">/year</span>
          </p>
          <p className="text-green-400 font-semibold">✨ Save 33% yearly</p>

          <ul className="mt-6 space-y-3 text-gray-300 text-lg">
            <li>♾ Unlimited AI Interviews</li>
            <li>🎭 Talking Avatar + Voice mode</li>
            <li>📄 Resume Upload & Batch Generator</li>
            <li>📉 Deep analytics + AI smart assistant</li>
            <li>💎 Beta access to new features</li>
            <li>💜 VIP priority support</li>
          </ul>

          <button className="w-full mt-10 py-4 rounded-2xl text-lg font-semibold bg-purple-600 hover:bg-purple-500 transition-all">
            Upgrade Yearly
          </button>
        </div>
      </div>
    </div>
  );
}
