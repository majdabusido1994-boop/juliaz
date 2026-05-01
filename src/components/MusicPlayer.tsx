"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.15;
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
    setShowPrompt(false);
  };

  return (
    <div className="fixed top-20 right-4 z-40 flex items-center gap-3">
      <audio ref={audioRef} loop preload="none">
        <source src="/vid/ambient.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 ${
          playing
            ? "border-gold-400 bg-gold-50 text-gold-600 shadow-md"
            : "border-gray-200 bg-white text-gray-400 hover:border-purple-300 hover:text-purple-600"
        }`}
        aria-label={playing ? "Pause ambient music" : "Play ambient music"}
      >
        {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        {playing && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-500 opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-gold-500" />
          </span>
        )}
      </button>

    </div>
  );
}
