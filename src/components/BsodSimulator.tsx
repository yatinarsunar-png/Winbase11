import React, { useEffect, useState } from 'react';
import { sounds } from './SoundEffects';
import confetti from 'canvas-confetti';
import { QrCode, RefreshCw, X } from 'lucide-react';

interface BsodProps {
  isOpen: boolean;
  onClose: () => void;
  customReason?: string;
}

export const BsodSimulator: React.FC<BsodProps> = ({
  isOpen,
  onClose,
  customReason = 'CRITICAL_PROCESS_DIED_OF_CRINGE',
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      sounds.playError();
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const next = prev + Math.floor(Math.random() * 25) + 10;
          return next > 100 ? 100 : next;
        });
      }, 700);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'Enter') {
          handleRecover();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearInterval(interval);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleRecover = () => {
    sounds.playStartup();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="bsod-overlay"
      className="fixed inset-0 z-50 bg-[#0078d7] text-white font-sans flex flex-col justify-between p-8 md:p-20 select-none overflow-y-auto animate-fadeIn"
      style={{ minHeight: '100vh' }}
    >
      {/* Top Exit Control */}
      <div className="flex justify-end">
        <button
          onClick={handleRecover}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/30"
          title="Press Escape to exit BSOD"
        >
          <X size={16} /> Exit BSOD Simulator (Esc)
        </button>
      </div>

      {/* Main BSOD Content */}
      <div className="max-w-4xl mx-auto w-full my-auto space-y-8">
        {/* The Giant Frown */}
        <div className="text-8xl md:text-9xl font-light tracking-tighter">
          :(
        </div>

        {/* The Parody Message */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-4xl font-normal leading-relaxed">
            Your Winbase 11 PC ran into a meme problem and needs to restart.
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
            We&apos;re just collecting some crash dump embarrassment and your open browser history. Don&apos;t worry, we won&apos;t broadcast it to your family WhatsApp group (probably).
          </p>
        </div>

        {/* Stuck percentage counter */}
        <div className="text-xl md:text-2xl font-light flex items-center gap-3">
          <span className="font-mono font-semibold">{progress}%</span> complete
          {progress === 100 && (
            <span className="text-sm bg-white/20 px-2 py-1 rounded text-white/90 animate-pulse">
              (100% complete, yet spinning for another 45 minutes)
            </span>
          )}
        </div>

        {/* Technical Info & QR Code */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pt-6 border-t border-white/20">
          {/* Parody QR box */}
          <div className="p-3 bg-white text-[#0078d7] rounded-lg shadow-lg flex flex-col items-center justify-center">
            <QrCode size={90} className="text-[#0078d7]" />
            <span className="text-[10px] font-bold mt-1 text-slate-800">SCAN FOR LAUGHS</span>
          </div>

          <div className="space-y-2 text-sm md:text-base font-mono">
            <p className="font-sans text-white/80">
              For more information about this tragedy and potential fixes, visit:
              <br />
              <span className="underline font-mono">https://winbase11.meme/stopcode-you-opened-chrome-again</span>
            </p>
            <div className="text-xs md:text-sm text-white/90 space-y-1 pt-2">
              <p>
                <span className="font-bold text-white">Stop Code:</span> {customReason}
              </p>
              <p>
                <span className="font-bold text-white">What failed:</span> microsoft_edge_crying.sys
              </p>
              <p>
                <span className="font-bold text-white">NFT Mint Status:</span> Crash dump successfully minted on Base Chain #42069
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4">
          <button
            onClick={handleRecover}
            className="inline-flex items-center gap-2 bg-white text-[#0078d7] font-semibold px-6 py-3 rounded-xl shadow-xl hover:bg-slate-100 transition-transform hover:scale-105 active:scale-95"
          >
            <RefreshCw size={18} />
            Rescue Me & Restore Desktop (Restart PC)
          </button>
        </div>
      </div>

      {/* Footer warning */}
      <div className="text-center text-xs text-white/60 pt-6">
        Winbase 11 Parody BSOD Simulation. No user files were harmed, only your digital pride took a hit.
      </div>
    </div>
  );
};
