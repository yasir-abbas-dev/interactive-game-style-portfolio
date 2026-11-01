import { useCallback, useRef, useEffect, useState } from 'react';

class AudioManager {
  private audioContext: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private isAmbientPlaying = false;
  private masterVolume = 0.3;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  playHoverSound() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.1 * this.masterVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  playClickSound() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);

    gainNode.gain.setValueAtTime(0.15 * this.masterVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }

  playSuccessSound() {
    const ctx = this.getContext();
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);

      gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
      gainNode.gain.linearRampToValueAtTime(0.1 * this.masterVolume, ctx.currentTime + i * 0.1 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);

      oscillator.start(ctx.currentTime + i * 0.1);
      oscillator.stop(ctx.currentTime + i * 0.1 + 0.3);
    });
  }

  playTransitionSound() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.08 * this.masterVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }

  startAmbient() {
    if (this.isAmbientPlaying) return;

    const ctx = this.getContext();
    this.ambientGain = ctx.createGain();
    this.ambientGain.connect(ctx.destination);
    this.ambientGain.gain.setValueAtTime(0, ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.03 * this.masterVolume, ctx.currentTime + 2);

    // Deep drone
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.setValueAtTime(55, ctx.currentTime);
    drone.connect(this.ambientGain);
    drone.start();
    this.ambientOscillators.push(drone);

    // Subtle harmonics
    const harmonic1 = ctx.createOscillator();
    harmonic1.type = 'sine';
    harmonic1.frequency.setValueAtTime(110, ctx.currentTime);
    const h1Gain = ctx.createGain();
    h1Gain.gain.setValueAtTime(0.3, ctx.currentTime);
    harmonic1.connect(h1Gain);
    h1Gain.connect(this.ambientGain);
    harmonic1.start();
    this.ambientOscillators.push(harmonic1);

    // LFO modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.1, ctx.currentTime);
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(5, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(drone.frequency);
    lfo.start();
    this.ambientOscillators.push(lfo);

    this.isAmbientPlaying = true;
  }

  stopAmbient() {
    if (!this.isAmbientPlaying) return;

    const ctx = this.getContext();
    if (this.ambientGain) {
      this.ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    }

    setTimeout(() => {
      this.ambientOscillators.forEach(osc => {
        try {
          osc.stop();
        } catch {}
      });
      this.ambientOscillators = [];
      this.isAmbientPlaying = false;
    }, 1000);
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  resumeContext() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

const audioManager = new AudioManager();

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  const playHover = useCallback(() => {
    if (!isMuted) {
      audioManager.resumeContext();
      audioManager.playHoverSound();
    }
  }, [isMuted]);

  const playClick = useCallback(() => {
    if (!isMuted) {
      audioManager.resumeContext();
      audioManager.playClickSound();
    }
  }, [isMuted]);

  const playSuccess = useCallback(() => {
    if (!isMuted) {
      audioManager.resumeContext();
      audioManager.playSuccessSound();
    }
  }, [isMuted]);

  const playTransition = useCallback(() => {
    if (!isMuted) {
      audioManager.resumeContext();
      audioManager.playTransitionSound();
    }
  }, [isMuted]);

  const toggleAmbient = useCallback(() => {
    audioManager.resumeContext();
    if (isAmbientOn) {
      audioManager.stopAmbient();
      setIsAmbientOn(false);
    } else {
      audioManager.startAmbient();
      setIsAmbientOn(true);
    }
  }, [isAmbientOn]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (!isMuted && isAmbientOn) {
      audioManager.stopAmbient();
      setIsAmbientOn(false);
    }
  }, [isMuted, isAmbientOn]);

  return {
    playHover,
    playClick,
    playSuccess,
    playTransition,
    toggleAmbient,
    toggleMute,
    isMuted,
    isAmbientOn,
  };
}
