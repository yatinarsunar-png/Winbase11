import React from 'react';
import { WinbaseLogo } from './WinbaseLogo';
import { sounds } from './SoundEffects';
import { Sparkles, ArrowUp, Heart, Shield, Terminal } from 'lucide-react';

export const Footer: React.FC<{ onTriggerBsod: () => void }> = ({ onTriggerBsod }) => {
  const scrollToTop = () => {
    sounds.playStartup();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pb-24 pt-16 px-4 sm:px-6 lg:px-8 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Logo & Slogan */}
          <div className="space-y-2">
            <WinbaseLogo size="md" showText={true} />
            <p className="max-w-md text-xs text-slate-500 dark:text-slate-400">
              The universe&apos;s #1 parody operating system. Converting every Windows 11 grievance, bug, and forced reboot into high-grade comedy.
            </p>
          </div>

          {/* Quick parody actions */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onTriggerBsod}
              className="text-red-500 hover:text-red-600 font-semibold"
            >
              Simulate BSOD
            </button>
            <button
              onClick={() => {
                sounds.playStartup();
                alert('Winbase 11 License Key: MEME-4200-DEGEN-6969-BASE (Valid forever)');
              }}
              className="hover:text-[#0052FF] font-semibold"
            >
              Check Free License
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#0052FF] font-bold hover:underline"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Legal Parody Disclaimer */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
          <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Shield size={14} className="text-[#0052FF]" />
            <span>Parody &amp; Satire Legal Disclaimer:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Winbase 11 is a pure parody and satirical project. This website is NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Microsoft Corporation, Windows, Coinbase, or Base. All trademarks, registered trademarks, and product names belong to their respective copyright holders. All content is intended solely for comedic entertainment, memes, and historical tech appreciation.
          </p>
        </div>

        {/* Copyright & Made with Meme */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-800">
          <p>© 2026 Winbase 11 Foundation. Built with laughter, memes, and 0% TPM 2.0 requirements.</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-bold text-[#0052FF]">Base Meme Energy</span>
            <span>&amp; React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
