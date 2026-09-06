import React from 'react';
import { WinbaseLogo } from './WinbaseLogo';
import { sounds } from './SoundEffects';
import {
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Download,
  AlertTriangle,
  Flame,
  Menu,
  X,
  Play,
} from 'lucide-react';

interface NavbarProps {
  onTriggerBsod: () => void;
  onOpenPcChecker: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onTriggerBsod,
  onOpenPcChecker,
  isMuted,
  onToggleMute,
  isDarkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (anchorId: string) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = () => {
    sounds.playStartup();
    alert(
      'Downloading Winbase 11 ISO Pro Degen Edition (Size: 420 GB). Includes 50 pre-installed Candy Crush clones and 80 pending cumulative updates!'
    );
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/20 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-white/30 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo matching the user image */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sounds.playStartup();
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <WinbaseLogo size="md" showText={true} animated={true} />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/30 dark:bg-slate-800/40 px-3 py-1.5 rounded-full border border-white/40 dark:border-white/10 backdrop-blur-md">
          <button
            onClick={() => handleNavClick('sejarah')}
            className="hover:text-[#0052FF] px-3 py-1 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            Windows 11 History
          </button>
          <button
            onClick={() => handleNavClick('fitur-absurd')}
            className="hover:text-[#0052FF] px-3 py-1 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            Absurd Features
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenPcChecker();
            }}
            className="hover:text-[#0052FF] px-3 py-1 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all flex items-center gap-1.5"
          >
            <span>PC Health Check</span>
            <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.2 rounded-full font-bold">
              TPM
            </span>
          </button>
          <button
            onClick={() => handleNavClick('meme-gallery')}
            className="hover:text-[#0052FF] px-3 py-1 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            Meme Vault
          </button>
          <button
            onClick={() => handleNavClick('soundboard')}
            className="hover:text-[#0052FF] px-3 py-1 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all flex items-center gap-1.5"
          >
            <span>Soundboard</span>
            <span className="text-[10px] bg-blue-500/20 text-[#0052FF] dark:text-blue-300 px-1.5 py-0.2 rounded-full font-bold">
              FX
            </span>
          </button>
          <button
            onClick={() => handleNavClick('komparasi')}
            className="hover:text-[#0052FF] px-3 py-1 rounded-full hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all"
          >
            OS Comparison
          </button>
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Audio Chime Button */}
          <button
            onClick={() => sounds.playStartup()}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:bg-white/70 dark:hover:bg-slate-700 transition-colors"
            title="Play Windows 11 / Winbase Startup Sound"
          >
            <Play size={15} className="text-[#0052FF]" />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:bg-white/70 dark:hover:bg-slate-700 transition-colors"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/40 dark:bg-slate-800/40 border border-white/40 dark:border-white/10 hover:bg-white/70 dark:hover:bg-slate-700 transition-colors"
            title={isDarkMode ? 'Switch to Flashbang Mode (Light)' : 'Switch to Degen Mode (Dark)'}
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* BSOD Simulator Trigger */}
          <button
            onClick={onTriggerBsod}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 transition-all shadow-sm"
            title="Click to trigger instant Blue Screen of Death"
          >
            <AlertTriangle size={14} />
            <span>BSOD Simulator</span>
          </button>

          {/* Download ISO Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-white dark:bg-blue-600 text-blue-900 dark:text-white shadow-lg border border-white/40 hover:scale-105 active:scale-95 transition-all"
          >
            <Download size={14} />
            <span>Upgrade to Chaos (420 GB)</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 space-y-3 animate-fadeIn text-sm">
          <button
            onClick={() => handleNavClick('sejarah')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
          >
            Windows 11 History
          </button>
          <button
            onClick={() => handleNavClick('fitur-absurd')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
          >
            Absurd Features
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPcChecker();
            }}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-[#0052FF]"
          >
            PC Health Check (TPM 2.0)
          </button>
          <button
            onClick={() => handleNavClick('meme-gallery')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
          >
            Meme Vault
          </button>
          <button
            onClick={() => handleNavClick('soundboard')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-[#0052FF]"
          >
            Soundboard (FX Synthesizer)
          </button>
          <button
            onClick={() => handleNavClick('komparasi')}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
          >
            OS Comparison
          </button>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onTriggerBsod();
              }}
              className="w-full py-2.5 rounded-xl bg-red-600 text-white font-bold text-center"
            >
              Simulate BSOD Now
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDownload();
              }}
              className="w-full py-2.5 rounded-xl bg-[#0052FF] text-white font-bold text-center"
            >
              Download ISO (420 GB)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
