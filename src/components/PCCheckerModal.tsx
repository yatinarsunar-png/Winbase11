import React, { useState } from 'react';
import { sounds } from './SoundEffects';
import { SPEC_REQUIREMENTS } from '../data/historyData';
import { AlertCircle, CheckCircle2, XCircle, RefreshCw, X, ShieldAlert, Cpu } from 'lucide-react';

interface PCCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerBsod: () => void;
}

export const PCCheckerModal: React.FC<PCCheckerModalProps> = ({
  isOpen,
  onClose,
  onTriggerBsod,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [userCpu, setUserCpu] = useState('Intel Core i7-7700K (Still a Beast)');
  const [userRam, setUserRam] = useState('16 GB');

  const startScan = () => {
    sounds.playUsbInsert();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
      sounds.playError();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Parody Window Frame */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Titlebar */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700 select-none">
          <div className="flex items-center gap-2">
            <Cpu size={18} className="text-[#0052FF]" />
            <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              Winbase 11 PC Health Check (Potato Verdict Tool)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200">
          {!hasScanned && !isScanning && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/50 text-[#0052FF] rounded-2xl mx-auto flex items-center justify-center">
                <ShieldAlert size={36} />
              </div>
              <h2 className="text-xl font-bold">
                Is Your PC Blessed Enough to Run Winbase 11?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                This utility checks whether your CPU, motherboard, and motherboard manufacturer pass our arbitrary elitism standards.
              </p>

              {/* Fake specs selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-500">Select Your Processor:</label>
                  <select
                    value={userCpu}
                    onChange={(e) => setUserCpu(e.target.value)}
                    className="w-full mt-1 text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Intel Core i7-7700K (Still a Beast)">Intel Core i7-7700K (Deemed Ancient)</option>
                    <option value="AMD Ryzen 5 1600 (Faithful)">AMD Ryzen 1600 (TPM Rejected)</option>
                    <option value="Intel Celeron N4020 (College Laptop)">Intel Celeron (Weeping)</option>
                    <option value="Intel Core i9 14900KS (Sultan)">Intel Core i9 (Still Lacks Meme Aura)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">RAM Capacity:</label>
                  <select
                    value={userRam}
                    onChange={(e) => setUserRam(e.target.value)}
                    className="w-full mt-1 text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="8 GB">8 GB (Barely survives Word)</option>
                    <option value="16 GB">16 GB (Devoured by Edge)</option>
                    <option value="32 GB">32 GB (Enough for 3 Chrome tabs)</option>
                    <option value="64 GB">64 GB (Can launch Notepad AI)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={startScan}
                  className="bg-[#0052FF] hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all text-sm flex items-center gap-2 mx-auto"
                >
                  <RefreshCw size={16} />
                  Check Now (Guaranteed Rejection)
                </button>
              </div>
            </div>
          )}

          {isScanning && (
            <div className="text-center py-12 space-y-4">
              <RefreshCw size={44} className="animate-spin text-[#0052FF] mx-auto" />
              <p className="font-semibold text-base">Checking your laptop&apos;s dignity...</p>
              <p className="text-xs text-slate-500">Searching for TPM 2.0 under your mattress...</p>
            </div>
          )}

          {hasScanned && (
            <div className="space-y-5 animate-fadeIn">
              {/* Verdict Banner */}
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 flex items-start gap-3">
                <XCircle size={28} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-900 dark:text-red-300 text-base">
                    This PC DOES NOT MEET Winbase 11 requirements!
                  </h3>
                  <p className="text-xs text-red-700 dark:text-red-400 mt-1 leading-relaxed">
                    Even if your computer can render complex 3D scenes and calculate rocket trajectories, our judges determined your processor lacks &ldquo;TPM 2.0 Aura Certification&rdquo;.
                  </p>
                </div>
              </div>

              {/* Check results list */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Absurd Failure Breakdown:
                </h4>
                {SPEC_REQUIREMENTS.map((req, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {req.isPassing ? (
                          <CheckCircle2 size={14} className="text-emerald-500" />
                        ) : (
                          <XCircle size={14} className="text-red-500" />
                        )}
                        <span className="font-bold">{req.component}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 pl-5">
                        {req.memeReason}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        req.isPassing
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400'
                      }`}
                    >
                      {req.isPassing ? 'Passed (Miracle)' : 'REJECTED'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Humorous solutions */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs space-y-1 text-amber-900 dark:text-amber-300">
                <span className="font-bold flex items-center gap-1">
                  <AlertCircle size={14} /> Official Recommendations:
                </span>
                <p>
                  1. Purchase an expensive new laptop for every minor OS version bump.
                </p>
                <p>
                  2. Open Registry Editor, set <code className="bg-amber-200/60 dark:bg-amber-900/50 px-1 py-0.5 rounded">BypassTPMCheck = 1</code> like hundreds of millions of others.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  onClick={() => setHasScanned(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white underline"
                >
                  Retest Specifications
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onTriggerBsod();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  Protest &amp; Trigger BSOD Now!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
