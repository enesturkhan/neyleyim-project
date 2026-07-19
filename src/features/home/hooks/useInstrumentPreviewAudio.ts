"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseInstrumentPreviewAudioOptions = {
  src: string;
  volume?: number;
  maxDuration?: number;
  fadeInMs?: number;
  fadeOutMs?: number;
};

type UseInstrumentPreviewAudioResult = {
  playPreview: () => void;
  stopPreview: () => void;
  isPlaying: boolean;
  hasError: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Single HTMLAudioElement preview player with volume fades.
 * Gracefully no-ops when the audio source is missing.
 */
export function useInstrumentPreviewAudio({
  src,
  volume = 0.16,
  maxDuration = 4,
  fadeInMs = 220,
  fadeOutMs = 320,
}: UseInstrumentPreviewAudioOptions): UseInstrumentPreviewAudioResult {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef(0);
  const stopTimerRef = useRef(0);
  const sessionRef = useRef(0);
  const playingRef = useRef(false);
  const loadedSrcRef = useRef<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = 0;
    }
  }, []);

  const clearStopTimer = useCallback(() => {
    if (stopTimerRef.current) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = 0;
    }
  }, []);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.loop = false;
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const resetAudioElement = useCallback(() => {
    cancelFade();
    clearStopTimer();
    playingRef.current = false;

    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      /* ignore seek errors on unloaded media */
    }
    audio.volume = 0;
  }, [cancelFade, clearStopTimer]);

  const fadeVolume = useCallback(
    (from: number, to: number, durationMs: number, onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) {
        onComplete?.();
        return;
      }

      cancelFade();

      if (durationMs <= 0) {
        audio.volume = clamp(to, 0, 1);
        onComplete?.();
        return;
      }

      const start = performance.now();

      const step = (now: number) => {
        const progress = clamp((now - start) / durationMs, 0, 1);
        audio.volume = from + (to - from) * progress;

        if (progress < 1) {
          fadeFrameRef.current = window.requestAnimationFrame(step);
          return;
        }

        fadeFrameRef.current = 0;
        audio.volume = clamp(to, 0, 1);
        onComplete?.();
      };

      fadeFrameRef.current = window.requestAnimationFrame(step);
    },
    [cancelFade],
  );

  const stopPreview = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !playingRef.current) {
      resetAudioElement();
      setIsPlaying(false);
      return;
    }

    const session = sessionRef.current;
    fadeVolume(audio.volume, 0, fadeOutMs, () => {
      if (session !== sessionRef.current) return;
      resetAudioElement();
      setIsPlaying(false);
    });
  }, [fadeOutMs, fadeVolume, resetAudioElement]);

  const playPreview = useCallback(() => {
    if (!src || playingRef.current) return;

    const audio = ensureAudio();
    const session = ++sessionRef.current;

    const startPlayback = async () => {
      try {
        if (loadedSrcRef.current !== src) {
          audio.src = src;
          loadedSrcRef.current = src;
          audio.load();
        }

        audio.currentTime = 0;
        audio.volume = 0;
        setHasError(false);

        await audio.play();

        if (session !== sessionRef.current) {
          audio.pause();
          return;
        }

        playingRef.current = true;
        setIsPlaying(true);
        fadeVolume(0, volume, fadeInMs);

        clearStopTimer();
        stopTimerRef.current = window.setTimeout(() => {
          if (session !== sessionRef.current) return;
          stopPreview();
        }, maxDuration * 1000);
      } catch {
        if (session !== sessionRef.current) return;
        setHasError(true);
        resetAudioElement();
        setIsPlaying(false);
      }
    };

    void startPlayback();
  }, [
    clearStopTimer,
    ensureAudio,
    fadeInMs,
    fadeVolume,
    maxDuration,
    resetAudioElement,
    src,
    stopPreview,
    volume,
  ]);

  useEffect(() => {
    sessionRef.current += 1;
    resetAudioElement();
    loadedSrcRef.current = null;

    const audio = ensureAudio();
    audio.src = src;
    loadedSrcRef.current = src;

    const onError = () => {
      setHasError(true);
      resetAudioElement();
      setIsPlaying(false);
    };

    const onEnded = () => {
      resetAudioElement();
      setIsPlaying(false);
    };

    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);

    const syncFrame = window.requestAnimationFrame(() => {
      setIsPlaying(false);
      setHasError(false);
    });

    return () => {
      window.cancelAnimationFrame(syncFrame);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
    };
  }, [ensureAudio, resetAudioElement, src]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stopPreview();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [stopPreview]);

  useEffect(() => {
    return () => {
      sessionRef.current += 1;
      cancelFade();
      clearStopTimer();
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
      audioRef.current = null;
    };
  }, [cancelFade, clearStopTimer]);

  return {
    playPreview,
    stopPreview,
    isPlaying,
    hasError,
  };
}
