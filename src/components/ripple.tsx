import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { computeRipple } from "../lib/ripple";
import { cn } from "../lib/cn";

const DURATION = 550;

export type RippleMark = {
  id: number;
  x: number;
  y: number;
  size: number;
  leaving: boolean;
};

function reducedMotion() {
  return typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useRipple(disabled?: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<RippleMark[]>([]);
  const timers = useRef(new Map<number, number>());
  const nextId = useRef(0);

  const start = useCallback(
    (event: PointerEvent | KeyboardEvent, center = false) => {
      if (disabled || reducedMotion()) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const isPointer = "clientX" in event;
      const useCenter =
        center || !isPointer || (event.clientX === 0 && event.clientY === 0);
      const x = useCenter ? rect.width / 2 : event.clientX - rect.left;
      const y = useCenter ? rect.height / 2 : event.clientY - rect.top;
      const { rippleX, rippleY, rippleSize } = computeRipple({
        width: el.clientWidth,
        height: el.clientHeight,
        x,
        y,
        center: useCenter,
      });
      const id = ++nextId.current;
      setRipples((list) => [...list, { id, x: rippleX, y: rippleY, size: rippleSize, leaving: false }]);
    },
    [disabled],
  );

  const stop = useCallback(() => {
    setRipples((list) => {
      const next = list.map((r) => (r.leaving ? r : { ...r, leaving: true }));
      for (const r of next) {
        if (r.leaving && !timers.current.has(r.id)) {
          const t = window.setTimeout(() => {
            timers.current.delete(r.id);
            setRipples((cur) => cur.filter((x) => x.id !== r.id));
          }, DURATION);
          timers.current.set(r.id, t);
        }
      }
      return next;
    });
  }, []);

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (e.button !== 0) return;
      try {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      } catch {
        /* synthetic events have no active pointer */
      }
      start(e);
    },
    [start],
  );

  const onPointerUp = useCallback(() => stop(), [stop]);
  const onPointerCancel = useCallback(() => stop(), [stop]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === " " || e.key === "Enter") start(e, true);
    },
    [start],
  );

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === " " || e.key === "Enter") stop();
    },
    [stop],
  );

  return {
    ref,
    ripples,
    bind: { onPointerDown, onPointerUp, onPointerCancel, onKeyDown, onKeyUp },
  };
}

export function RippleLayer({ ripples }: { ripples: RippleMark[] }) {
  return (
    <span className="md-ripple" aria-hidden>
      {ripples.map((r) => (
        <span
          key={r.id}
          className={cn("md-ripple-ink", r.leaving && "md-ripple-ink-leave")}
          style={{
            width: r.size,
            height: r.size,
            top: -(r.size / 2) + r.y,
            left: -(r.size / 2) + r.x,
          }}
        >
          <span className="md-ripple-child" />
        </span>
      ))}
    </span>
  );
}
