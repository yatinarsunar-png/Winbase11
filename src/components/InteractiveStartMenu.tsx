import React, { useState, useEffect } from 'react';
import { WinbaseLogo } from './WinbaseLogo';
import { START_MENU_APPS } from '../data/historyData';
import { sounds } from './SoundEffects';
import {
  Search,
  Power,
  Volume2,
  VolumeX,
  Wifi,
  Battery,
  Calendar,
  Sparkles,
  Sliders,
  ExternalLink,
  Shield,
  Activity,
  AlertTriangle,
  Globe,
  Gamepad2,
  FileText,
  Settings,
  Terminal,
} from 'lucide-react';

interface StartMenuProps {
  onTriggerBsod: () => void;
  onOpenPcChecker: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const InteractiveStartMenu: React.FC<StartMenuProps> = ({
  onTriggerBsod,
  onOpenPcChecker,
  isMuted,
  onToggleMute,
  isDarkMode,
  onToggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPowerOptions, setShowPowerOptions] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setCurrentDate(
        now.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAppClick = (app: typeof START_MENU_APPS[0]) => {
    sounds.playClick();
    if (app.actionType === 'bsod') {
      setIsOpen(false);
      onTriggerBsod();
    } else if (app.actionType === 'soundboard') {
      setIsOpen(false);
      sounds.playStartup();
      const el = document.getElementById('soundboard');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (app.id === 'app-edge') {
      sounds.playError();
      alert('Microsoft Edge: "Thank you for opening me! Please don\'t navigate to Google Chrome..."');
    } else if (app.id === 'app-taskmgr') {
      sounds.playStartup();
      alert('Task Manager: "Process [Edge] is using 99.8% CPU. Would you like to End Task now?"');
    } else if (app.id === 'app-candy') {
      sounds.playUsbInsert();
      alert('Candy Crush Saga: "Level 420 unlocked! Please buy 100 lives for $4.99."');
    } else {
      sounds.playStartup();
      alert(`${app.name}: ${app.parodyDesc}`);
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Volume2':
        return <Volume2 size={22} className="text-[#0052FF]" />;
      case 'Globe':
        return <Globe size={22} className="text-sky-500" />;
      case 'Activity':
        return <Activity size={22} className="text-emerald-500" />;
      case 'AlertTriangle':
        return <AlertTriangle size={22} className="text-amber-500" />;
      case 'Gamepad2':
        return <Gamepad2 size={22} className="text-pink-500" />;
      case 'FileText':
        return <FileText size={22} className="text-blue-500" />;
      case 'Settings':
        return <Settings size={22} className="text-slate-500" />;
      case 'Sparkles':
        return <Sparkles size={22} className="text-purple-500" />;
      case 'Terminal':
        return <Terminal size={22} className="text-[#0052FF]" />;
      default:
        return <Sparkles size={22} className="text-blue-500" />;
    }
  };

  return (
    <>
      {/* Floating / Docked Windows 11 Start Menu Popover */}
      {isOpen && (
        <div
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/60 dark:border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-fadeIn"
          style={{ maxHeight: 'calc(100vh - 80px)' }}
        >
          {/* Search bar inside Start Menu */}
          <div className="p-6 pb-4 border-b border-slate-200/60 dark:border-slate-800">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Type to search (will inevitably open Bing in Edge)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0052FF]"
              />
            </div>
          </div>

          {/* Pinned Apps Header */}
          <div className="p-6 pt-4 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <span>Pinned Apps (Official Bloatware)</span>
              <button
                onClick={onOpenPcChecker}
                className="text-[#0052FF] dark:text-blue-400 font-semibold hover:underline capitalize"
              >
                Potato PC Check
              </button>
            </div>

            {/* Pinned Grid */}
            <div className="grid grid-cols-4 gap-3">
              {START_MENU_APPS.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app)}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-transform active:scale-95 group text-center relative"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/80 dark:border-slate-700 flex items-center justify-center group-hover:shadow group-hover:-translate-y-0.5 transition-all">
                    {getIconComponent(app.icon)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 mt-1.5 line-clamp-1">
                    {app.name}
                  </span>
                  {app.badge && (
                    <span className="absolute -top-1 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-[#0052FF] dark:text-blue-400">
                      {app.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Recommended Section (Parody Recent) */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Recommended (Algorithm Mandate)
              </div>
              <div className="space-y-1.5 text-xs">
                <div
                  onClick={() => {
                    sounds.playStartup();
                    alert('File: thesis_final_actual_v11_really_done.docx (Corrupted during render)');
                  }}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <FileText size={15} className="text-blue-500" />
                    <span>thesis_final_actual_v11.docx</span>
                  </div>
                  <span className="text-[10px] text-red-500 font-semibold">Corrupted during update</span>
                </div>
                <div
                  onClick={onOpenPcChecker}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Shield size={15} className="text-emerald-500" />
                    <span>PC_Health_Check_Verdict.txt</span>
                  </div>
                  <span className="text-[10px] text-slate-400">10 minutes ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* User & Power Footer */}
          <div className="p-4 bg-slate-100/80 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0052FF] text-white flex items-center justify-center font-bold text-xs shadow">
                WB
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Degen User 11
                </div>
                <div className="text-[10px] text-slate-500">Potato Administrator</div>
              </div>
            </div>

            {/* Power Button */}
            <div className="relative">
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowPowerOptions(!showPowerOptions);
                }}
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                title="Power Options"
              >
                <Power size={18} />
              </button>

              {showPowerOptions && (
                <div className="absolute right-0 bottom-12 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 space-y-1 text-xs z-50">
                  <button
                    onClick={() => {
                      sounds.playStartup();
                      setShowPowerOptions(false);
                      setIsOpen(false);
                      alert('Commencing mandatory 42-hour security patch...');
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Update & Restart (Forced)
                  </button>
                  <button
                    onClick={() => {
                      sounds.playError();
                      setShowPowerOptions(false);
                      setIsOpen(false);
                      onTriggerBsod();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/50 font-semibold text-red-600 dark:text-red-400"
                  >
                    Shut down with BSOD
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Docked Bento Windows 11 Taskbar */}
      <footer className="fixed bottom-0 w-full flex justify-center pb-2 z-40 pointer-events-none">
        <nav
          id="taskbar"
          className="h-13 w-fit max-w-[95vw] px-4 sm:px-6 bg-white/30 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/40 dark:border-white/15 rounded-2xl flex items-center gap-3 sm:gap-4 pointer-events-auto select-none shadow-[0_-5px_25px_rgba(0,0,0,0.15)]"
        >
          {/* Left: Weather Widget */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/60 px-2.5 py-1 rounded-xl cursor-pointer transition-colors">
            <span className="text-base">⛈️</span>
            <div className="leading-tight text-[11px]">
              <div className="font-semibold text-slate-900 dark:text-slate-100">89°F Stormy</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate max-w-[110px]">
                Celebrity Forgot PC Password!
              </div>
            </div>
          </div>

          {/* Center: Centered Windows 11 Taskbar Icons */}
          <div className="flex items-center gap-1.5 mx-auto">
            {/* The Winbase 11 Start Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsOpen(!isOpen);
              }}
              className={`p-2 rounded-xl transition-all duration-200 ${
                isOpen
                  ? 'bg-[#0052FF]/20 shadow-inner scale-95'
                  : 'hover:bg-white/40 dark:hover:bg-white/10 hover:scale-105'
              }`}
              title="Start (Winbase 11)"
            >
              <WinbaseLogo size="sm" showText={false} animated={false} />
            </button>

            {/* Quick taskbar pinned apps */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsOpen(!isOpen);
              }}
              className="p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:scale-105 transition-transform"
              title="Search"
            >
              <Search size={18} />
            </button>

            <button
              onClick={onOpenPcChecker}
              className="p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 text-emerald-600 dark:text-emerald-400 hover:scale-105 transition-transform"
              title="PC Health Check (Potato Verdict)"
            >
              <Shield size={18} />
            </button>

            <button
              onClick={() => {
                sounds.playError();
                alert('Edge: "Hello friend! I\'ve been waiting here all day for you!"');
              }}
              className="p-2 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 text-sky-500 hover:scale-105 transition-transform"
              title="Microsoft Edge (Faithfully Waiting)"
            >
              <Globe size={18} />
            </button>

            <button
              onClick={onTriggerBsod}
              className="p-2 rounded-xl hover:bg-red-500/20 text-red-500 hover:scale-105 transition-transform"
              title="Instant BSOD Panic Button"
            >
              <AlertTriangle size={18} />
            </button>
          </div>

          <div className="h-6 w-px bg-white/40 dark:bg-white/15 mx-1 hidden sm:block"></div>

          {/* Right: System Tray (Volume, Wifi, Clock) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mute toggle */}
            <button
              onClick={onToggleMute}
              className="p-1.5 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300"
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Wifi */}
            <div className="hidden sm:block text-slate-600 dark:text-slate-300">
              <Wifi size={15} />
            </div>

            {/* Clock & Date */}
            <div
              onClick={onToggleTheme}
              className="text-right px-2 py-1 rounded-xl hover:bg-white/40 dark:hover:bg-white/10 cursor-pointer text-slate-800 dark:text-slate-200 leading-none select-none"
              title="Click to toggle Light/Dark Mode"
            >
              <div className="text-[11px] font-bold">{currentTime || '12:00 PM'}</div>
              <div className="text-[9px] text-slate-500 dark:text-slate-400">{currentDate || '09/05/2026'}</div>
            </div>
          </div>
        </nav>
      </footer>
    </>
  );
};
