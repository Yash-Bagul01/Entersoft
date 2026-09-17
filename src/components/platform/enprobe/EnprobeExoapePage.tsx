"use client";

import ExoApeCaseStudy from "@/components/platform/exoape/ExoApeCaseStudy";
import { ENPROBE_CASE } from "@/components/platform/enprobe/enprobeCase";

export default function EnprobeExoapePage() {
  return <ExoApeCaseStudy data={ENPROBE_CASE} />;
}
