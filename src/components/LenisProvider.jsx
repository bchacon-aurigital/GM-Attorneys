"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
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

function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // Skip if navigating to a specific in-page anchor
    if (window.location.hash) return;
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

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
      <ScrollToTop />
    </ReactLenis>
  );
}
