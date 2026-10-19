import Link from "next/link";

// Podaci o servisu, ovdje mijenjas sve na jednom mjestu
const ADRESA = "Put srpskih branilaca 17, 78000 Banja Luka";
const TELEFON = "065/861-330";
const RADNO_VRIJEME = [
  { dani: "Pon – Pet", vrijeme: "15:00 – 20:30" },
  { dani: "Subota", vrijeme: "08:00 – 17:00" },
  { dani: "Nedjelja", vrijeme: "Zatvoreno" },
];

// Google Maps link koji prikazuje lokaciju po adresi (ne treba API kljuc)
const MAPA = `https://www.google.com/maps?q=${encodeURIComponent(ADRESA)}&output=embed`;

export default function Footer() {
  return (
    <footer id="kontakt" className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* Ukras: plava svijetleca linija na vrhu */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-plava to-transparent" />

      {/* Ukras: plavi sjaj u pozadini */}
      <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-plava/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        {/* 1. Logo i opis */}
        <div>
          <h3 className="text-2xl font-extrabold">
            Autoservis <span className="text-plava">„DS“</span>
          </h3>
          <p className="mt-3 text-neutral-400">
            Vlasnik: Ognjen Jorgić. Brz, pošten i provjeren servis za vaše vozilo.
          </p>
        </div>

        {/* 2. Kontakt i radno vrijeme */}
        <div>
          <h4 className="mb-4 text-sm uppercase tracking-widest text-plava">Kontakt</h4>
          <p className="text-neutral-300">📍 {ADRESA}</p>
          <a href={`tel:${TELEFON}`} className="mt-2 block text-neutral-300 hover:text-white">
            📞 {TELEFON}
          </a>

          <h4 className="mb-4 mt-8 text-sm uppercase tracking-widest text-plava">Radno vrijeme</h4>
          {RADNO_VRIJEME.map((r) => (
            <div key={r.dani} className="flex justify-between border-b border-white/5 py-1 text-neutral-300">
              <span>{r.dani}</span>
              <span>{r.vrijeme}</span>
            </div>
          ))}
        </div>

        {/* 3. Mapa: 50% providna, na hover postane potpuno vidljiva */}
        <div>
          <h4 className="mb-4 text-sm uppercase tracking-widest text-plava">Lokacija</h4>
          <iframe
            src={MAPA}
            className="h-64 w-full rounded-2xl border border-white/10 opacity-50 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
            loading="lazy"
            title="Lokacija Autoservisa DS"
          />
        </div>
      </div>

      {/* Donji red */}
    <div className="relative border-t border-white/10 py-6 text-center text-sm text-neutral-500">
  © {new Date().getFullYear()} Autoservis „DS“. Sva prava zadržana. ·{" "}
  <Link href="/admin" className="hover:text-white">Admin</Link>
</div>

      
    </footer>
  );
}