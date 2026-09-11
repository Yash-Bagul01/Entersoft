"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import SolutionExpandOverlay from "@/components/solutions/SolutionExpandOverlay";

export type SolutionExpandPayload = {
  href: string;
  image: string;
  title: string;
};

export type SolutionExpandRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type Phase = "idle" | "expanding" | "covering";

type SolutionTransitionContextValue = {
  phase: Phase;
  payload: SolutionExpandPayload | null;
  fromRect: SolutionExpandRect | null;
  startFromCard: (el: HTMLElement, payload: SolutionExpandPayload) => void;
  markArrived: (href: string) => void;
};

const SolutionTransitionContext = createContext<SolutionTransitionContextValue | null>(
  null
);

const fallbackRect = (): SolutionExpandRect => ({
  top: typeof window === "undefined" ? 0 : window.innerHeight * 0.28,
  left: typeof window === "undefined" ? 0 : window.innerWidth * 0.5 - 180,
  width: 360,
  height: 225,
});

export function SolutionTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [payload, setPayload] = useState<SolutionExpandPayload | null>(null);
  const [fromRect, setFromRect] = useState<SolutionExpandRect | null>(null);
  const [arrived, setArrived] = useState(false);
  const navigatingRef = useRef(false);
  const sourceElRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const payloadRef = useRef<SolutionExpandPayload | null>(null);

  const clearTimeoutSafe = () => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const restoreSource = () => {
    if (sourceElRef.current) {
      sourceElRef.current.style.visibility = "";
      sourceElRef.current = null;
    }
  };

  const finish = useCallback(() => {
    clearTimeoutSafe();
    restoreSource();
    navigatingRef.current = false;
    payloadRef.current = null;
    setPhase("idle");
    setPayload(null);
    setFromRect(null);
    setArrived(false);
  }, []);

  const startFromCard = useCallback(
    (el: HTMLElement, next: SolutionExpandPayload) => {
      if (navigatingRef.current) return;

      if (reduce) {
        router.push(next.href);
        return;
      }

      const rect = el.getBoundingClientRect();
      const measured: SolutionExpandRect =
        rect.width > 8 && rect.height > 8
          ? {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
            }
          : fallbackRect();

      sourceElRef.current = el;
      el.style.visibility = "hidden";
      navigatingRef.current = true;
      payloadRef.current = next;
      setArrived(false);
      setPayload(next);
      setFromRect(measured);
      setPhase("expanding");
    },
    [reduce, router]
  );

  const notifyExpanded = useCallback(() => {
    const next = payloadRef.current;
    if (!next) return;
    setPhase("covering");
    router.push(next.href);
    clearTimeoutSafe();
    timeoutRef.current = window.setTimeout(() => {
      finish();
    }, 3200);
  }, [finish, router]);

  const markArrived = useCallback((href: string) => {
    const next = payloadRef.current;
    if (!next || next.href !== href) return;
    setArrived(true);
  }, []);

  const value = useMemo<SolutionTransitionContextValue>(
    () => ({
      phase,
      payload,
      fromRect,
      startFromCard,
      markArrived,
    }),
    [phase, payload, fromRect, startFromCard, markArrived]
  );

  return (
    <SolutionTransitionContext.Provider value={value}>
      {children}
      <SolutionExpandOverlay
        phase={phase}
        payload={payload}
        fromRect={fromRect}
        arrived={arrived}
        onExpanded={notifyExpanded}
        onFinished={finish}
      />
    </SolutionTransitionContext.Provider>
  );
}

export function useSolutionTransition() {
  const ctx = useContext(SolutionTransitionContext);
  if (!ctx) {
    throw new Error("useSolutionTransition must be used within SolutionTransitionProvider");
  }
  return ctx;
}

export function useOptionalSolutionTransition() {
  return useContext(SolutionTransitionContext);
}
