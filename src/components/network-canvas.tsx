"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Interactive abstract network visualization for the hero.
 * Canvas-based (lightweight, no WebGL dependency), pointer-reactive,
 * and fully static when prefers-reduced-motion is set.
 */
export function NetworkCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Node count scaled to viewport area — keeps mobile light.
    let nodes: Node[] = [];

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 16000), 70);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.9,
      }));
    }

    function hexToRgb(hex: string) {
      const h = hex.replace("#", "");
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }

    const LINK_DIST = 130;
    let accentA = hexToRgb("#5865F2");
    let accentB = hexToRgb("#00D4FF");

    function palette() {
      // Read CSS variables so the canvas follows the active theme.
      const css = getComputedStyle(canvas!.ownerDocument.documentElement);
      const accent = css.getPropertyValue("--c-accent2").trim(); // "0 212 255"
      const parts = accent.split(/\s+/).map(Number);
      if (parts.length === 3 && parts.every(Number.isFinite)) {
        accentA = hexToRgb("#5865F2");
        accentB = [parts[0], parts[1], parts[2]] as [number, number, number];
      }
    }

    function frame() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, width, height);

      // update
      for (const n of nodes) {
        // gentle pointer attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 160 * 160) {
          n.vx += dx * 0.00016;
          n.vy += dy * 0.00016;
        }
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.vx = Math.max(-0.6, Math.min(0.6, n.vx));
        n.vy = Math.max(-0.6, Math.min(0.6, n.vy));
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.35;
            ctx.strokeStyle = `rgba(${accentA[0]},${accentA[1]},${accentA[2]},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // dots
      for (const n of nodes) {
        const t = 0.55 + 0.45 * Math.sin(n.x / 90 + n.y / 70);
        ctx.fillStyle = `rgba(${accentB[0]},${accentB[1]},${accentB[2]},${t})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onPointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    palette();
    resize();
    frame(); // draws at least once (also covers reduced-motion)

    const ro = new ResizeObserver(() => {
      palette();
      resize();
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
