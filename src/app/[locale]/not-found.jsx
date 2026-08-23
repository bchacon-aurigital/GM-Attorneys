const copy = {
    es: {
        eyebrow: "Error 404",
        title: "Página no encontrada",
        description: "La página que buscas no existe o fue movida. Te ayudamos a volver al camino correcto.",
        backHome: "Volver al inicio",
    },
    en: {
        eyebrow: "Error 404",
        title: "Page not found",
        description: "The page you're looking for doesn't exist or has been moved. Let us help you find your way back.",
        backHome: "Back to home",
    },
};

export default function NotFound() {
    const t = copy.es;

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#240824] px-4 py-16 text-center sm:px-6">
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

            <a href="/" aria-label="Go to home" className="relative mb-10 w-fit sm:mb-16">
                <object
                    data="/assets/GM_logotipo_Footer.svg"
                    type="image/svg+xml"
                    width="240"
                    height="37"
                    className="h-8 w-auto sm:h-9"
                    aria-label="GM Attorneys logo"
                >
                    <img src="/assets/GM_logotipo_Footer.svg" alt="GM Attorneys logo" />
                </object>
            </a>

            <div className="relative flex flex-col items-center gap-6 sm:gap-8">
                <p className="text-xs font-semibold uppercase tracking-tight text-white/40 sm:text-sm">
                    {t.eyebrow}
                </p>

                <p className="font-inter text-7xl font-medium uppercase leading-none tracking-tight text-white sm:text-8xl lg:text-9xl">
                    404
                </p>

                <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <p className="text-xl font-semibold uppercase tracking-tight text-white sm:text-2xl lg:text-3xl">
                        {t.title}
                    </p>
                    <p className="max-w-md text-sm font-medium text-white/60 sm:text-base">
                        {t.description}
                    </p>
                </div>

                <a
                    href="/"
                    className="mt-2 flex items-center justify-between gap-2 rounded bg-white px-5 py-3 text-sm font-medium text-black transition-opacity duration-300 hover:opacity-90 sm:mt-4 sm:text-base"
                >
                    <span>{t.backHome}</span>
                    <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M1 6H14M14 6L9 1M14 6L9 11" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </div>
    );
}
