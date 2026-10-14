"use client";

import ExoApeCaseStudy from "@/components/platform/exoape/ExoApeCaseStudy";
import { API_SECURITY_CASE } from "./apiCase";

export default function ApiPageRoot() {
  return <ExoApeCaseStudy data={API_SECURITY_CASE} />;
}
