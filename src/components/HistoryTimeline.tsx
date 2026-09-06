import React, { useState } from 'react';
import { HISTORY_TIMELINE } from '../data/historyData';
import { HistoryEra } from '../types';
import { sounds } from './SoundEffects';
import {
  Calendar,
  Sparkles,
  Quote,
  ChevronDown,
  ChevronUp,
  Flame,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export const HistoryTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>('era-2021-tpm');
  const [reactions, setReactions] = useState<{ [key: string]: { facepalm: number; skull: number; laugh: number } }>(
    () => {
      const initial: { [key: string]: { facepalm: number; skull: number; laugh: number } } = {};
      HISTORY_TIMELINE.forEach((era) => {
        initial[era.id] = { ...era.reactions };
      });
      return initial;
    }
  );
  const [copiedQuoteId, setCopiedQuoteId] = useState<string | null>(null);

  const handleReaction = (eraId: string, type: 'facepalm' | 'skull' | 'laugh') => {
    sounds.playClick();
    setReactions((prev) => ({
      ...prev,
      [eraId]: {
        ...prev[eraId],
        [type]: prev[eraId][type] + 1,
      },
    }));
  };

  const copyQuote = (quote: string, id: string) => {
    sounds.playStartup();
    navigator.clipboard?.writeText(quote);
    setCopiedQuoteId(id);
    setTimeout(() => setCopiedQuoteId(null), 2000);
  };

  const filteredEras = HISTORY_TIMELINE.filter((era) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'legacy' && (era.id === 'era-2015' || era.id === 'era-2021-leak')) return true;
    if (selectedCategory === 'hardware' && era.id === 'era-2021-tpm') return true;
    if (selectedCategory === 'ui' && (era.id === 'era-2021-release' || era.id === 'era-2022-edge')) return true;
    if (selectedCategory === 'ai' && (era.id === 'era-2023-ai' || era.id === 'era-2024-recall')) return true;
    if (selectedCategory === 'winbase' && era.id === 'era-2025-winbase') return true;
    return true;
  });

  return (
    <section id="sejarah" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 text-[#0052FF] text-xs font-bold tracking-wide uppercase">
          <Sparkles size={14} />
          <span>Official Parody Archives</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Chronicles of Windows 11 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] to-sky-500">
            Documented Entirely Through Memes
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          From the solemn oath &ldquo;Windows 10 is the final version&rdquo; to the TPM 2.0 chip drama and two-tiered right-click menus. Witness the metamorphosis into the Winbase 11 era!
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {[
            { id: 'all', label: 'All Eras (2015 - 2026)' },
            { id: 'legacy', label: 'Broken Vows & Dark Leaks' },
            { id: 'hardware', label: 'TPM 2.0 Inquisitions' },
            { id: 'ui', label: 'UI Calamity & Edge Pleas' },
            { id: 'ai', label: 'AI Invasions & Recall' },
            { id: 'winbase', label: 'Birth of Winbase 11' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setSelectedCategory(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#0052FF] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative">
        {/* Central Vertical Spine */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 bottom-12 w-0.5 bg-gradient-to-b from-[#0052FF] via-blue-400 to-transparent" />

        <div className="space-y-12">
          {filteredEras.map((era, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedCard === era.id;
            const currentReactions = reactions[era.id] || era.reactions;

            return (
              <div
                key={era.id}
                className={`relative flex flex-col md:flex-row items-center ${
                  isLeft ? 'md:flex-row-reverse' : ''
                } gap-6 md:gap-12`}
              >
                {/* Timeline Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-[#0052FF] shadow-lg items-center justify-center z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0052FF] animate-pulse" />
                </div>

                {/* Content Card (Half width on desktop) */}
                <div className="w-full md:w-1/2">
                  <div
                    className={`rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                      era.id === 'winbase-11'
                        ? 'bg-gradient-to-br from-blue-500/20 via-white/90 to-indigo-600/20 dark:from-blue-950/50 dark:via-slate-900/90 dark:to-indigo-950/50 border-2 border-[#0052FF] shadow-2xl'
                        : era.id === 'tpm-gate-2021'
                        ? 'bg-gradient-to-br from-orange-500/15 via-white/85 to-red-500/15 dark:from-orange-950/40 dark:via-slate-900/85 dark:to-red-950/40 border-2 border-orange-400/60 dark:border-orange-500/50 shadow-xl'
                        : era.severityLevel === 'Legendary'
                        ? 'bg-gradient-to-br from-blue-500/10 via-white/85 to-blue-50/70 dark:from-blue-900/30 dark:via-slate-900/85 dark:to-slate-900/90 border border-blue-400 dark:border-blue-500 shadow-xl'
                        : 'bg-white/85 dark:bg-slate-900/85 border border-white/50 dark:border-white/10 shadow-xl hover:shadow-2xl'
                    }`}
                  >
                    {/* Top Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0052FF] text-white">
                          <Calendar size={12} />
                          {era.year}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            era.severityLevel === 'Legendary'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                              : era.severityLevel === 'Tragedy'
                              ? 'bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {era.badge}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        Level: <span className="font-bold text-slate-700 dark:text-slate-200">{era.severityLevel}</span>
                      </span>
                    </div>

                    {/* Title & Parody Headline */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                      {era.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#0052FF] dark:text-blue-400 mt-1 mb-3">
                      {era.parodyHeadline}
                    </p>

                    {/* Narrative Description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      {era.description}
                    </p>

                    {/* Quote Box */}
                    <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 relative group">
                      <div className="flex items-start gap-2.5">
                        <Quote size={18} className="text-[#0052FF] shrink-0 mt-0.5 opacity-80" />
                        <div className="text-xs sm:text-sm italic text-slate-700 dark:text-slate-200 leading-normal">
                          {era.memeQuote}
                          <div className="text-[11px] not-italic font-semibold text-slate-400 dark:text-slate-500 mt-1">
                            — {era.authorQuote}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => copyQuote(era.memeQuote, era.id)}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white border border-slate-200 dark:border-slate-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Copy Meme Quote"
                      >
                        {copiedQuoteId === era.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      </button>
                    </div>

                    {/* Expandable Key Events */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/80 space-y-2 animate-fadeIn">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Field Incident Log:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {era.keyEvents.map((event, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="text-[#0052FF] shrink-0 mt-0.5" />
                              <span>{event}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer with Toggle & Reaction Buttons */}
                    <div className="mt-5 pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-700/50">
                      <button
                        onClick={() => {
                          sounds.playClick();
                          setExpandedCard(isExpanded ? null : era.id);
                        }}
                        className="text-xs font-semibold text-[#0052FF] dark:text-blue-400 flex items-center gap-1 hover:underline"
                      >
                        {isExpanded ? (
                          <>
                            Hide Incident Log <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            View Incident Log <ChevronDown size={14} />
                          </>
                        )}
                      </button>

                      {/* Interactive Meme Reactions */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleReaction(era.id, 'facepalm')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                          title="Facepalm"
                        >
                          <span>🤦‍♂️</span>
                          <span className="text-[11px] font-mono">{currentReactions.facepalm}</span>
                        </button>
                        <button
                          onClick={() => handleReaction(era.id, 'skull')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                          title="Dead / Skull"
                        >
                          <span>💀</span>
                          <span className="text-[11px] font-mono">{currentReactions.skull}</span>
                        </button>
                        <button
                          onClick={() => handleReaction(era.id, 'laugh')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 hover:bg-blue-100 dark:hover:bg-blue-950/40 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                          title="Laughing Out Loud"
                        >
                          <span>😂</span>
                          <span className="text-[11px] font-mono">{currentReactions.laugh}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for the other half on desktop */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
