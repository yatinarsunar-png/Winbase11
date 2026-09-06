import React from 'react';
import { WinbaseLogo } from './WinbaseLogo';
import { sounds } from './SoundEffects';
import {
  Sparkles,
  Download,
  AlertTriangle,
  Play,
  ShieldAlert,
  ArrowRight,
  Flame,
  CheckCircle2,
  HardDrive,
  Cpu,
  Clock,
  Search,
  RotateCw,
} from 'lucide-react';

interface HeroProps {
  onTriggerBsod: () => void;
  onOpenPcChecker: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTriggerBsod, onOpenPcChecker }) => {
  const scrollToHistory = () => {
    sounds.playClick();
    const el = document.getElementById('sejarah');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = () => {
    sounds.playStartup();
    alert('Downloading Winbase 11 ISO Pro Degen Edition (Size: 420 GB). Includes 50 pre-installed Candy Crush clones and 80 pending cumulative updates!');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Abstract Glowing Aura Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-sky-400/25 via-blue-600/20 to-indigo-800/15 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/40 dark:border-white/10 text-[#0052FF] dark:text-blue-400 text-xs font-bold shadow-sm">
          <Sparkles size={14} className="animate-spin" style={{ animationDuration: '8s' }} />
          <span>Bento Grid Theme • 100% Lawsuit-Free Parody Edition</span>
        </div>
        <div className="flex justify-center">
          <WinbaseLogo size="lg" showText={true} animated={true} />
        </div>
      </div>

      {/* THE BENTO GRID (Extracted directly from Design Theme) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-4 mb-10">
        {/* Cell 1: Col-Span 2, Row-Span 2 - Hero Flagship Bento Cell */}
        <div className="lg:col-span-2 lg:row-span-2 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border border-white/50 dark:border-white/10 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="inline-block bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-3.5 py-1 rounded-full text-xs font-bold mb-4 tracking-wide">
              VERSION 0.404-LOL
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-700 to-indigo-900 dark:from-blue-400 dark:via-indigo-300 dark:to-white">
              The OS That Rounds Your Window Corners and Your Logic.
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Winbase 11 is the pinnacle of software engineering where every UI element is centered—except the source code. Experience the most dramatic taskbar migration in human history.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={scrollToHistory}
                className="flex items-center gap-2 bg-[#0052FF] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/25 hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm"
              >
                <span>Explore Parody Lore</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenPcChecker();
                }}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200 text-xs sm:text-sm transition-all"
              >
                <ShieldAlert size={16} className="text-amber-500" />
                <span>PC Health Check</span>
              </button>
            </div>
          </div>

          {/* Sub-tiles inside the main Bento Cell */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 bg-slate-100/90 dark:bg-slate-800/70 p-4 rounded-2xl">
              <span className="text-2xl">📁</span>
              <div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">RESOURCES</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">2TB Meme Hoard</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-100/90 dark:bg-slate-800/70 p-4 rounded-2xl">
              <span className="text-2xl">🛡️</span>
              <div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">SECURITY</div>
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">99.9% TPM Rejection</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cell 2: Col-Span 1, Row-Span 1 - The Great Centering (Orange-Red Gradient) */}
        <div
          onClick={scrollToHistory}
          className="lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden cursor-pointer hover:scale-102 transition-transform"
        >
          <div className="relative z-10 space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">JUNE 2021</div>
            <h3 className="text-xl font-bold leading-snug">The Great Centering</h3>
            <p className="text-xs opacity-95 leading-relaxed">
              The year humanity spent 4 billion collective hours clicking the Start button 4 inches to the right of its ancestral home.
            </p>
          </div>
          <div className="absolute -bottom-5 -right-5 text-8xl opacity-20 select-none">🎯</div>
        </div>

        {/* Cell 3: Col-Span 1, Row-Span 2 - Clippy's Return (Indigo Tile) */}
        <div className="lg:col-span-1 lg:row-span-2 bg-indigo-800 dark:bg-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between border border-indigo-700/50">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">CLIPBASE HAS RETURNED</span>
              <span className="text-2xl">📎</span>
            </div>
            <div className="space-y-3">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs sm:text-sm italic leading-relaxed backdrop-blur-sm">
                &ldquo;It looks like you are trying to download a third-party browser. Are you sure you wouldn't prefer Winbase Edge (Meme Edition)?&rdquo;
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-xs leading-relaxed text-indigo-100">
                ClipBase is now powered by Artificial Incompetence to provide unsolicited life advice every 3 seconds.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playError();
              onTriggerBsod();
            }}
            className="w-full mt-4 bg-indigo-500/80 hover:bg-indigo-400 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-colors shadow"
          >
            Silence Clippy (BSOD)
          </button>
        </div>

        {/* Cell 4: Col-Span 1, Row-Span 1 - The BSOD Gallery (Blue Tile) */}
        <div
          onClick={() => onTriggerBsod()}
          className="lg:col-span-1 lg:row-span-1 bg-[#0052FF] hover:bg-blue-600 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between cursor-pointer hover:scale-102 transition-transform"
        >
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">BSOD Chamber</h3>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">Test Drive</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black">:(</span>
              <span className="text-xs opacity-85">Fresh Shade of Blue!</span>
            </div>
          </div>
          <p className="text-[10px] leading-tight opacity-90 mt-3 font-mono">
            Error: YOUR_LUCK_EXPIRED_0x000FF
          </p>
        </div>

        {/* Cell 5: Col-Span 1, Row-Span 1 - Update Pending (Frosted Glass Tile) */}
        <div
          onClick={() => {
            sounds.playStartup();
            alert('Update 100% Complete! Please do not turn off your computer for the next 45 minutes...');
          }}
          className="lg:col-span-1 lg:row-span-1 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border border-white/50 dark:border-white/10 flex items-center gap-4 shadow-md cursor-pointer hover:bg-white/80 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0">
            ⏳
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Pending Update</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Estimated: Forever + 5 mins.
            </p>
          </div>
        </div>

        {/* Cell 6: Col-Span 2, Row-Span 1 - Legacy Support (Slate-900 Dark Tile) */}
        <div className="lg:col-span-2 lg:row-span-1 bg-slate-900 rounded-3xl p-6 text-white shadow-2xl flex items-center justify-between gap-6 overflow-hidden relative border border-slate-800">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-emerald-400">Eternal Legacy Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We carefully hid the 1995 Control Panel inside 14 nested submenus purely to protect your fondest childhood memories.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 bg-slate-800 rounded-xl text-[10px] font-semibold border border-slate-700 text-slate-300">
                Win3.1 Solitaire
              </span>
              <span className="px-3 py-1 bg-slate-800 rounded-xl text-[10px] font-semibold border border-slate-700 text-slate-300">
                90s File Explorer
              </span>
              <span className="px-3 py-1 bg-slate-800 rounded-xl text-[10px] font-semibold border border-slate-700 text-slate-300">
                Show More Options
              </span>
            </div>
          </div>
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-800 rounded-2xl border-2 border-slate-700 flex items-center justify-center shrink-0">
            <span className="text-4xl select-none">💾</span>
          </div>
        </div>

        {/* Cell 7: Col-Span 1, Row-Span 1 - Search Bar Simulator (White / Slate Glass) */}
        <div
          onClick={() => {
            sounds.playError();
            alert('Search: "Searching local files..." -> Opening Microsoft Edge to query Bing for "fried chicken recipe".');
          }}
          className="lg:col-span-1 lg:row-span-1 bg-white/80 dark:bg-slate-800/80 rounded-3xl p-6 shadow-md border border-slate-200/80 dark:border-slate-700 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors"
        >
          <div className="text-3xl mb-1">🔄</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ENDLESS LOOP</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Bing Search Simulator</div>
        </div>
      </div>

      {/* Windows 11 Desktop Interactive Preview Showcase Bento Card */}
      <div className="rounded-3xl border-4 border-white/80 dark:border-slate-700/80 shadow-2xl overflow-hidden bg-slate-950 text-white relative">
        {/* Fake Desktop Titlebar */}
        <div className="h-9 bg-slate-900 px-5 flex items-center justify-between border-b border-slate-800 text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 font-mono text-[11px] text-slate-300">
              Winbase 11 Pro Bento Edition [Tax-Free]
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Build 26100.BENTO (Release Preview)
          </div>
        </div>

        {/* Desktop Canvas with Windows 11 Bloom effect */}
        <div className="relative h-72 sm:h-96 w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#071330] via-[#0b214a] to-[#040b1a] overflow-hidden">
          {/* Central Glowing Bloom Art in Winbase Blue */}
          <div className="absolute inset-0 flex items-center justify-center opacity-75 pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-[#0052FF] blur-[90px] animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="w-48 h-48 rounded-full bg-sky-400 blur-[70px] -translate-x-12 -translate-y-6" />
          </div>

          {/* Floating Parody Window: Microsoft Edge Begging */}
          <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl text-left space-y-3 transform hover:scale-102 transition-transform">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="font-bold flex items-center gap-1.5 text-sky-400">
                <span className="text-base">🌐</span> Microsoft Edge (Bowing & Pleading)
              </span>
              <span className="text-[10px] text-slate-400">Just Now</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              &ldquo;We detected your cursor moving towards the Google Chrome shortcut. Please take 30 seconds to read 50 verified reasons why Edge is more loyal than your ex!&rdquo;
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  sounds.playStartup();
                  alert('Edge: "Thank you for giving us our 999th chance!"');
                }}
                className="text-[11px] font-bold bg-[#0052FF] text-white px-4 py-2 rounded-xl hover:bg-blue-600"
              >
                Keep Using Edge
              </button>
              <button
                onClick={() => {
                  sounds.playError();
                  onTriggerBsod();
                }}
                className="text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-slate-300 px-4 py-2 rounded-xl"
              >
                Download Chrome Anyway (BSOD)
              </button>
            </div>
          </div>

          {/* Floating notification badge */}
          <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-700 px-3.5 py-2 rounded-2xl text-xs shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-slate-300">Mandatory Update: Restarting in 3 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};
