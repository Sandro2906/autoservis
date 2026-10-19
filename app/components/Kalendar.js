"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { napraviRezervaciju } from "@/app/lib/actions";

const TERMINI = ["17:00", "18:00", "19:00"];
const DANI = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
const MJESECI = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];

// Pretvara godinu, mjesec i dan u tekst "2026-10-20"
function napraviDatum(godina, mjesec, dan) {
  return `${godina}-${String(mjesec + 1).padStart(2, "0")}-${String(dan).padStart(2, "0")}`;
}

// NOVO: zauzeto stize iz baze (preko page.js)
export default function Kalendar({ zauzeto }) {
  const router = useRouter();
  const danas = new Date();
  const danasTekst = napraviDatum(danas.getFullYear(), danas.getMonth(), danas.getDate());

  const [godina, setGodina] = useState(danas.getFullYear());
  const [mjesec, setMjesec] = useState(danas.getMonth()); // 0 = januar
  const [datum, setDatum] = useState(null);
  const [termin, setTermin] = useState(null);
  const [poslano, setPoslano] = useState(null);
  const [greska, setGreska] = useState("");
  const [salje, setSalje] = useState(false);

  // Koliko dana ima mjesec i od kog dana u sedmici pocinje (0 = ponedjeljak)
  const brojDana = new Date(godina, mjesec + 1, 0).getDate();
  const prviDan = (new Date(godina, mjesec, 1).getDay() + 6) % 7;

  function promijeniMjesec(korak) {
    const novi = new Date(godina, mjesec + korak, 1);
    setGodina(novi.getFullYear());
    setMjesec(novi.getMonth());
  }

  // NOVO: salje rezervaciju u bazu
  async function posalji(e) {
    e.preventDefault();
    setGreska("");
    setSalje(true);

    const forma = new FormData(e.target);
    const rezultat = await napraviRezervaciju(forma);
    setSalje(false);

    if (rezultat.greska) {
      setGreska(rezultat.greska);
      setTermin(null);
      router.refresh(); // ponovo ucitaj zauzete termine iz baze
      return;
    }

    setPoslano({
      ime: forma.get("ime_prezime"),
      auto: `${forma.get("marka")} ${forma.get("model")}`,
    });
  }

  // Poruka nakon slanja
  if (poslano) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="text-5xl">✅</p>
        <h1 className="mt-4 text-3xl font-bold">Rezervacija uspješna!</h1>
        <p className="mt-4 text-neutral-300">
          {poslano.ime}, čekamo vas <span className="text-plava">{datum}</span> u{" "}
          <span className="text-plava">{termin}</span> sa vozilom {poslano.auto}.
        </p>
      </div>
    );
  }

  const prviMjesec = godina === danas.getFullYear() && mjesec === danas.getMonth();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="mb-3 text-sm uppercase tracking-widest text-plava">Rezervacija</p>
      <h1 className="text-4xl font-extrabold md:text-5xl">
        Rezerviši <span className="text-plava">pregled</span>
      </h1>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {/* LIJEVO: kalendar i termini */}
        <div>
          <div className="border border-white/10 bg-white/5 p-5">
            {/* Mjesec i strelice */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => promijeniMjesec(-1)}
                disabled={prviMjesec}
                className="px-3 py-1 text-xl hover:text-plava disabled:opacity-20"
              >
                ←
              </button>
              <p className="font-bold">{MJESECI[mjesec]} {godina}</p>
              <button onClick={() => promijeniMjesec(1)} className="px-3 py-1 text-xl hover:text-plava">
                →
              </button>
            </div>

            {/* Nazivi dana */}
            <div className="mt-4 grid grid-cols-7 text-center text-xs text-neutral-500">
              {DANI.map((d) => <p key={d}>{d}</p>)}
            </div>

            {/* Dani */}
            <div className="mt-2 grid grid-cols-7 gap-1">
              {/* Prazna polja prije prvog dana u mjesecu */}
              {Array.from({ length: prviDan }).map((_, i) => <div key={"p" + i} />)}

              {Array.from({ length: brojDana }).map((_, i) => {
                const dan = i + 1;
                const ovajDatum = napraviDatum(godina, mjesec, dan);
                const prosao = ovajDatum < danasTekst;
                const nedjelja = new Date(godina, mjesec, dan).getDay() === 0; // NOVO
                const pun = zauzeto[ovajDatum]?.length === TERMINI.length;
                const izabran = ovajDatum === datum;

                return (
                  <button
                    key={dan}
                    disabled={prosao || nedjelja || pun}
                    onClick={() => {
                      setDatum(ovajDatum);
                      setTermin(null);
                      setGreska("");
                    }}
                    className={`py-2 text-sm transition cursor-pointer ${
                      izabran ? "bg-plava font-bold text-black" : "hover:bg-white/10"
                    } disabled:cursor-not-allowed disabled:opacity-25 ${pun ? "line-through" : ""}`}
                  >
                    {dan}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Termini za izabrani dan */}
          {datum && (
            <div className="mt-6">
              <p className="text-sm text-neutral-400">Slobodni termini za {datum}:</p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {TERMINI.map((t) => {
                  const zauzet = zauzeto[datum]?.includes(t);
                  return (
                    <button
                      key={t}
                      disabled={zauzet}
                      onClick={() => setTermin(t)}
                      className={`border py-3 font-bold transition ${
                        termin === t ? "border-plava bg-plava text-black" : "border-white/20 hover:border-plava"
                      } disabled:cursor-not-allowed disabled:opacity-25 disabled:line-through`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* DESNO: forma */}
        <form onSubmit={posalji} className="space-y-4 border border-white/10 bg-white/5 p-6">
          {/* NOVO: datum i termin idu sa formom, ali se ne vide */}
          <input type="hidden" name="datum" value={datum ?? ""} />
          <input type="hidden" name="termin" value={termin ?? ""} />

          <p className="font-bold">
            {datum && termin ? (
              <>Izabrano: <span className="text-plava cursor-pointer">{datum} u {termin}</span></>
            ) : (
              <span className="text-neutral-400">Prvo izaberi datum i termin.</span>
            )}
          </p>

          <input name="ime_prezime" placeholder="Ime i prezime" required className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-plava" />
          <input name="telefon" type="tel" placeholder="Broj telefona" required className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-plava" />

          <div className="grid grid-cols-2 gap-4">
            <input name="marka" placeholder="Marka (npr. VW)" required className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-plava" />
            <input name="model" placeholder="Model (npr. Golf 7)" required className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-plava" />
          </div>

          <textarea name="opis" placeholder="Opiši šta se dešava sa autom..." rows={5} required className="w-full border border-white/20 bg-black px-4 py-3 outline-none focus:border-plava" />

          {/* NOVO: poruka o gresci */}
          {greska && <p className="text-sm text-red-400">❌ {greska}</p>}

          <button
            disabled={!datum || !termin || salje}
            className="w-full cursor-pointer bg-plava py-3 font-semibold text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            {salje ? "Šalje se..." : "Pošalji rezervaciju"}
          </button>
        </form>
      </div>
    </div>
  );
}