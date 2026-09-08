import React from "react";

const STRIPE_COUNT = 6;

export default function StripeWipeBars() {
  return (
    <>
      {Array.from({ length: STRIPE_COUNT }, (_, i) => (
        <span key={i} data-ov-stripe className="ov-stripe block h-full w-full min-h-0 flex-1 origin-center" />
      ))}
    </>
  );
}
