import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HistoryTimeline } from './components/HistoryTimeline';
import { MemeFeatures } from './components/MemeFeatures';
import { ComparisonTable } from './components/ComparisonTable';
import { MemeGallery } from './components/MemeGallery';
import { Soundboard } from './components/Soundboard';
import { Footer } from './components/Footer';
import { BsodSimulator } from './components/BsodSimulator';
import { PCCheckerModal } from './components/PCCheckerModal';
import { InteractiveStartMenu } from './components/InteractiveStartMenu';
import { ClippyAssistant } from './components/ClippyAssistant';
import { sounds } from './components/SoundEffects';

export default function App() {
  const [isBsodOpen, setIsBsodOpen] = useState(false);
  const [bsodReason, setBsodReason] = useState('CRITICAL_PROCESS_DIED_OF_CRINGE');
  const [isPcCheckerOpen, setIsPcCheckerOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync dark mode class with documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const triggerBsod = (reason = 'CRITICAL_PROCESS_DIED_OF_CRINGE') => {
    setBsodReason(reason);
    setIsBsodOpen(true);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    sounds.isMuted = nextMute;
    setIsMuted(nextMute);
    if (!nextMute) {
      sounds.playClick();
    }
  };

  const toggleTheme = () => {
    sounds.playClick();
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-300/35 via-blue-600/15 to-indigo-950/20 dark:from-[#081b3b] dark:via-[#09152b] dark:to-[#040714] text-slate-900 dark:text-slate-100 font-sans transition-colors selection:bg-[#0052FF] selection:text-white pb-20 relative overflow-x-hidden">
      {/* Top Navigation Bar */}
      <Navbar
        onTriggerBsod={() => triggerBsod('USER_REQUESTED_MEME_BSOD')}
        onOpenPcChecker={() => setIsPcCheckerOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      {/* Hero Section */}
      <main>
        <Hero
          onTriggerBsod={() => triggerBsod('CLICKED_HERO_BSOD_BUTTON')}
          onOpenPcChecker={() => setIsPcCheckerOpen(true)}
        />

        {/* Windows 11 Parodied History Timeline - Primary Requirement */}
        <HistoryTimeline />

        {/* Parodied Features Showcase */}
        <MemeFeatures
          onTriggerBsod={() => triggerBsod('SHOW_MORE_OPTIONS_OVERDOSE')}
        />

        {/* Comparison Matrix */}
        <ComparisonTable />

        {/* Meme Gallery & Interactive Generator */}
        <MemeGallery
          onTriggerBsod={() => triggerBsod('UNSOLICITED_NOTEPAD_AI_OVERHEAT')}
        />

        {/* Parody Low-Quality Windows Soundboard */}
        <Soundboard
          onTriggerBsod={(reason) => triggerBsod(reason || 'SOUNDBOARD_CASCADE_BSOD')}
        />
      </main>

      {/* Footer */}
      <Footer
        onTriggerBsod={() => triggerBsod('FOOTER_EXPLODED_FROM_MEMES')}
      />

      {/* Interactive Floating ClipBase Assistant */}
      <ClippyAssistant
        onTriggerBsod={() => triggerBsod('CLIPBASE_TOO_MUCH_SHILLING')}
      />

      {/* Full-Screen Blue Screen of Death Simulator */}
      <BsodSimulator
        isOpen={isBsodOpen}
        onClose={() => setIsBsodOpen(false)}
        customReason={bsodReason}
      />

      {/* Parody PC Health Check Modal */}
      <PCCheckerModal
        isOpen={isPcCheckerOpen}
        onClose={() => setIsPcCheckerOpen(false)}
        onTriggerBsod={() => {
          setIsPcCheckerOpen(false);
          triggerBsod('TPM_2_0_AURA_CHECK_FAILED');
        }}
      />

      {/* Docked Windows 11 Taskbar and Centered Start Menu */}
      <InteractiveStartMenu
        onTriggerBsod={() => triggerBsod('START_MENU_EMERGENCY_SHUTDOWN')}
        onOpenPcChecker={() => setIsPcCheckerOpen(true)}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
