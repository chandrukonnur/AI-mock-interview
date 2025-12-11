import React from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import CreateInterviewDialog from "../../_components/CreateInterviewDialog";

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        mt-20 w-full max-w-4xl mx-auto flex flex-col justify-center items-center gap-6 
        border border-white/10 bg-white/5 backdrop-blur-2xl 
        p-12 rounded-2xl shadow-xl shadow-purple-500/10
      "
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Image
          src="/interview.png"
          alt="emptyState"
          width={260}
          height={160}
          priority
        />
      </motion.div>

      <h2 className="text-2xl font-semibold text-white/90">
        No Interviews Yet 👀
      </h2>

      <p className="text-white/60 text-center max-w-md leading-relaxed">
        Create your first mock interview and start improving with real-time AI feedback.
      </p>

      <div className="mt-3">
        <CreateInterviewDialog />
      </div>
    </motion.div>
  );
}

export default EmptyState;
