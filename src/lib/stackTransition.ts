import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isTouchDevice } from "./scrollTriggerHelpers";

export function createStackTransition(
  incomingSection: Element,
  triggerContainer: Element,
  options?: { scrub?: number; scale?: boolean }
) {
  if (isTouchDevice()) {
    // Reset any clip-path on touch so content flows vertically normally
    gsap.set(incomingSection, { clipPath: "none" });
    return;
  }

  const scrub = options?.scrub ?? 1.4;

  // The incoming section starts clipped from the bottom
  gsap.set(incomingSection, { clipPath: "inset(100% 0 0 0)" });

  ScrollTrigger.create({
    trigger: triggerContainer,
    start: "top top",
    end: "+=100%",
    scrub,
    pin: triggerContainer, // OUTGOING section is pinned
    anticipatePin: 1,
    onUpdate: (self) => {
      const p = self.progress;
      // Incoming section clip-path: fully hidden → fully revealed
      gsap.set(incomingSection, {
        clipPath: `inset(${(1 - p) * 100}% 0 0 0)`,
      });
      // Optional: outgoing section scales back slightly as incoming covers it
      if (options?.scale) {
        gsap.set(triggerContainer, { scale: 1 - p * 0.06 });
      }
    },
  });
}
