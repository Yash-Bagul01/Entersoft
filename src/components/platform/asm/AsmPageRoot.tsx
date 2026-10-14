"use client";

import ExoApeCaseStudy from "@/components/platform/exoape/ExoApeCaseStudy";
import { ASM_CASE } from "./asmCase";

export default function AsmPageRoot() {
  return <ExoApeCaseStudy data={ASM_CASE} />;
}
