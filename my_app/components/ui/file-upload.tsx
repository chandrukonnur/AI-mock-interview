"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -------------------------
  // Keep original logic
  // -------------------------
  const handleFileChange = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    if (onChange) onChange(newFiles);
  };

  const handleClick = () => fileInputRef.current?.click();

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file rounded-2xl cursor-pointer w-full relative 
                   overflow-hidden bg-gradient-to-br from-white/70 to-white/40 
                   dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800"
      >
        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,application/msword"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        {/* Background Grid */}
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>

        {/* Body */}
        <div className="flex flex-col items-center justify-center relative z-10">
          <span className="font-sans font-bold text-neutral-800 dark:text-neutral-200 text-lg">
            Upload file
          </span>

          <p className="font-sans text-neutral-500 dark:text-neutral-400 mt-2 text-sm">
            Drag or drop your files here or click to upload
          </p>

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {/* If Files Exist */}
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={idx}
                  layoutId={"file-" + idx}
                  className="relative overflow-hidden bg-white dark:bg-neutral-900 
                             flex flex-col p-4 mt-4 w-full rounded-md shadow border 
                             border-neutral-200 dark:border-neutral-800"
                >
                  <div className="flex justify-between w-full items-center">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="px-2 py-1 text-sm rounded-md 
                                 bg-neutral-100 dark:bg-neutral-800 dark:text-white"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-neutral-800">
                      {file.type}
                    </span>
                    <span>Modified {new Date(file.lastModified).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}

            {/* Empty State */}
            {!files.length && (
              <>
                <motion.div
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-40 bg-white dark:bg-neutral-900 flex items-center justify-center 
                             h-32 w-full max-w-[8rem] mx-auto rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700"
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center text-neutral-600 dark:text-neutral-300"
                    >
                      Drop it
                      <IconUpload className="h-5 w-5 mt-1" />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                  )}
                </motion.div>

                <motion.div
                  variants={secondaryVariant}
                  className="absolute inset-0 border border-dashed border-indigo-400 rounded-xl opacity-0"
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;

  return (
    <div className="flex bg-white/40 dark:bg-neutral-900 flex-wrap gap-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;

          return (
            <div
              key={`${row}-${col}`}
              className={cn(
                "w-10 h-10 rounded-[2px]",
                index % 2 === 0
                  ? "bg-white/60 dark:bg-neutral-950"
                  : "bg-white dark:bg-neutral-950 shadow-[inset_0_0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_1px_3px_rgba(255,255,255,0.05)]"
              )}
            />
          );
        })
      )}
    </div>
  );
}
