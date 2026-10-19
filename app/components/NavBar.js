"use client";

import Link from "next/link";
import { useState } from "react";

const LINKOVI = [
  { naziv: "Početna", href: "/" },
  { naziv: "O nama", href: "/#o-nama" },
  { naziv: "Usluge", href: "/#usluge" },
  { naziv: "Kontakt", href: "/#kontakt" },
];

export default function Navbar() {
  const [otvoren, setOtvoren] = useState(false);

  return (
   <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold">
          Autoservis <span className="text-plava">„DS“</span>
        </Link>

        {/* Linkovi za veci ekran */}
        <div className="hidden items-center gap-8 md:flex">
          {LINKOVI.map((link) => (
            <Link key={link.naziv} href={link.href} className="text-neutral-300 hover:text-white">
              {link.naziv}
            </Link>
          ))}
          <Link
            href="/rezervacija"
            className="rounded-lg bg-plava px-4 py-2 font-semibold text-black hover:bg-white"
          >
            Rezerviši pregled
          </Link>
        </div>

        {/* Dugme za meni na telefonu */}
        <button onClick={() => setOtvoren(!otvoren)} className="text-3xl md:hidden">
          {otvoren ? "✕" : "☰"}
        </button>
      </div>

      {/* Meni na telefonu */}
      {otvoren && (
        <div className="flex flex-col gap-4 px-6 pb-6 md:hidden">
          {LINKOVI.map((link) => (
            <Link
              key={link.naziv}
              href={link.href}
              onClick={() => setOtvoren(false)}
              className="text-lg text-neutral-300 hover:text-white"
            >
              {link.naziv}
            </Link>
          ))}
          <Link
            href="/rezervacija"
            onClick={() => setOtvoren(false)}
            className="rounded-lg bg-plava px-4 py-3 text-center font-semibold text-black"
          >
            Rezerviši pregled
          </Link>
        </div>
      )}
    </nav>
  );
}