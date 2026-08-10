"use client";

import { Howl } from "howler";

class SoundManager {
  private howls: Howl[] = [];
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastPlayTime: number = 0;

  constructor() {
    if (typeof window !== "undefined") {
      this.initSynthesizedHowls();
    }
  }

  /**
   * Generates clean 40-90ms synthesized audio buffers using Web Audio API
   * and converts them into Howl instances for zero-latency, reliable playback.
   */
  private initSynthesizedHowls() {
    try {
      const sampleRate = 44100;
      
      // Sound 1: Soft synth click (sine sweep + quick decay)
      const buffer1 = this.createBuffer(sampleRate, 0.05, (t) => {
        const freq = 800 * Math.exp(-t * 80);
        return Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 70);
      });

      // Sound 2: Arcade menu blip (dual tone square/sine)
      const buffer2 = this.createBuffer(sampleRate, 0.06, (t) => {
        const freq = t < 0.03 ? 1200 : 1600;
        return (Math.sin(2 * Math.PI * freq * t) * 0.7 + (t % (1 / freq) > (1 / freq) / 2 ? 0.3 : -0.3)) * Math.exp(-t * 50);
      });

      // Sound 3: Cyberpunk interface tick (high frequency crisp pop)
      const buffer3 = this.createBuffer(sampleRate, 0.04, (t) => {
        const freq = 2400 * Math.exp(-t * 120);
        const noise = (Math.random() * 2 - 1) * 0.2;
        return (Math.sin(2 * Math.PI * freq * t) + noise) * Math.exp(-t * 90);
      });

      // Sound 4: Digital UI pop (percussive warm tone)
      const buffer4 = this.createBuffer(sampleRate, 0.07, (t) => {
        const freq = 600 + 400 * (1 - t / 0.07);
        return Math.sin(2 * Math.PI * freq * t) * Math.exp(-t * 40);
      });

      const wavDatas = [
        this.bufferToWavUrl(buffer1, sampleRate),
        this.bufferToWavUrl(buffer2, sampleRate),
        this.bufferToWavUrl(buffer3, sampleRate),
        this.bufferToWavUrl(buffer4, sampleRate),
      ];

      this.howls = wavDatas.map(
        (dataUrl) =>
          new Howl({
            src: [dataUrl],
            format: ["wav"],
            volume: 0.18, // 18% volume requirement
            preload: true,
          })
      );
    } catch (e) {
      console.warn("Audio synthesis fallback error:", e);
    }
  }

  private createBuffer(
    sampleRate: number,
    duration: number,
    generator: (t: number) => number
  ): Float32Array {
    const totalSamples = Math.floor(sampleRate * duration);
    const data = new Float32Array(totalSamples);
    for (let i = 0; i < totalSamples; i++) {
      const t = i / sampleRate;
      data[i] = Math.max(-1, Math.min(1, generator(t)));
    }
    return data;
  }

  private bufferToWavUrl(buffer: Float32Array, sampleRate: number): string {
    const numChannels = 1;
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = buffer.length * bytesPerSample;
    const bufferLength = 44 + dataSize;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    // RIFF header
    this.writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    this.writeString(view, 8, "WAVE");

    // FMT chunk
    this.writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat (PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true); // BitsPerSample

    // Data chunk
    this.writeString(view, 36, "data");
    view.setUint32(40, dataSize, true);

    // Write samples
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      const sample = Math.max(-1, Math.min(1, buffer[i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }

    const blob = new Blob([arrayBuffer], { type: "audio/wav" });
    return URL.createObjectURL(blob);
  }

  private writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  /**
   * Play a navigation UI click sound with randomized pitch and non-overlapping control.
   */
  public playNavClick() {
    if (this.isMuted || this.howls.length === 0) return;

    const now = Date.now();
    // Do NOT overlap sounds (throttle by 50ms)
    if (now - this.lastPlayTime < 50) return;
    this.lastPlayTime = now;

    // Pick random sound from the pool
    const randomIndex = Math.floor(Math.random() * this.howls.length);
    const sound = this.howls[randomIndex];

    if (sound) {
      // Random pitch between 0.95, 1.00, 1.05
      const pitches = [0.95, 1.0, 1.05];
      const randomRate = pitches[Math.floor(Math.random() * pitches.length)];

      sound.rate(randomRate);
      sound.volume(0.18); // 18% volume
      sound.play();
    }
  }
}

export const soundManager = new SoundManager();
