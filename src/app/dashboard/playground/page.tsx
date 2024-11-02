"use client";
import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

const PlaygroundPage = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Playground</h1>
        <p className="text-sm text-muted-foreground">
          A place to test and play with components.
        </p>
      </div>
      <UploadButton
        className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-button:border-none ut-button:shadow-none ut-button:text-sm ut-button:h-9"
        endpoint="pdfUploader"
        onClientUploadComplete={(res) => {
          if (res?.[0]?.url) {
            setPdfUrl(res[0].url);
          }
        }}
      />
      {pdfUrl && (
        <div className="mt-4">
          <iframe
            src={pdfUrl}
            className="w-full h-[600px] rounded-lg border border-border"
            title="PDF Preview"
          />
        </div>
      )}
    </div>
  );
};

export default PlaygroundPage;
