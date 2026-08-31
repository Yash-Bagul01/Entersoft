"use client";

import ExoApeCaseStudy from "@/components/platform/exoape/ExoApeCaseStudy";
import { DAST_CASE } from "@/components/platform/dast/dastCase";

export default function DastExoapePage() {
  return <ExoApeCaseStudy data={DAST_CASE} />;
}
