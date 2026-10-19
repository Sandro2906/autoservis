"use client";

import { useEffect, useRef, useState } from "react";

const BROJ_SLIKA = 240;

// od/do = kada se tekst vidi (0 = pocetak animacije, 1 = kraj)
const TEKSTOVI = [
  { od: 0, do: 0.12, mjesto: "centar", naslov: "Autoservis „DS“", opis: "Ognjen Jorgić · Zoran Jorgić" },
  { od: 0.16, do: 0.34, mjesto: "lijevo", naslov: "Znamo šta je ispod haube", opis: "Svaki auto pregledamo kao da je naš." },
  { od: 0.36, do: 0.5, mjesto: "desno", naslov: "Dijagnostika", opis: "Brzo pronalazimo kvar, bez nagađanja." },
  { od: 0.62, do: 0.84, mjesto: "dole", naslov: "Rastavimo. Popravimo. Sklopimo.", opis: "Od malog servisa do generalke motora." },
  { od: 0.88, do: 1, mjesto: "centar", naslov: "Autoservis „DS“", opis: "Zakaži termin: 066/861-330 · Put srpskih branilaca 17, 78000 Banja Luka" },
];

// Gdje stoji tekst na ekranu (na telefonu lijevo/desno idu dole, sa "md:" vazi za veci ekran)
const MJESTA = {
  centar: "inset-0 flex flex-col items-center justify-center text-center",
  lijevo: "bottom-12 left-6 md:bottom-auto md:left-12 md:top-1/2 md:-translate-y-1/2",
  desno: "bottom-12 left-6 md:bottom-auto md:left-auto md:right-12 md:top-1/2 md:-translate-y-1/2 md:text-right",
  dole: "bottom-12 inset-x-0 text-center",
};

export default function ScrollVideo() {
  const sekcijaRef = useRef(null);
  const canvasRef = useRef(null);
  const [procenat, setProcenat] = useState(0);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // 1. Ucitaj sve slike unaprijed
    const slike = [];
    for (let i = 1; i <= BROJ_SLIKA; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;
      slike.push(img);
    }

    // 2. Na scroll: izracunaj procenat (0 do 1) i nacrtaj pravu sliku
    function naScroll() {
      const sekcija = sekcijaRef.current.getBoundingClientRect();
      let p = -sekcija.top / (sekcija.height - window.innerHeight);
      p = Math.min(1, Math.max(0, p));

      const index = Math.min(BROJ_SLIKA - 1, Math.floor(p * BROJ_SLIKA));
      ctx.drawImage(slike[index], 0, 0);
      setProcenat(p);
    }

    slike[0].onload = naScroll; // nacrtaj prvu sliku cim se ucita
    window.addEventListener("scroll", naScroll);
    return () => window.removeEventListener("scroll", naScroll);
  }, []);

  return (
    // h-[600vh] = duzina animacije (vise = sporije)
    <section ref={sekcijaRef} className="h-[600vh]">
      {/* sticky = ostaje zalijepljeno na ekranu dok skrolujes */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} width={1920} height={1080} className="h-full w-full object-cover" />

        {TEKSTOVI.map((t, i) => {
          const vidljiv = procenat >= t.od && procenat <= t.do;
          return (
            <div
              key={i}
              className={`absolute ${MJESTA[t.mjesto]} drop-shadow-lg transition-opacity duration-500 ${vidljiv ? "opacity-100" : "opacity-0"}`}
            >
              <h2 className="text-4xl font-extrabold md:text-7xl lg:text-8xl">{t.naslov}</h2>
              <p className="mt-2 text-lg text-neutral-300 md:text-4xl">{t.opis}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}