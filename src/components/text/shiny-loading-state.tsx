"use client";

import React, { useState, useEffect } from "react";

export default function ShinyLoadingState({
  sentences,
  className = "",
}: {
  sentences: string[];
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sentenceInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 4000);

    const dotInterval = setInterval(() => {}, 1000);

    return () => {
      clearInterval(sentenceInterval);
      clearInterval(dotInterval);
    };
  }, [sentences]);

  return (
    <div
      className={`shiny-text-container bg-white rounded-lg px-4 py-2 text-sm ${className}`}
    >
      <p
        key={currentIndex}
        className="bg-shine-gradient text-sm bg-shine-size animate-shine bg-clip-text text-transparent"
      >
        {sentences[currentIndex]}
      </p>
    </div>
  );
}
