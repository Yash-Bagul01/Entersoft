export function getPerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === "undefined") return 'high';

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouch) return 'high';
  if (cores >= 6 && memory >= 4) return 'medium';
  return 'low';
}
