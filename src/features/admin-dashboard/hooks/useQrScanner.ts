"use client";

import { useEffect, useRef, useState } from "react";

type ScannerStatus = "idle" | "starting" | "scanning" | "detected" | "unsupported" | "denied" | "error";

export function useQrScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const [status, setStatus] = useState<ScannerStatus>("idle");
  const [result, setResult] = useState<string | null>(null);

  function stop() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  async function start() {
    setResult(null);

    if (typeof window === "undefined" || !("BarcodeDetector" in window)) {
      setStatus("unsupported");
      return;
    }

    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const BarcodeDetectorCtor = (window as unknown as { BarcodeDetector: new (options: { formats: string[] }) => { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>> } }).BarcodeDetector;
      const detector = new BarcodeDetectorCtor({ formats: ["qr_code"] });
      setStatus("scanning");

      const tick = async () => {
        if (!videoRef.current) return;
        try {
          const codes = await detector.detect(videoRef.current);
          if (codes.length > 0) {
            setResult(codes[0].rawValue);
            setStatus("detected");
            stop();
            return;
          }
        } catch {
          // transient decode error, keep scanning
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch (err) {
      setStatus(err instanceof DOMException && err.name === "NotAllowedError" ? "denied" : "error");
    }
  }

  useEffect(() => stop, []);

  function reset() {
    setResult(null);
    start();
  }

  return { videoRef, status, result, start, stop, reset };
}
