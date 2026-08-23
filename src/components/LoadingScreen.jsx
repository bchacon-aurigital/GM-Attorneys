"use client";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 18);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#240824]">
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
                            className="h-full bg-white transition-[width] duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="font-inter text-xs font-medium tabular-nums tracking-tight text-white/50 sm:text-sm">
                        {progress}%
                    </p>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
