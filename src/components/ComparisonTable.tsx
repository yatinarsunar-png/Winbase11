import React from 'react';
import { Table, Check, X, Sparkles, HelpCircle } from 'lucide-react';
import { sounds } from './SoundEffects';

export const ComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      feature: 'Start Button Position',
      xp: 'Bottom Left (Legendary)',
      win10: 'Bottom Left (Safe & Sound)',
      win11: 'Dead Center (Jumpscare)',
      winbase: 'Floating wherever it pleases',
    },
    {
      feature: 'Changing Default Browser',
      xp: '1 Click and Done',
      win10: '2 Clicks, Still Reasonable',
      win11: '14 File Extensions Changed Manually',
      winbase: 'Only opens Base Uniswap',
    },
    {
      feature: 'Right-Click Context Menu',
      xp: 'Comprehensive & Instant',
      win10: 'Single-tier, clean',
      win11: 'Two tiers (Show More Options)',
      winbase: 'Three tiers & requests gas fee',
    },
    {
      feature: 'TPM 2.0 Chip Mandate',
      xp: 'What is a TPM?',
      win10: 'Installs on a smart toaster',
      win11: 'Mandatory; throw away 4-year-old PC',
      winbase: 'Bypassed automatically via Meme Aura',
    },
    {
      feature: 'Bundled Games',
      xp: '3D Pinball & Authentic Solitaire',
      win10: 'Solitaire with 30s video ads',
      win11: 'Candy Crush silently preinstalled',
      winbase: 'BSOD Simulator & Flappy Pepe',
    },
    {
      feature: 'Desktop Assistant',
      xp: 'Classic Clippy (Courteous)',
      win10: 'Cortana (Universally Ignored)',
      win11: 'Copilot (Invading Every Corner)',
      winbase: 'ClipBase (Meme & Coin Shilling)',
    },
  ];

  return (
    <section id="komparasi" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-[#0052FF] dark:text-blue-300 text-xs font-bold tracking-wide uppercase shadow-sm">
          <Table size={14} />
          <span>Bento Harsh Truth Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Cross-Generation Comparison <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-blue-500 to-indigo-600">
            From Windows XP to Winbase 11
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          An objective look at how technological evolution has simultaneously advanced and complicated opening a simple text document.
        </p>
      </div>

      {/* Table Bento Card */}
      <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <th className="p-4 sm:p-5 font-bold">Feature / Grievance</th>
                <th className="p-4 sm:p-5 font-semibold text-slate-500">Windows XP</th>
                <th className="p-4 sm:p-5 font-semibold text-slate-500">Windows 10</th>
                <th className="p-4 sm:p-5 font-semibold text-blue-500">Windows 11</th>
                <th className="p-4 sm:p-5 font-black text-[#0052FF] dark:text-blue-300 bg-blue-500/10 dark:bg-blue-900/20">
                  Winbase 11 🚀
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {comparisonData.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-blue-50/30 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                    {row.xp}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400">
                    {row.win10}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium">
                    {row.win11}
                  </td>
                  <td className="p-4 sm:p-5 font-bold text-[#0052FF] dark:text-blue-300 bg-blue-500/5 dark:bg-blue-900/15">
                    {row.winbase}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
