"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslations } from "next-intl";
import { Curve } from "@/components/ui/curve";
import { offices, type Office } from "@/data/offices";
import { cn } from "@/lib/utils";

interface StoreLocatorProps {
  variant?: "dark" | "light";
  curveCornerColor?: string;
}

const MAP_STYLE_DARK = "mapbox://styles/mapbox/dark-v11";
const MAP_STYLE_LIGHT = "mapbox://styles/mapbox/light-v11";

const FALLBACK_CENTER: [number, number] = [-84.5, 10.1];
const FALLBACK_ZOOM = 7.3;
const SELECTED_ZOOM = 13;
const FLY_TO_DURATION = 1200;
const FIT_PADDING = 64;
const FIT_MAX_ZOOM = 12;

const PinIcon = () => (
  <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
    <path
      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="1.5"
    />
  </svg>
);

export function StoreLocator({ variant = "dark", curveCornerColor }: StoreLocatorProps) {
  const t = useTranslations("locator");
  const isDark = variant === "dark";

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!mapContainerRef.current || !token) {
      setTokenMissing(!token);
      return;
    }

    mapboxgl.accessToken = token;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isDark ? MAP_STYLE_DARK : MAP_STYLE_LIGHT,
      center: FALLBACK_CENTER,
      zoom: FALLBACK_ZOOM,
      projection: "mercator",
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      cooperativeGestures: true,
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.AttributionControl({ compact: true }));
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-left");

    map.on("load", () => {
      const markers: mapboxgl.Marker[] = offices.map((office) => {
        const el = document.createElement("button");
        el.type = "button";
        el.setAttribute("aria-label", `${t("show")} ${office.name}`);
        el.setAttribute("data-active", "false");
        el.className = cn(
          "flex size-10 items-center justify-center rounded-full p-2 [&[data-active='true']]:outline [&[data-active='true']]:outline-1 [&[data-active='true']]:outline-white/60 [&[data-active='true']]:outline-offset-4"
        );
        el.style.backgroundColor = "#635bff";
        el.style.color = "#f2f2f2";

        const icon = document.createElement("div");
        icon.style.width = "100%";
        icon.innerHTML =
          '<svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5"></path><path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.5"></path></svg>';
        el.appendChild(icon);

        el.addEventListener("click", () => selectOffice(office.id));

        return new mapboxgl.Marker({ element: el, anchor: "center" })
          .setLngLat([office.lng, office.lat])
          .addTo(map);
      });

      markersRef.current = markers;

      function selectOffice(id: string) {
        setActiveId(id);
        const index = offices.findIndex((office) => office.id === id);
        if (index === -1) return;

        markers.forEach((marker, markerIndex) => {
          marker.getElement().setAttribute("data-active", String(markerIndex === index));
        });

        const office = offices[index];
        const camera = { center: [office.lng, office.lat] as [number, number], zoom: SELECTED_ZOOM, pitch: 0, bearing: 0 };

        if (reducedMotion) {
          map.jumpTo(camera);
        } else {
          map.flyTo({ ...camera, duration: FLY_TO_DURATION, essential: false });
        }
      }

      (map as unknown as { __selectOffice?: (id: string) => void }).__selectOffice = selectOffice;

      if (offices.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        offices.forEach((office) => bounds.extend([office.lng, office.lat]));
        map.fitBounds(bounds, { padding: FIT_PADDING, maxZoom: FIT_MAX_ZOOM, duration: reducedMotion ? 0 : 700 });
      }
    });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => map.resize(), 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      markersRef.current.forEach((marker) => marker.remove());
      map.remove();
      mapRef.current = null;
    };
  }, [isDark, t]);

  const handleSelect = (id: string) => {
    const map = mapRef.current as unknown as { __selectOffice?: (id: string) => void } | null;
    map?.__selectOffice?.(id);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    handleSelect(id);
  };

  return (
    <section className={cn("relative w-full", isDark ? "bg-[#1d0120]" : "bg-white")}>
      <Curve
        curveColor={isDark ? "#1d0120" : "#ffffff"}
        cornerColor={curveCornerColor ?? "#ffffff"}
        corner="right"
        className="h-[100px] sm:h-[160px] lg:h-[240px]"
        contentClassName="items-start pt-6 sm:pt-8"
      >
        <p
          className={cn(
            "text-xl sm:text-4xl lg:text-5xl xl:text-7xl font-medium uppercase tracking-tight",
            isDark ? "text-white" : "text-[#240824]"
          )}
        >
          {t("title")}
        </p>
      </Curve>

      <div className="px-4 sm:px-6 lg:px-10 pb-16 md:pb-20">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-auto lg:h-[46rem]">
          <div className="flex w-full lg:max-w-md flex-col gap-6 overflow-visible lg:overflow-y-auto">
            <p
              className={cn(
                "text-lg sm:text-xl font-semibold",
                isDark ? "text-white" : "text-[#240824]"
              )}
            >
              {t("foundLocations", { count: offices.length })}
            </p>

            <div className="flex flex-row lg:flex-col gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {offices.map((office, index) => (
                <div
                  key={office.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={(event) => handleItemClick(event, office.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelect(office.id);
                    }
                  }}
                  data-active={activeId === office.id}
                  className={cn(
                    "flex w-[20rem] lg:w-full shrink-0 flex-col items-start gap-2 rounded-xl border px-6 py-8 cursor-pointer transition-colors duration-200",
                    isDark
                      ? "border-white/15 [&[data-active='true']]:border-white/50"
                      : "border-[#240824]/15 [&[data-active='true']]:border-[#240824]/50"
                  )}
                >
                  <p className={cn("text-xs font-medium uppercase tracking-wide", "text-[#635bff]")}>
                    {office.city}
                  </p>
                  <h3
                    className={cn(
                      "text-xl font-medium tracking-tight",
                      isDark ? "text-white" : "text-[#240824]"
                    )}
                  >
                    {office.name}
                  </h3>
                  <div className={cn("flex items-center gap-2", isDark ? "text-white/70" : "text-[#240824]/70")}>
                    <span className="w-4 shrink-0">
                      <PinIcon />
                    </span>
                    <p className="text-sm">{office.address}</p>
                  </div>
                  {office.website && (
                    <a
                      href={office.website}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        "mt-4 rounded px-3 py-2 text-sm font-medium no-underline",
                        isDark ? "bg-white/10 text-white" : "bg-[#240824]/5 text-[#240824]"
                      )}
                    >
                      {t("viewWebsite")} →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "relative flex-1 overflow-hidden rounded-2xl aspect-[3/2] lg:aspect-auto",
              isDark ? "bg-[#2a0a2c]" : "bg-[#f6f9fc]"
            )}
          >
            <div ref={mapContainerRef} className="absolute inset-0 size-full [&_.mapboxgl-ctrl-logo]:hidden [&_.mapboxgl-ctrl-attrib]:hidden" />
            {tokenMissing && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center px-6 text-center text-sm",
                  isDark ? "text-white/50" : "text-[#240824]/50"
                )}
              >
                {t("mapUnavailable")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
