'use client';
import { FileUpload } from '@/components/ui/file-upload';
import React from 'react';

function ResumeUpload({ setFiles }: any) {
  const handleFileUpload = (files: File[]) => {
    setFiles(files[0]);
  };

  return (
    <div
      className="
        w-full max-w-4xl mx-auto min-h-96
        rounded-2xl
        bg-black
        border border-black/20
        flex items-center justify-center
      "
    >
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}

export default ResumeUpload;
