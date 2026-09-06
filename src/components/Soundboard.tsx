import React, { useState, useEffect } from 'react';
import { sounds } from './SoundEffects';
import {
  Volume2,
  VolumeX,
  Play,
  Flame,
  Radio,
  Disc,
  HardDrive,
  AlertOctagon,
  BellRing,
  Sparkles,
  Zap,
  Sliders,
  Share2,
  ShieldAlert,
  Bot,
  Skull,
  HelpCircle,
  Headphones,
} from 'lucide-react';

interface SoundItem {
  id: string;
  name: string;
  subtitle: string;
  era: string;
  category: 'boot' | 'panic' | 'hardware' | 'modern';
  tag: string;
  tagColor: string;
  icon: React.ReactNode;
  duration: string;
  description: string;
  play: () => void;
}

interface SoundboardProps {
  onTriggerBsod?: (reason?: string) => void;
}

export const Soundboard: React.FC<SoundboardProps> = ({ onTriggerBsod }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'boot' | 'panic' | 'hardware' | 'modern'>('all');
  const [isLoFi, setIsLoFi] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [activeSoundCounter, setActiveSoundCounter] = useState(0);
  const [copiedSoundId, setCopiedSoundId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = sounds.subscribe((playing, count) => {
      setIsPlaying(playing);
      setActiveSoundCounter(count);
      if (!playing) {
        setCurrentPlayingId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleLoFi = () => {
    sounds.playClick();
    const nextVal = !isLoFi;
    sounds.isLoFi = nextVal;
    setIsLoFi(nextVal);
  };

  const handlePlaySound = (sound: SoundItem) => {
    sounds.playClick();
    setCurrentPlayingId(sound.id);
    sound.play();
  };

  const handleChaosCascade = () => {
    sounds.playClick();
    setCurrentPlayingId('chaos');
    // Cascade 3 error sounds in rapid sequence
    setTimeout(() => sounds.playCriticalStop(), 100);
    setTimeout(() => sounds.playExclamation(), 600);
    setTimeout(() => sounds.playError(), 1200);
    setTimeout(() => sounds.playTpmFail(), 1800);
    setTimeout(() => {
      if (onTriggerBsod) {
        onTriggerBsod('SOUNDBOARD_CASCADE_OVERLOAD_EXCEPTION');
      }
    }, 2600);
  };

  const soundList: SoundItem[] = [
    // Boot & Jingle
    {
      id: 'win11-startup',
      name: 'Winbase 11 Bloom Chime',
      subtitle: 'Gentle chord with 420GB baggage',
      era: 'Modern (2021-2026)',
      category: 'boot',
      tag: 'Ethereal',
      tagColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300',
      icon: <Sparkles className="text-[#0052FF]" size={20} />,
      duration: '3.5s',
      description: 'The soothing, deceptive five-note harp chord that plays right before OneDrive starts uploading your entire C: drive.',
      play: () => sounds.playStartup(),
    },
    {
      id: 'xp-startup',
      name: 'Windows XP Bliss Sunrise',
      subtitle: 'The euphoric Bliss wallpaper hymn',
      era: 'Legendary (2001)',
      category: 'boot',
      tag: 'Iconic Nostalgia',
      tagColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300',
      icon: <Flame className="text-emerald-600 dark:text-emerald-400" size={20} />,
      duration: '4.2s',
      description: 'The iconic ascending brass chord (Eb-Bb-Ab-Eb) that welcomed millions to CRT monitors and 3D Pinball Space Cadet.',
      play: () => sounds.playXpStartup(),
    },
    {
      id: '95-startup',
      name: 'Windows 95 Brian Eno Ambient',
      subtitle: 'The 3.2-second orchestral universe',
      era: 'Vintage (1995)',
      category: 'boot',
      tag: 'Synthesizer Art',
      tagColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
      icon: <Radio className="text-amber-600 dark:text-amber-400" size={20} />,
      duration: '4.6s',
      description: 'Commissioned by Microsoft and created on a Mac by ambient pioneer Brian Eno with 83 distinct audio adjectives.',
      play: () => sounds.play95Startup(),
    },
    {
      id: 'xp-shutdown',
      name: 'Windows XP Melancholic Goodbye',
      subtitle: 'Bedtime for millenials',
      era: 'Nostalgic (2001)',
      category: 'boot',
      tag: 'Sweet Slumber',
      tagColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300',
      icon: <Headphones className="text-indigo-500" size={20} />,
      duration: '2.8s',
      description: 'The sorrowful descending 4-note lullaby right before the orange screen declared: "It is now safe to turn off your computer."',
      play: () => sounds.playXpShutdown(),
    },

    // Panic & System Errors
    {
      id: 'critical-stop',
      name: 'Critical Stop "DUNNN!" Chord',
      subtitle: 'The definitive workplace heart attack',
      era: 'Timeless (95/XP/10/11)',
      category: 'panic',
      tag: 'Pure Terror',
      tagColor: 'bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300',
      icon: <AlertOctagon className="text-red-600 dark:text-red-400" size={20} />,
      duration: '0.7s',
      description: 'The dissonant tritone gong that plays when you click "Save As" and your 40-page dissertation instantly ceases to exist.',
      play: () => sounds.playCriticalStop(),
    },
    {
      id: 'bsod-screech',
      name: 'BSOD Fatal Death Wail',
      subtitle: 'Audio flatline of modern tech',
      era: 'All Generations',
      category: 'panic',
      tag: 'Fatal Error',
      tagColor: 'bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300',
      icon: <Skull className="text-red-500" size={20} />,
      duration: '0.5s',
      description: 'A descending buzzsaw tone replicating the exact frequency of an operating system giving up its digital ghost.',
      play: () => sounds.playError(),
    },
    {
      id: 'exclamation-ding',
      name: 'Windows Exclamation "Ding!"',
      subtitle: 'The high-pitch passive aggressive ping',
      era: 'Classic (98-XP)',
      category: 'panic',
      tag: 'Passive Aggressive',
      tagColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
      icon: <BellRing className="text-amber-500" size={20} />,
      duration: '0.9s',
      description: 'Synthesized metallic bell that rings repeatedly when you mash Enter on a dialog box that refuses to dismiss.',
      play: () => sounds.playExclamation(),
    },
    {
      id: 'tpm-fail',
      name: 'TPM 2.0 Incompatible Buzzer',
      subtitle: 'Your $3,000 PC is now electronic waste',
      era: 'Modern Outrage (2021)',
      category: 'panic',
      tag: 'Arbitrary Rejection',
      tagColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300',
      icon: <ShieldAlert className="text-rose-500" size={20} />,
      duration: '0.7s',
      description: 'The visceral double-buzzer tone generated when Microsoft Health Check scans your perfectly capable 7th Gen Core i7.',
      play: () => sounds.playTpmFail(),
    },

    // Hardware Screams & Relics
    {
      id: 'modem-56k',
      name: '56k Dial-Up Modem Handshake',
      subtitle: 'Dialing ISP with static screeches',
      era: 'Golden Era (1998)',
      category: 'hardware',
      tag: 'Ear-Splitting Magic',
      tagColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/70 dark:text-cyan-300',
      icon: <Radio className="text-cyan-600 dark:text-cyan-400" size={20} />,
      duration: '3.5s',
      description: 'Authentic synthesis of dual-tone telephone dialing, ultrasonic carrier chirps, and white-noise modem negotiation.',
      play: () => sounds.playDialup(),
    },
    {
      id: 'floppy-seek',
      name: '3.5" Floppy Stepper Clack',
      subtitle: 'Reading A:\\DISK1.IMG at 12 KB/s',
      era: 'Mechanical (1990s)',
      category: 'hardware',
      tag: 'Mechanical Click',
      tagColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
      icon: <Disc className="text-slate-600 dark:text-slate-300" size={20} />,
      duration: '0.9s',
      description: 'The rhythmic square-wave buzz and clacking stepper motor grinding across a 1.44 MB magnetic diskette.',
      play: () => sounds.playFloppyDrive(),
    },
    {
      id: 'hdd-grind',
      name: 'Mechanical HDD Sector Grind',
      subtitle: 'Windows Search indexing your 5400 RPM drive',
      era: 'Mechanical (2000-2015)',
      category: 'hardware',
      tag: 'Disk Thrashing',
      tagColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
      icon: <HardDrive className="text-slate-600 dark:text-slate-300" size={20} />,
      duration: '1.1s',
      description: 'The distinct sound of an actuator arm thrashing frantically across magnetic platters during a surprise background update.',
      play: () => sounds.playHardDriveGrind(),
    },
    {
      id: 'usb-plug',
      name: 'USB Device Insert Chime',
      subtitle: 'Flipped 3 times before entering',
      era: 'Modern Universal',
      category: 'hardware',
      tag: 'Peripheral',
      tagColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300',
      icon: <Zap className="text-blue-500" size={20} />,
      duration: '0.35s',
      description: 'The happy ascending two-tone jingle confirming you finally aligned the USB-A port properly on the third attempt.',
      play: () => sounds.playUsbInsert(),
    },
    {
      id: 'usb-remove',
      name: 'USB Unexpected Eject Ding',
      subtitle: '"Safely Remove Hardware" was ignored',
      era: 'Modern Universal',
      category: 'hardware',
      tag: 'Reckless Pull',
      tagColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/70 dark:text-orange-300',
      icon: <Zap className="text-orange-500" size={20} />,
      duration: '0.35s',
      description: 'The slightly guilt-inducing descending tones when you yank out a thumb drive without clicking Safely Remove Hardware in the tray.',
      play: () => sounds.playUsbRemove(),
    },

    // Modern Bloatware & Desperation
    {
      id: 'edge-whimper',
      name: 'Edge "Sad Trombone" Whimper',
      subtitle: '"Please don\'t download Google Chrome!"',
      era: 'Modern Desperation',
      category: 'modern',
      tag: 'Begging Algorithm',
      tagColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300',
      icon: <HelpCircle className="text-sky-500" size={20} />,
      duration: '2.0s',
      description: 'A mournful synthesized sliding trombone riff that plays as Edge notices you typing "chrome.exe" into Bing.',
      play: () => sounds.playEdgePlea(),
    },
    {
      id: 'uac-shield',
      name: 'UAC Administrator Screen Dim',
      subtitle: '"Do you want to allow this app to change your life?"',
      era: 'Vista to Win11',
      category: 'modern',
      tag: 'Secure Desktop Dim',
      tagColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
      icon: <ShieldAlert className="text-amber-500" size={20} />,
      duration: '0.6s',
      description: 'The ominous security gong that freezes your entire screen into pitch-black dimness to ask for admin consent on Notepad.',
      play: () => sounds.playUacAlert(),
    },
    {
      id: 'notepad-ai-glitch',
      name: 'Notepad AI Overheat Glitch',
      subtitle: 'Why does plain text need 12 billion parameters?',
      era: '2024-2026',
      category: 'modern',
      tag: 'Unsolicited AI',
      tagColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300',
      icon: <Bot className="text-purple-500" size={20} />,
      duration: '0.8s',
      description: 'A chaotic square-wave digital freakout symbolizing the raw GPU wattage consumed while writing a grocery list in Notepad.',
      play: () => sounds.playNotepadAi(),
    },
  ];

  const filteredSounds = soundList.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleCopyMeme = (sound: SoundItem) => {
    sounds.playClick();
    const text = `🔊 [Winbase 11 Soundboard] ${sound.name} (${sound.duration}): ${sound.description}`;
    navigator.clipboard?.writeText(text);
    setCopiedSoundId(sound.id);
    setTimeout(() => setCopiedSoundId(null), 2000);
  };

  return (
    <section id="soundboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 text-[#0052FF] dark:text-blue-300 text-xs font-bold tracking-wide uppercase shadow-sm">
          <Headphones size={14} />
          <span>Interactive Audio Synthesizer</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          The Low-Bit Parody <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052FF] via-indigo-500 to-sky-400">
            Windows Soundboard
          </span>
        </h2>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Synthesized live through the Web Audio API with zero external audio assets. Click any tile to relive the trauma of forced reboots, dial-up handshakes, and iconic vintage jingles.
        </p>

        {/* Master Audio Controller Toolbar */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          {/* Beige Lo-Fi Filter Toggle */}
          <button
            onClick={toggleLoFi}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-bold transition-all shadow-sm ${
              isLoFi
                ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/50 ring-2 ring-amber-500/30'
                : 'bg-white/70 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
            }`}
            title="Simulate a 1998 tinny beige PC speaker with bandpass distortion"
          >
            <Sliders size={15} />
            <span>1998 Beige Speaker Filter (Lo-Fi):</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold ${
                isLoFi ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              {isLoFi ? 'ACTIVE CRUNCH' : 'OFF (CRISP)'}
            </span>
          </button>

          {/* Panic Cascade Button */}
          <button
            onClick={handleChaosCascade}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-600 dark:text-red-400 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Play rapid error cascade ending in an unhandled exception BSOD"
          >
            <Flame size={15} />
            <span>Cascade Error Chaos Mode</span>
          </button>

          {/* Realtime Audio Equalizer Visualizer */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Audio Bus:</span>
            <div className="flex items-end gap-1 h-4 w-12">
              <span
                className={`w-1.5 rounded-full bg-[#0052FF] transition-all duration-100 ${
                  isPlaying ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'
                }`}
              />
              <span
                className={`w-1.5 rounded-full bg-indigo-500 transition-all duration-150 ${
                  isPlaying ? 'h-3.5 animate-bounce' : 'h-1.5 opacity-40'
                }`}
              />
              <span
                className={`w-1.5 rounded-full bg-cyan-400 transition-all duration-75 ${
                  isPlaying ? 'h-4 animate-pulse' : 'h-1.5 opacity-40'
                }`}
              />
              <span
                className={`w-1.5 rounded-full bg-emerald-500 transition-all duration-200 ${
                  isPlaying ? 'h-2.5 animate-bounce' : 'h-1.5 opacity-40'
                }`}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 ml-1">
              {activeSoundCounter > 0 ? `${activeSoundCounter} Active` : 'Idle'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Sounds (15)' },
          { id: 'boot', label: 'Boot & Jingles' },
          { id: 'panic', label: 'Panic & Crashes' },
          { id: 'hardware', label: 'Vintage Hardware' },
          { id: 'modern', label: 'Modern Bloatware' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sounds.playClick();
              setActiveCategory(tab.id as any);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === tab.id
                ? 'bg-[#0052FF] text-white shadow-md shadow-blue-500/25 scale-105'
                : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sound Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSounds.map((sound) => {
          const isCurrentlyPlaying = currentPlayingId === sound.id && isPlaying;
          return (
            <div
              key={sound.id}
              className={`group relative p-5 rounded-3xl backdrop-blur-xl border transition-all duration-200 flex flex-col justify-between ${
                isCurrentlyPlaying
                  ? 'bg-blue-50/90 dark:bg-blue-950/40 border-[#0052FF] ring-2 ring-[#0052FF]/30 shadow-2xl scale-[1.02]'
                  : 'bg-white/70 dark:bg-slate-900/70 border-white/50 dark:border-white/10 hover:border-blue-400/60 dark:hover:border-blue-500/50 hover:shadow-xl shadow-sm'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-2xl transition-transform group-hover:scale-110 ${
                        isCurrentlyPlaying
                          ? 'bg-[#0052FF] text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {sound.icon}
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sound.tagColor}`}>
                        {sound.tag}
                      </span>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        {sound.era}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                      {sound.duration}
                    </span>
                    <button
                      onClick={() => handleCopyMeme(sound)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Copy sound quote & details"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Sound Title & Subtitle */}
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight group-hover:text-[#0052FF] transition-colors">
                  {sound.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                  {sound.subtitle}
                </p>

                {/* Satirical Description */}
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                  {sound.description}
                </p>
              </div>

              {/* Play Action Trigger */}
              <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[11px] font-bold text-slate-400">
                  {copiedSoundId === sound.id ? (
                    <span className="text-emerald-500 font-semibold animate-fadeIn">Copied!</span>
                  ) : (
                    <span>Web Audio Synth</span>
                  )}
                </div>

                <button
                  onClick={() => handlePlaySound(sound)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    isCurrentlyPlaying
                      ? 'bg-[#0052FF] text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#0052FF] dark:hover:bg-[#0052FF] dark:hover:text-white'
                  }`}
                >
                  <Play size={13} className={isCurrentlyPlaying ? 'animate-spin' : ''} />
                  <span>{isCurrentlyPlaying ? 'Playing...' : 'Play Sound'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Retro PC Speaker Educational Note */}
      <div className="mt-12 p-5 rounded-3xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shrink-0 shadow-sm">
            <Radio size={20} className="text-[#0052FF]" />
          </div>
          <p className="leading-relaxed">
            <strong className="text-slate-900 dark:text-white">Did you know?</strong> Early PC audio was generated by a tiny magnetic square-wave buzzer attached to the motherboard. It was physically incapable of playing multiple tones at once, leading to the frantic arpeggiated beeps of 90s DOS gaming!
          </p>
        </div>
        <button
          onClick={() => {
            sounds.playCriticalStop();
            if (onTriggerBsod) {
              onTriggerBsod('AUDIOPHILE_PARODY_TRIGGERED');
            }
          }}
          className="shrink-0 px-4 py-2 rounded-xl text-red-500 hover:bg-red-500/10 font-bold border border-red-500/20 transition-colors text-xs"
        >
          Overclock Audio to BSOD
        </button>
      </div>
    </section>
  );
};
