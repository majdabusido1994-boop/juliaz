"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
    setShowPrompt(false);
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src="/vid/ambient.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        {/* Tooltip prompt */}
        <AnimatePresence>
          {showPrompt && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, delay: 2 }}
              className="rounded-lg bg-text-primary/90 px-4 py-2 font-body text-xs text-white shadow-lg backdrop-blur-sm"
            >
              Play ambient music
            </motion.span>
          )}
        </AnimatePresence>

        {/* Button */}
        <button
          onClick={toggleMusic}
          className="group relative cursor-pointer"
          aria-label={playing ? "Mute music" : "Play ambient music"}
        >
          {/* Animated ring when playing */}
          {playing && (
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          )}

          <span
            className={`relative flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
              playing
                ? "bg-primary text-white"
                : "bg-warm-white/90 text-text-secondary backdrop-blur-sm border border-border/60 hover:bg-primary-light/30 hover:text-primary-dark"
            }`}
          >
            {playing ? (
              <Volume2 size={20} />
            ) : (
              <VolumeX size={20} />
            )}
          </span>

          {/* Sound wave bars when playing */}
          {playing && (
            <div className="absolute -top-1 -right-1 flex items-end gap-[2px]">
              <span className="h-2 w-[3px] animate-pulse rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
              <span className="h-3 w-[3px] animate-pulse rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-[3px] animate-pulse rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </button>
      </div>
    </>
  );
}
