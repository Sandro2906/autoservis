import Link from "next/link";

const TELEFON = "065/861-330";

export default function Kontakt() {
  return (
    <section id="kontakt" className="scroll-mt-20 px-6 pt-24 pb-24">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-8 py-14 text-center">
        {/* Ukras: plavi sjaj iza kartice */}
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-plava/30 blur-3xl" />

        <div className="relative">
          <p className="mb-3 text-sm uppercase tracking-widest text-plava">Kontakt</p>
          <h2 className="text-3xl font-extrabold md:text-5xl">
            Auto pravi <span className="text-plava">problem?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-neutral-300">
            Rezerviši pregled i riješi kvar na vrijeme, prije nego što postane skup.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/rezervacija"
              className="rounded-lg bg-plava px-6 py-3 font-semibold text-black hover:bg-white"
            >
              Rezerviši pregled
            </Link>
            <a
              href={`tel:${TELEFON}`}
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold hover:bg-white/10"
            >
              📞 Pozovi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}