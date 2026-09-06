import React, { useState } from 'react';
import { CLIPPY_TIPS } from '../data/historyData';
import { sounds } from './SoundEffects';
import { MessageSquare, X, ChevronRight, Sparkles } from 'lucide-react';

export const ClippyAssistant: React.FC<{ onTriggerBsod: () => void }> = ({ onTriggerBsod }) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  const nextTip = () => {
    sounds.playClick();
    setTipIndex((prev) => (prev + 1) % CLIPPY_TIPS.length);
  };

  return (
    <div className="fixed bottom-20 right-6 z-40 select-none font-sans">
      {isOpen ? (
        <div className="flex flex-col items-end max-w-xs sm:max-w-sm">
          {/* Speech Bubble */}
          <div className="relative bg-amber-50 dark:bg-slate-800 border-2 border-amber-300 dark:border-amber-600/60 p-4 rounded-2xl shadow-xl text-slate-800 dark:text-slate-100 text-xs sm:text-sm mb-2 backdrop-blur-md animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsOpen(false);
              }}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              title="Close ClipBase"
            >
              <X size={14} />
            </button>

            {/* Bubble Header */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400 mb-1.5 uppercase tracking-wider">
              <Sparkles size={12} />
              <span>ClipBase Parody AI</span>
            </div>

            {/* Bubble content */}
            <p className="leading-relaxed pr-2">
              &ldquo;{CLIPPY_TIPS[tipIndex]}&rdquo;
            </p>

            {/* Bubble actions */}
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-200/60 dark:border-slate-700">
              <button
                onClick={nextTip}
                className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
              >
                Another Parody Tip <ChevronRight size={12} />
              </button>
              <button
                onClick={() => {
                  sounds.playError();
                  onTriggerBsod();
                }}
                className="text-[10px] text-red-500 hover:text-red-700 font-bold bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded"
              >
                Trigger BSOD!
              </button>
            </div>

            {/* Bubble Tail pointing down */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-amber-50 dark:bg-slate-800 border-r-2 border-b-2 border-amber-300 dark:border-amber-600/60 transform rotate-45"></div>
          </div>

          {/* Animated ClipBase Avatar */}
          <div
            onClick={nextTip}
            className="group cursor-pointer flex items-center justify-center p-2 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-lg border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all duration-200"
            title="Click ClipBase for another meme!"
          >
            {/* Custom SVG Paperclip with goofy animated eyes */}
            <div className="relative w-12 h-14 flex items-center justify-center">
              <svg viewBox="0 0 100 120" className="w-12 h-14 drop-shadow">
                {/* Silver paperclip wire */}
                <path
                  d="M 35 110 L 35 35 A 18 18 0 0 1 71 35 L 71 85 A 12 12 0 0 1 47 85 L 47 45 A 6 6 0 0 1 59 45 L 59 80"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Googly Left Eye */}
                <ellipse cx="44" cy="30" rx="9" ry="11" fill="white" stroke="#334155" strokeWidth="2.5" />
                <ellipse cx="45" cy="31" rx="4" ry="5" fill="#0f172a" />
                <circle cx="43" cy="29" r="1.5" fill="white" />

                {/* Googly Right Eye */}
                <ellipse cx="62" cy="30" rx="9" ry="11" fill="white" stroke="#334155" strokeWidth="2.5" />
                <ellipse cx="63" cy="31" rx="4" ry="5" fill="#0f172a" />
                <circle cx="61" cy="29" r="1.5" fill="white" />

                {/* Funny Eyebrows */}
                <path d="M 36 17 Q 44 14 52 18" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 56 18 Q 63 14 70 17" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        /* Minimized button */
        <button
          onClick={() => {
            sounds.playStartup();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 bg-[#0052FF] text-white px-3 py-2 rounded-full shadow-xl hover:bg-blue-700 transition-transform hover:scale-105 active:scale-95 text-xs font-semibold"
          title="Open ClipBase Meme Assistant"
        >
          <MessageSquare size={16} />
          <span>ClipBase AI</span>
        </button>
      )}
    </div>
  );
};
