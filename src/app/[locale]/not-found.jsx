"use client";

import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="mb-8">
        <span className="text-primary text-[5rem] sm:text-[7rem] md:text-[10rem] font-bold select-none">
          404
        </span>
      </div>

      <div className="text-center max-w-md">
        <h2 className="text-foreground text-xl sm:text-2xl md:text-3xl font-semibold mb-4">
          Página no encontrada
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8">
          La página que buscas no existe o ha sido movida.
        </p>

        <Link href="/">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-8 rounded-lg transition-all duration-300">
            Volver al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
