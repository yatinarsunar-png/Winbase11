import React, { useState } from 'react';
import { MEME_GALLERY_ITEMS } from '../data/historyData';
import { sounds } from './SoundEffects';
import {
  Laugh,
  ThumbsUp,
  Share2,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Cpu,
  Monitor,
} from 'lucide-react';

export const MemeGallery: React.FC<{ onTriggerBsod: () => void }> = ({ onTriggerBsod }) => {
  const [votes, setVotes] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    MEME_GALLERY_ITEMS.forEach((m) => (initial[m.id] = m.votes));
    return initial;
  });

  // Custom Error Dialog Meme Generator State
  const [customErrorTitle, setCustomErrorTitle] = useState('AUTOMATIC_UPDATE_CATASTROPHE.exe');
  const [customErrorMsg, setCustomErrorMsg] = useState(
    'Windows detected that you were in a good mood and decided to restart your PC right now.'
  );

  const handleVote = (id: string) => {
    sounds.playClick();
    setVotes((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const samplePresets = [
    {
      title: 'CHROME_RAM_VORACIOUS.dll',
      msg: 'Google Chrome has consumed your remaining 32GB of RAM. Your computer has successfully transformed into a panini press.',
    },
    {
      title: 'EDGE_EMOTIONAL_BREAKDOWN.sys',
      msg: 'Microsoft Edge detected you searched for "Firefox" and is currently sobbing quietly in the corner of your taskbar.',
    },
    {
      title: 'TPM_MODULE_NOT_FOUND.vibe',
      msg: 'Your motherboard lacks emotional radiance. Please purchase a $1,000 motherboard to unlock Paint 3D.',
    },
  ];

  return (
    <section id="meme-gallery" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-[#0052FF] dark:text-blue-300 text-xs font-bold tracking-wide uppercase shadow-sm">
          <Laugh size={14} />
          <span>Bento Netizen Laugh Vault</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          The Most Iconic Meme Collection <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-blue-500 to-indigo-600">
            Across Windows 11 History
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Distilled from thousands of heartfelt cries on Twitter, Reddit, and Microsoft Community threads that were closed without a real solution.
        </p>
      </div>

      {/* Meme Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {MEME_GALLERY_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category Tag */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0052FF] dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">#{item.id}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>

              {/* Meme visual representation */}
              <div className="my-4 p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs border border-slate-800 relative overflow-hidden shadow-inner">
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="ml-2 font-semibold text-slate-300">Winbase 11 Prompt</span>
                </div>
                <p className="leading-relaxed font-sans text-xs text-slate-200">
                  {item.punchline}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer with Upvote */}
            <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => handleVote(item.id)}
                className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-[#0052FF] transition-colors"
              >
                <ThumbsUp size={14} className="text-[#0052FF]" />
                <span>Upvote ({votes[item.id]})</span>
              </button>
              <button
                onClick={() => {
                  sounds.playStartup();
                  navigator.clipboard?.writeText(`${item.title}: ${item.punchline} - via Winbase 11 Parody`);
                  alert('Meme text copied to clipboard!');
                }}
                className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Share Meme"
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Custom Error Message Generator */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-blue-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Interactive Meme Studio</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Winbase 11 Parody Error Dialog Generator
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Craft your own hilarious fake Windows error dialog to send to your manager when you need a gaming break or an unshakeable excuse!
          </p>

          {/* Generator Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400">Error Window Title (.exe / .dll):</label>
              <input
                type="text"
                value={customErrorTitle}
                onChange={(e) => setCustomErrorTitle(e.target.value)}
                className="w-full mt-1 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#0052FF]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400">Select Satirical Preset:</label>
              <div className="flex gap-2 mt-1">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sounds.playClick();
                      setCustomErrorTitle(preset.title);
                      setCustomErrorMsg(preset.msg);
                    }}
                    className="text-[11px] bg-slate-800 hover:bg-slate-700 p-2 rounded-lg text-slate-300 border border-slate-700 flex-1 truncate text-left"
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400">Absurd Failure Message:</label>
            <textarea
              rows={2}
              value={customErrorMsg}
              onChange={(e) => setCustomErrorMsg(e.target.value)}
              className="w-full mt-1 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-[#0052FF]"
            />
          </div>

          {/* Live Preview of Windows Dialog */}
          <div className="pt-4">
            <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
              Windows Error Dialog Live Preview:
            </div>
            <div className="bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-300 max-w-lg mx-auto">
              {/* Fake Windows Titlebar */}
              <div className="bg-slate-100 px-3 py-2 flex items-center justify-between border-b border-slate-200 select-none">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-red-600 rounded-full flex items-center justify-center text-white text-[9px] font-black">
                    ✕
                  </div>
                  <span className="font-semibold text-xs text-slate-700">{customErrorTitle}</span>
                </div>
                <div className="flex gap-2 text-slate-400 text-xs">
                  <span>–</span>
                  <span>□</span>
                  <span className="text-red-600 font-bold">✕</span>
                </div>
              </div>

              {/* Dialog Body */}
              <div className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertTriangle size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800 leading-snug">
                    {customErrorMsg}
                  </p>
                  <p className="text-[11px] text-slate-500 pt-1 font-mono">
                    Status Code: 0x80070057_MEME_OVERFLOW
                  </p>
                </div>
              </div>

              {/* Dialog Buttons */}
              <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() => {
                    sounds.playError();
                    alert('Fake crash report sent straight to Bill Gates!');
                  }}
                  className="px-4 py-1 rounded bg-[#0052FF] text-white text-xs font-medium hover:bg-blue-700"
                >
                  Send Fake Crash Dump
                </button>
                <button
                  onClick={() => {
                    sounds.playError();
                    onTriggerBsod();
                  }}
                  className="px-4 py-1 rounded bg-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-300"
                >
                  Give Up &amp; BSOD
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
