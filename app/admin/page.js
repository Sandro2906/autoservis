import { redirect } from "next/navigation";
import db from "@/app/lib/db";
import { isAdmin } from "@/app/lib/auth";
import { logoutAdmin, obrisiRezervaciju } from "@/app/lib/actions";

export default async function AdminDashboard() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  const [rezervacije] = await db.query(
    "SELECT * FROM rezervacije ORDER BY datum, termin"
  );

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-plava">Rezervacije</span> ({rezervacije.length})
        </h1>

        <form action={logoutAdmin}>
          <button className="border border-white/20 px-4 py-2 hover:bg-white/10 cursor-pointer">Odjavi se</button>
        </form>
      </div>

      {rezervacije.length === 0 && (
        <p className="mt-8 text-neutral-400">Još nema rezervacija.</p>
      )}

      <div className="mt-8 space-y-3">
        {rezervacije.map((r) => (
          <div key={r.id} className="border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <p className="font-bold text-plava">{r.datum} · {r.termin}</p>
              {r.status === "nova" && (
                <span className="bg-plava px-2 py-0.5 text-xs font-bold text-black">NOVA</span>
              )}
            </div>
            <p className="mt-2 text-lg font-bold">{r.ime_prezime}</p>
            <p className="text-neutral-400">{r.marka} {r.model}</p>
            <p className="mt-2 text-neutral-300">{r.opis}</p>
            <a href={`tel:${r.telefon}`} className="mt-2 inline-block text-plava">📞 {r.telefon}</a>
            <p className="mt-2 text-xs text-neutral-500">Poslano: {r.kreirano}</p>

            {/* Brisanje rezervacije */}
            <form action={obrisiRezervaciju} className="mt-4 ">
              <input type="hidden" name="id" value={r.id} />
              <button className="border border-red-400/50 px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 cursor-pointer">
                Obriši
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}