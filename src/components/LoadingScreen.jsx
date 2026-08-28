"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen({ isHiding = false }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                // Rush to 85% quickly, then hold and wait for real load signal
                if (prev >= 85) { clearInterval(interval); return 85; }
                return prev + 2;
            });
        }, 16);
        return () => clearInterval(interval);
    }, []);

    // When hiding signal comes in, jump to 100%
    useEffect(() => {
        if (isHiding) setProgress(100);
    }, [isHiding]);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#240824]"
            style={isHiding ? { animation: "heroFadeOut 0.55s ease forwards" } : undefined}
        >
            <img
                src="/assets/home/hero-vector.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto lg:block"
            />
            <img
                src="/assets/home/hero-vector.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 hidden h-full w-auto -scale-x-100 lg:block"
            />

            <div className="relative flex flex-col items-center gap-10 sm:gap-14">
                <object
                    data="/assets/GM_logotipo_Footer.svg"
                    type="image/svg+xml"
                    width="360"
                    height="56"
                    className="h-10 w-auto animate-[fadeIn_0.8s_ease-out] sm:h-14"
                    aria-label="GM Attorneys"
                >
                    <img src="/assets/GM_logotipo_Footer.svg" alt="GM Attorneys" />
                </object>

                <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="h-[1.5px] w-56 overflow-hidden bg-white/20 sm:w-72">
                        <div
                            className="h-full bg-white ease-linear"
                            style={{
                                width: `${progress}%`,
                                transition: isHiding ? "width 0.2s ease" : "width 0.1s linear",
                            }}
                        />
                    </div>
                    <p className="font-inter text-xs font-medium tabular-nums tracking-tight text-white/50 sm:text-sm">
                        {progress}%
                    </p>
                </div>
            </div>
        </div>
    );
}
