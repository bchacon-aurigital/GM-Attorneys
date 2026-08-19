"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import AOS from "aos";

function AosSync() {
  const lenis = useLenis(() => {
    AOS.refresh();
  });

  useEffect(() => {
    if (!lenis) return;
    AOS.refresh();
  }, [lenis]);

  return null;
}

export default function LenisProvider() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <AosSync />
    </ReactLenis>
  );
}
