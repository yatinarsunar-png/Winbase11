// Web Audio API Synthesizer for Windows 11 / Winbase 11 Sound Effects
// Works 100% client-side without any external MP3/WAV files!

class SoundSystem {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isLoFi: boolean = false;
  private activeCount: number = 0;
  private listeners: Set<(isPlaying: boolean, count: number) => void> = new Set();

  private notify() {
    this.listeners.forEach((cb) => cb(this.activeCount > 0, this.activeCount));
  }

  public subscribe(cb: (isPlaying: boolean, count: number) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Route output node through master bus with optional Lo-Fi / Beige Speaker filter
  private routeToOutput(node: AudioNode, gainVal = 0.15): GainNode | null {
    if (!this.ctx) return null;

    const masterGain = this.ctx.createGain();
    masterGain.gain.value = gainVal;

    if (this.isLoFi) {
      // Vintage 1998 PC Speaker filter: bandpass + mild overdrive
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 1800;
      bandpass.Q.value = 1.2;

      // Distortion curve
      const shaper = this.ctx.createWaveShaper();
      shaper.curve = this.makeDistortionCurve(18);
      shaper.oversample = 'none';

      node.connect(shaper);
      shaper.connect(bandpass);
      bandpass.connect(masterGain);
    } else {
      node.connect(masterGain);
    }

    masterGain.connect(this.ctx.destination);
    return masterGain;
  }

  private makeDistortionCurve(amount = 20) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  private markPlaying(durationSec: number) {
    this.activeCount++;
    this.notify();
    setTimeout(() => {
      this.activeCount = Math.max(0, this.activeCount - 1);
      this.notify();
    }, durationSec * 1000);
  }

  // 1. Windows 11 Startup Chime Parody (Gentle ethereal warm bloom)
  playStartup() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [
        { freq: 329.63, delay: 0.0, duration: 2.0 }, // E4
        { freq: 440.0, delay: 0.15, duration: 2.2 }, // A4
        { freq: 554.37, delay: 0.35, duration: 2.5 }, // C#5
        { freq: 659.25, delay: 0.55, duration: 2.8 }, // E5
        { freq: 880.0, delay: 0.75, duration: 3.2 }, // A5
      ];

      notes.forEach(({ freq, delay, duration }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

        osc.connect(gain);
        this.routeToOutput(gain, 1.0);

        osc.start(now + delay);
        osc.stop(now + delay + duration);
      });
      this.markPlaying(3.5);
    } catch {}
  }

  // 2. Windows XP Startup Chime Parody (Iconic euphoric ascending chord Eb-Bb-Ab-Eb)
  playXpStartup() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Synthesize string/pad + bell chime of XP
      const chords = [
        { freqs: [155.56, 311.13], delay: 0.0, dur: 2.6 }, // Eb3, Eb4
        { freqs: [233.08, 466.16], delay: 0.35, dur: 2.4 }, // Bb3, Bb4
        { freqs: [207.65, 415.3], delay: 0.7, dur: 2.2 }, // Ab3, Ab4
        { freqs: [311.13, 622.25, 932.33], delay: 1.05, dur: 3.2 }, // Eb4, Eb5, Bb5 (Final euphoric resolve)
      ];

      chords.forEach(({ freqs, delay, dur }) => {
        freqs.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + delay);

          gain.gain.setValueAtTime(0.001, now + delay);
          gain.gain.linearRampToValueAtTime(0.09, now + delay + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

          osc.connect(gain);
          this.routeToOutput(gain, 0.9);

          osc.start(now + delay);
          osc.stop(now + delay + dur);
        });
      });
      this.markPlaying(4.2);
    } catch {}
  }

  // 3. Windows 95 Startup Parody (Brian Eno's 3.2-second slow ambient orchestral wash)
  play95Startup() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const layers = [
        { freq: 138.59, delay: 0, dur: 3.8, type: 'sawtooth' as OscillatorType, vol: 0.04 }, // Db3
        { freq: 277.18, delay: 0.2, dur: 3.6, type: 'sine' as OscillatorType, vol: 0.07 }, // Db4
        { freq: 415.3, delay: 0.5, dur: 3.4, type: 'triangle' as OscillatorType, vol: 0.06 }, // Ab4
        { freq: 554.37, delay: 0.8, dur: 3.2, type: 'sine' as OscillatorType, vol: 0.08 }, // Db5
        { freq: 622.25, delay: 1.2, dur: 3.0, type: 'sine' as OscillatorType, vol: 0.07 }, // Eb5
        { freq: 830.61, delay: 1.6, dur: 3.2, type: 'sine' as OscillatorType, vol: 0.06 }, // Ab5
      ];

      layers.forEach(({ freq, delay, dur, type, vol }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(vol, now + delay + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain);
        this.routeToOutput(gain, 1.0);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
      this.markPlaying(4.6);
    } catch {}
  }

  // 4. Windows XP Shutdown Melancholy Chime (Descending 4-note chord)
  playXpShutdown() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [
        { freq: 622.25, delay: 0.0, dur: 0.8 }, // Eb5
        { freq: 466.16, delay: 0.28, dur: 0.9 }, // Bb4
        { freq: 415.3, delay: 0.56, dur: 1.1 }, // Ab4
        { freq: 311.13, delay: 0.84, dur: 2.0 }, // Eb4 (Sad goodbye)
      ];

      notes.forEach(({ freq, delay, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.001, now + delay);
        gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain);
        this.routeToOutput(gain, 0.9);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
      this.markPlaying(2.8);
    } catch {}
  }

  // 5. Windows Critical Stop / "DUNNN!" Chord (The definitive Windows jump scare)
  playCriticalStop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Famous dissonant low chord (C# / G tritone clash)
      const freqs = [110, 155.56, 220, 311.13];

      freqs.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.94, now + 0.45);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        this.routeToOutput(gain, 1.1);

        osc.start(now);
        osc.stop(now + 0.55);
      });
      this.markPlaying(0.7);
    } catch {}
  }

  // 6. Windows Exclamation / "Ding!" (Windows 98 / 2000 / XP)
  playExclamation() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05); // Snap up to A6

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      this.routeToOutput(gain, 1.0);

      osc.start(now);
      osc.stop(now + 0.8);
      this.markPlaying(0.9);
    } catch {}
  }

  // 7. Critical Error Buzz (BSOD screech)
  playError() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.4);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      this.routeToOutput(gain, 1.0);

      osc.start(now);
      osc.stop(now + 0.45);
      this.markPlaying(0.5);
    } catch {}
  }

  // 8. USB Plug In Chime
  playUsbInsert() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [
        { freq: 523.25, delay: 0, dur: 0.12 }, // C5
        { freq: 659.25, delay: 0.1, dur: 0.18 }, // E5
      ];

      notes.forEach(({ freq, delay, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.08, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);
        osc.connect(gain);
        this.routeToOutput(gain, 1.0);
        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
      this.markPlaying(0.35);
    } catch {}
  }

  // 9. USB Disconnect Chime
  playUsbRemove() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [
        { freq: 659.25, delay: 0, dur: 0.12 }, // E5
        { freq: 523.25, delay: 0.1, dur: 0.18 }, // C5
      ];

      notes.forEach(({ freq, delay, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.08, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);
        osc.connect(gain);
        this.routeToOutput(gain, 1.0);
        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
      this.markPlaying(0.35);
    } catch {}
  }

  // 10. 56k Dial-up Modem Handshake (Dial tone, DTMF tones, carrier screech & static hiss)
  playDialup() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Dial tone (350Hz + 440Hz)
      const dialTones = [350, 440];
      dialTones.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.setValueAtTime(0.04, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
        osc.connect(gain);
        this.routeToOutput(gain, 0.9);
        osc.start(now);
        osc.stop(now + 0.7);
      });

      // 2. DTMF button beeps
      const beeps = [697, 770, 852, 941, 1209, 1336];
      for (let i = 0; i < 5; i++) {
        const start = now + 0.8 + i * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(beeps[i % beeps.length], start);
        gain.gain.setValueAtTime(0.05, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.08);
        osc.connect(gain);
        this.routeToOutput(gain, 0.9);
        osc.start(start);
        osc.stop(start + 0.08);
      }

      // 3. Ring tone & handshake screech
      const screechStart = now + 1.5;
      const screech = this.ctx.createOscillator();
      const screechGain = this.ctx.createGain();
      screech.type = 'sawtooth';
      screech.frequency.setValueAtTime(1800, screechStart);
      screech.frequency.linearRampToValueAtTime(2400, screechStart + 0.4);
      screech.frequency.linearRampToValueAtTime(900, screechStart + 0.8);
      screech.frequency.linearRampToValueAtTime(3200, screechStart + 1.4);
      screechGain.gain.setValueAtTime(0.06, screechStart);
      screechGain.gain.exponentialRampToValueAtTime(0.0001, screechStart + 1.6);
      screech.connect(screechGain);
      this.routeToOutput(screechGain, 0.8);
      screech.start(screechStart);
      screech.stop(screechStart + 1.6);

      // 4. White noise carrier burst
      const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 1.5, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 2200;
      noiseFilter.Q.value = 2.0;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, screechStart + 0.5);
      noiseGain.gain.linearRampToValueAtTime(0.05, screechStart + 0.8);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, screechStart + 1.8);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      this.routeToOutput(noiseGain, 0.8);
      noise.start(screechStart + 0.5);
      noise.stop(screechStart + 1.8);

      this.markPlaying(3.5);
    } catch {}
  }

  // 11. 3.5" Floppy Disk Seek Clatter (Stepper motor steps)
  playFloppyDrive() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const stepCount = 8;
      for (let i = 0; i < stepCount; i++) {
        const t = now + i * 0.09;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(220 + (i % 2) * 180, t);

        gain.gain.setValueAtTime(0.09, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

        osc.connect(gain);
        this.routeToOutput(gain, 0.8);
        osc.start(t);
        osc.stop(t + 0.05);
      }
      this.markPlaying(0.9);
    } catch {}
  }

  // 12. Mechanical Hard Drive Crunch / Sector Grind
  playHardDriveGrind() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const clicks = 14;
      for (let i = 0; i < clicks; i++) {
        const t = now + Math.random() * 0.8;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80 + Math.random() * 300, t);

        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

        osc.connect(gain);
        this.routeToOutput(gain, 0.9);
        osc.start(t);
        osc.stop(t + 0.04);
      }
      this.markPlaying(1.1);
    } catch {}
  }

  // 13. Windows UAC Shield Ding (User Account Control screen dim chime)
  playUacAlert() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [
        { freq: 440, delay: 0.0, dur: 0.15 }, // A4
        { freq: 587.33, delay: 0.12, dur: 0.4 }, // D5
      ];

      notes.forEach(({ freq, delay, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.12, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain);
        this.routeToOutput(gain, 1.0);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
      this.markPlaying(0.6);
    } catch {}
  }

  // 14. Microsoft Edge Pleading "Sad Trombone" (Wah-Wah-Wahhh)
  playEdgePlea() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const wahNotes = [
        { freq: 330, delay: 0.0, dur: 0.35 },
        { freq: 311, delay: 0.35, dur: 0.35 },
        { freq: 293, delay: 0.7, dur: 0.35 },
        { freq: 277, delay: 1.05, dur: 0.8 }, // final sad vibrato
      ];

      wahNotes.forEach(({ freq, delay, dur }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + delay);
        // Slur pitch downwards
        osc.frequency.linearRampToValueAtTime(freq * 0.94, now + delay + dur);

        gain.gain.setValueAtTime(0.1, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        osc.connect(gain);
        this.routeToOutput(gain, 0.85);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
      this.markPlaying(2.0);
    } catch {}
  }

  // 15. TPM 2.0 Incompatible Buzzer (Fail game-show buzzer)
  playTpmFail() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [130, 138]; // dissonant buzz clash
      freqs.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        this.routeToOutput(gain, 1.0);

        osc.start(now);
        osc.stop(now + 0.6);
      });
      this.markPlaying(0.7);
    } catch {}
  }

  // 16. Notepad AI Sci-Fi Glitch Overheat
  playNotepadAi() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.6);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      this.routeToOutput(gain, 0.8);

      osc.start(now);
      osc.stop(now + 0.7);
      this.markPlaying(0.8);
    } catch {}
  }

  // Subtle UI click
  playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      this.routeToOutput(gain, 0.9);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch {}
  }
}

export const sounds = new SoundSystem();

