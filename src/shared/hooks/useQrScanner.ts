"use client";

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

type ScannerStatus = "idle" | "starting" | "scanning" | "detected" | "denied" | "error";

type BarcodeDetectorInstance = { detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>> };
type BarcodeDetectorCtor = new (options: { formats: string[] }) => BarcodeDetectorInstance;

export function useQrScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<ScannerStatus>("idle");
  const [result, setResult] = useState<string | null>(null);

  function stop() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  function decodeWithCanvas(video: HTMLVideoElement): string | null {
    if (video.videoWidth === 0 || video.videoHeight === 0) return null;
    if (!canvasRef.current) canvasRef.current = document.createElement("canvas");
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    return code?.data ?? null;
  }

  async function start() {
    setResult(null);
    setStatus("starting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const hasBarcodeDetector = typeof window !== "undefined" && "BarcodeDetector" in window;
      const detector = hasBarcodeDetector
        ? new (window as unknown as { BarcodeDetector: BarcodeDetectorCtor }).BarcodeDetector({ formats: ["qr_code"] })
        : null;

      setStatus("scanning");

      const tick = async () => {
        if (!videoRef.current) return;

        if (detector) {
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
        } else {
          const value = decodeWithCanvas(videoRef.current);
          if (value) {
            setResult(value);
            setStatus("detected");
            stop();
            return;
          }
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
