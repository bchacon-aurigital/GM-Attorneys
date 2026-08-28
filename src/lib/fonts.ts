import localFont from "next/font/local";

// Manrope — default font for the whole site
export const manrope = localFont({
  src: [
    {
      path: "../../public/fonts/Manrope/Manrope-VariableFont_wght.ttf",
      weight: "200 800",
      style: "normal",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
});

// Arial — available on demand via Tailwind classes (e.g. className="font-arial")
export const arial = localFont({
  src: [
    {
      path: "../../public/fonts/arial/ARIALLGT.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/arial/ARIAL.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/arial/ARIALI.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/arial/ArialMdm.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/arial/ArialMdmItl.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/arial/ARIALBD.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/arial/ARIALBI.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/arial/ARIBLK.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-arial",
  display: "swap",
});
