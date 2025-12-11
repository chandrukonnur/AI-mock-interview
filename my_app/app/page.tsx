"use client";

import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import Stats from "./_components/Stats";
import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/FAQ";
import Footer from "./_components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative pt-24">
      <Header />

      <main>
        <Hero />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Features />
        </motion.div>

        <HowItWorks />
        <Stats />
        <Testimonials />
        <FAQ />

      </main>

      <Footer />
    </div>
  );
}
