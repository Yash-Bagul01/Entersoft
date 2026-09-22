"use client";

import React from "react";
import { hubFront, hubVideo, PLATFORM_HUB_ITEMS } from "@/data/platformHub";
import HubClip from "@/components/platform/HubClip";

export default function HubArrivePhoto({ id }: { id: string }) {
  const item = PLATFORM_HUB_ITEMS.find((entry) => entry.id === id);
  return (
    <section id="hero" className="relative h-svh w-full overflow-hidden bg-[#0b0c10]">
      <div data-hero-media className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hubFront(id)}
          alt={item?.name ?? ""}
          className="h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <HubClip
          src={hubVideo(id)}
          poster={hubFront(id)}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/45 to-black/40" />
      </div>
      {item ? (
        <h1 className="absolute inset-x-6 md:inset-x-10 bottom-10 z-10 text-white text-[clamp(2.6rem,8vw,7.5rem)] font-light leading-[0.95] tracking-[-0.04em]">
          {item.name}
        </h1>
      ) : null}
    </section>
  );
}
