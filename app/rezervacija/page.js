import db from "@/app/lib/db";
import Kalendar from "@/app/components/Kalendar";

// Stranica se ucitava svjeze svaki put (da uvijek vidi najnovije rezervacije)
export const dynamic = "force-dynamic";

export default async function RezervacijaPage() {
  const [rows] = await db.query(
    "SELECT datum, termin FROM rezervacije WHERE datum >= CURDATE()"
  );

  // Pretvori u oblik { "2026-10-20": ["17:00", "18:00"], ... }
  const zauzeto = {};
  for (const r of rows) {
    if (!zauzeto[r.datum]) zauzeto[r.datum] = [];
    zauzeto[r.datum].push(r.termin);
  }

  return <Kalendar zauzeto={zauzeto} />;
}