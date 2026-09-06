import React, { useState } from 'react';
import { MEME_FEATURES } from '../data/historyData';
import { sounds } from './SoundEffects';
import {
  MousePointerClick,
  Globe,
  RotateCw,
  Gamepad2,
  Bot,
  Lock,
  Layers,
  Sparkles,
  ExternalLink,
  Flame,
  ChevronRight,
} from 'lucide-react';

export const MemeFeatures: React.FC<{ onTriggerBsod: () => void }> = ({ onTriggerBsod }) => {
  // Interactive mini-states for feature demos
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [edgePleaActive, setEdgePleaActive] = useState(false);
  const [updateSpinnerText, setUpdateSpinnerText] = useState('100% Complete (Spinning Infinitely)');

  const iconMap: { [key: string]: React.ReactNode } = {
    MousePointerClick: <MousePointerClick size={24} />,
    Globe: <Globe size={24} />,
    RotateCw: <RotateCw size={24} />,
    Gamepad2: <Gamepad2 size={24} />,
    Bot: <Bot size={24} />,
    Lock: <Lock size={24} />,
  };

  return (
    <section id="fitur-absurd" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-[#0052FF] dark:text-blue-300 text-xs font-bold tracking-wide uppercase shadow-sm">
          <Layers size={14} />
          <span>Bento Grid Feature Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          &ldquo;Revolutionary&rdquo; Features <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-blue-500 to-indigo-600">
            Winbase 11 Edition
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Crafted in a sleek Bento Grid architecture to test human endurance and elevate digital patience to spiritual heights.
        </p>
      </div>

      {/* Bento Grid layout for Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MEME_FEATURES.map((feat, idx) => {
          // Bento layout spans: First item takes col-span-2 on desktop
          const isWide = idx === 0;

          return (
            <div
              key={feat.id}
              className={`${
                isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
              } bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Icon & Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-[#0052FF] dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    {iconMap[feat.iconName] || <Sparkles size={24} />}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                    {feat.memeTag}
                  </span>
                </div>

                {/* Titles */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <h4 className="text-xs font-bold text-[#0052FF] dark:text-blue-400 mb-3 tracking-wide">
                  {feat.parodyTitle}
                </h4>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {feat.description}
                </p>
              </div>

              {/* Suffering Meter & Real World Impact */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Frustration Index:</span>
                  <span className="text-red-500 font-mono font-bold flex items-center gap-1">
                    <Flame size={13} /> {feat.userSufferingScore}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                  {feat.realWorldImpact}
                </p>

                {/* Interactive Demos */}
                {feat.id === 'feat-1' && (
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setShowMoreMenu(!showMoreMenu);
                      }}
                      className="w-full text-xs py-2 px-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0052FF] hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {showMoreMenu ? 'Close Menu' : 'Simulate Windows 11 Two-Tiered Right-Click'}
                    </button>
                    {showMoreMenu && (
                      <div className="mt-2 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl text-xs space-y-1.5 animate-fadeIn">
                        <div className="text-slate-400 px-2 py-0.5 text-[10px] font-mono">Cut / Copy / Rename Icons Bar</div>
                        <div className="px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Open with Notepad (Laggy)</div>
                        <div className="px-2 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Send to Bluetooth (Never Used)</div>
                        <div
                          onClick={() => {
                            sounds.playStartup();
                            alert('Congratulations! You discovered the hidden WinRAR & 7-Zip buttons Microsoft concealed!');
                          }}
                          className="px-3 py-2 bg-[#0052FF] text-white font-bold rounded-xl cursor-pointer flex items-center justify-between shadow"
                        >
                          <span>Show more options (Shift + F10)</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {feat.id === 'feat-2' && (
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        setEdgePleaActive(!edgePleaActive);
                      }}
                      className="w-full text-xs py-2 px-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0052FF] hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Try Searching &ldquo;Download Chrome&rdquo;
                    </button>
                    {edgePleaActive && (
                      <div className="mt-2 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/60 shadow-lg text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
                        <p className="font-bold mb-1">🥺 Microsoft Edge Pleading:</p>
                        <p className="text-[11px] leading-relaxed">&ldquo;Wait! Edge saves 0.003% RAM and we have discount coupons for flip-flops! Please don't install Chrome!&rdquo;</p>
                        <button
                          onClick={() => {
                            sounds.playUsbInsert();
                            setEdgePleaActive(false);
                          }}
                          className="mt-2 text-[10px] font-bold bg-[#0052FF] text-white px-3 py-1.5 rounded-lg hover:bg-blue-600"
                        >
                          Download Chrome Anyway (Sorry Edge)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {feat.id === 'feat-3' && (
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => {
                        sounds.playStartup();
                        setUpdateSpinnerText('100% Complete (Waiting 45 More Minutes...)');
                      }}
                      className="w-full text-xs py-2 px-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0052FF] hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <RotateCw size={14} className="animate-spin" />
                      <span>{updateSpinnerText}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
