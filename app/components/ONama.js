import Image from "next/image";
import SlideIn from "./SlideIn";

// Brojke koje se istaknu kao kartice
const BROJKE = [
  { broj: "10", opis: "godina iskustva" },
  { broj: "2.000+", opis: "popravljenih vozila" },
  { broj: "Citroën", opis: "ovlašteni servis" },
];

const USLUGE = ["Mali servis", "Veliki servis", "Dijagnostika kvarova", "Generalna popravka motora"];

export default function ONama() {
  return (
    <section id="o-nama" className="relative scroll-mt-20 overflow-hidden px-6 py-24">
      {/* Ukras: plavi sjaj u pozadini */}
      <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-plava/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        {/* LIJEVO: slika (ulijece s lijeva) */}
        <SlideIn smjer="lijevo" className="relative mx-auto w-full max-w-md">
          {/* Plavi okvir pomjeren iza slike */}
          <div className="absolute -bottom-4 -right-4 h-full w-full border-2 border-plava/40" />

          <Image
            src="/ognjen.jpg"
            alt="Ognjen Jorgić, automehaničar"
            width={918}
            height={1152}
            className="relative h-auto w-full border border-white/10 object-cover"
          />

          {/* Znacka preko slike */}
          <div className="absolute -left-4 bottom-8 border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-md">
            <p className="text-3xl font-extrabold text-plava">10+</p>
            <p className="text-sm text-neutral-300">godina iskustva</p>
          </div>
        </SlideIn>

        {/* DESNO: tekst (ulijece s desna, malo kasnije) */}
        <SlideIn smjer="desno" kasnjenje={0.2}>
          <p className="mb-3 text-sm uppercase tracking-widest text-plava">O nama</p>
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Iskustvo koje <span className="text-plava">pravi razliku</span>
          </h2>

          <div className="mt-6 space-y-4 leading-relaxed text-neutral-300">
            <p>
              Ognjen je automehaničar sa skoro 10 godina iskustva u radu u ovlaštenom Citroën
              servisu, a svoje znanje i stručnost dodatno usavršava kroz rad u Autoservisu „DS“.
            </p>
            <p>
              Tokom godina rada uspješno je popravio više od 2.000 vozila, stekavši bogato iskustvo
              u održavanju i popravci različitih automobilskih sistema.
            </p>
            <p>
              Za Ognjena, automehanika nije samo posao, već i strast. Svakom vozilu pristupa pažljivo
              i odgovorno, uz stalnu želju za učenjem, usavršavanjem i pronalaženjem najboljih
              rješenja za svoje klijente.
            </p>
          </div>

          {/* Usluge kao male oznake */}
          <div className="mt-6 flex flex-wrap gap-2">
            {USLUGE.map((u) => (
              <span key={u} className="border border-plava/30 bg-plava/10 px-4 py-1 text-sm text-plava">
                {u}
              </span>
            ))}
          </div>

          {/* Brojke (ulijecu odozdo, jedna za drugom) */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {BROJKE.map((b, i) => (
              <SlideIn key={b.opis} kasnjenje={0.4 + i * 0.15}>
                <div className="h-full border border-white/10 bg-white/5 p-4 text-center">
                  <p className="text-xl font-extrabold text-white md:text-2xl">{b.broj}</p>
                  <p className="mt-1 text-xs text-neutral-400">{b.opis}</p>
                </div>
              </SlideIn>
            ))}
          </div>

          {/* Citat na kraju */}
          <blockquote className="mt-8 border-l-2 border-plava pl-4 italic text-white">
            „Kvalitetno obavljen posao, pouzdano vozilo i zadovoljna mušterija.“
          </blockquote>
        </SlideIn>
      </div>
    </section>
  );
}