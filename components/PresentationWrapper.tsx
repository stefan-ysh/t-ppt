"use client";

import React, { useEffect, useRef } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import { presentationMap } from "./presentations/registry";
import ViewCounter from "./ViewCounter";

interface PresentationWrapperProps {
  presentationId: string;
}

export default function PresentationWrapper({
  presentationId,
}: PresentationWrapperProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  type RevealController = {
    initialize: () => void;
    destroy: () => void;
  };

  const revealRef = useRef<RevealController | null>(null);
  const presentation = presentationMap[presentationId];
  const SlidesComponent = presentation?.component;

  useEffect(() => {
    if (!presentation) {
      return;
    }

    if (deckRef.current && !revealRef.current) {
      const instance = new Reveal(deckRef.current, {
        controls: false,
        progress: false,
        loop: false,
        center: true,
        hash: true,
        transition: "slide",
        width: 1920,
        height: 1080,
        margin: 0,
        slideNumber: true,
      });

      instance.initialize();
      revealRef.current = instance;
    }
    return () => {
      if (revealRef.current) {
        revealRef.current.destroy();
        revealRef.current = null;
      }
    };
  }, [presentationId, presentation]);

  if (!presentation || !SlidesComponent) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        <div className="text-center space-y-4">
          <p className="text-xl">未找到对应的演示文稿。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* 浏览量显示 - 固定在右上角 */}
      <div className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
        <ViewCounter pptId={presentationId} increment={true} />
      </div>
      
      <div className="reveal" ref={deckRef}>
        <div className="slides">
          <SlidesComponent />
        </div>
      </div>
    </div>
  );
}
