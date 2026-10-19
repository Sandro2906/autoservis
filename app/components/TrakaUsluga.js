import Link from "next/link";
import Image from "next/image";

const USLUGE = [
  { naziv: "Mali servis", opis: "Zamjena ulja, filtera i redovna provjera vozila." },
  { naziv: "Veliki servis", opis: "Zupčasti kaiš, pumpa za vodu i kompletan pregled." },
  { naziv: "Dijagnostika", opis: "Brzo pronalaženje kvara, bez nagađanja." },
  { naziv: "Generalka motora", opis: "Kompletna popravka i obnova motora." },
  { naziv: "Kočnice", opis: "Zamjena pločica, diskova i kočione tečnosti." },
  { naziv: "Trap i ovjes", opis: "Amortizeri, spone, ležajevi i ostali dijelovi." },
];

const MARKE = ["VW", "BMW", "Audi", "Mercedes", "Peugeot", "Citroën", "Volvo", "Opel", "Škoda", "Renault", "Ford", "Toyota"];

// Zajednicke klase za sve pravougaonike (kartice i marke)
const PRAVOUGAONIK =
  "group border border-white/10 bg-white/5 transition duration-300 ease-out hover:-translate-x-1 hover:-translate-y-1 hover:border-plava hover:bg-plava";

export default function StaRadimo() {
  return (
    <section id="usluge" className="scroll-mt-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Naslov */}
        <p className="mb-3 text-sm uppercase tracking-widest text-plava">Usluge</p>
        <h2 className="text-4xl font-extrabold md:text-5xl">
          Šta <span className="text-plava">radimo</span>
        </h2>

        {/* Usluge: na telefonu 1 kolona, na tabletu 2, na vecem ekranu 3 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USLUGE.map((u, i) => (
            <div key={u.naziv} className={`${PRAVOUGAONIK} p-6`}>
              <p className="text-sm font-bold text-plava transition duration-300 group-hover:text-black">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-bold transition duration-300 group-hover:text-black">
                {u.naziv}
              </h3>
              <p className="mt-2 text-neutral-400 transition duration-300 group-hover:text-black/80">
                {u.opis}
              </p>
            </div>
          ))}
        </div>

        {/* Marke automobila */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold md:text-3xl">Radimo sa svim markama</h3>
          <p className="mt-2 text-neutral-400">Bez obzira koji auto voziš, znamo kako da ga popravimo.</p>

          <div className="mt-8">
  {/* Slika za desktop: sakrivena na telefonu, vidi se od md ekrana */}
  <Image
    src="/marke-desktop.png"
    alt="Marke automobila sa kojima radimo"
    width={1600}
    height={900}
    className="hidden h-auto w-full md:block"
  />

  {/* Slika za telefon: vidi se na telefonu, sakrivena od md ekrana */}
  <Image
    src="/marke-mobile.png"
    alt="Marke automobila sa kojima radimo"
    width={800}
    height={1200}
    className="h-auto w-full md:hidden"
  />
</div>
        </div>

     
      </div>
    </section>
  );
}