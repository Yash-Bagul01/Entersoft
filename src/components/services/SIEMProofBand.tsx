"use client";

import React, { useEffect, useState } from "react";

export default function SIEMProofBand() {
  const [events, setEvents] = useState(4821590);
  const [alerts, setAlerts] = useState(14352);
  const [clients] = useState(182);

  useEffect(() => {
    // Tick events very fast
    const eventsInterval = setInterval(() => {
      setEvents((prev) => prev + Math.floor(Math.random() * 8) + 2);
    }, 200);

    // Tick alerts slower
    const alertsInterval = setInterval(() => {
      setAlerts((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 2000);

    return () => {
      clearInterval(eventsInterval);
      clearInterval(alertsInterval);
    };
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="w-full bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)] py-12 md:py-16 my-8 select-none">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-around items-center gap-8 text-center">
        {/* Events */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-3xl md:text-4xl font-bold text-[var(--accent)] tracking-tight">
            {formatNumber(events)}
          </span>
          <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Events Processed
          </span>
        </div>

        {/* Alerts */}
        <div className="flex flex-col gap-1.5 border-t md:border-t-0 md:border-x border-[var(--border-subtle)] pt-6 md:pt-0 px-0 md:px-12 w-full md:w-auto">
          <span className="font-mono text-3xl md:text-4xl font-bold text-[var(--accent)] tracking-tight">
            {formatNumber(alerts)}
          </span>
          <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Alerts Triaged
          </span>
        </div>

        {/* Clients */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-3xl md:text-4xl font-bold text-[var(--accent)] tracking-tight">
            {clients}
          </span>
          <span className="font-mono text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">
            Active Clients
          </span>
        </div>
      </div>
      <div className="text-center font-mono text-[8px] text-[var(--text-tertiary)] uppercase tracking-widest mt-6">
        Illustrative · Updated Quarterly
      </div>
    </div>
  );
}
