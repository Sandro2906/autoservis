"use server";

import db from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // NOVO
import { isAdmin } from "@/app/lib/auth";

export async function loginAdmin(formData) {
  const korisnik = formData.get("korisnik");
  const lozinka = formData.get("lozinka");

  const [rows] = await db.query(
    "SELECT * FROM admin WHERE korisnicko_ime = ?",
    [korisnik]
  );

  const admin = rows[0];
  const ok = admin && (await bcrypt.compare(lozinka, admin.lozinka));

  if (!ok) {
    redirect("/admin/login?greska=1");
  }

  const token = crypto.randomUUID();

  await db.query(
    "INSERT INTO sesije (token, istice) VALUES (?, NOW() + INTERVAL 7 DAY)",
    [token]
  );

  const cookieStore = await cookies();
  cookieStore.set("admin_sesija", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_sesija")?.value;

  if (token) {
    await db.query("DELETE FROM sesije WHERE token = ?", [token]);
  }

  cookieStore.delete("admin_sesija");
  redirect("/admin/login");
}

// NOVO
export async function napraviRezervaciju(formData) {
  const datum = formData.get("datum");
  const termin = formData.get("termin");
  const ime_prezime = formData.get("ime_prezime")?.trim();
  const telefon = formData.get("telefon")?.trim();
  const marka = formData.get("marka")?.trim();
  const model = formData.get("model")?.trim();
  const opis = formData.get("opis")?.trim();

  // 1. Sva polja moraju biti popunjena
  if (!datum || !termin || !ime_prezime || !telefon || !marka || !model || !opis) {
    return { greska: "Sva polja su obavezna." };
  }

  // 2. Termin mora biti jedan od tri dozvoljena
  if (!["17:00", "18:00", "19:00"].includes(termin)) {
    return { greska: "Taj termin ne postoji." };
  }

  // 3. Datum ne smije biti u proslosti ni nedjelja
  const danas = new Date().toISOString().slice(0, 10);
  const nedjelja = new Date(datum).getUTCDay() === 0;
  if (datum < danas || nedjelja) {
    return { greska: "Taj datum nije dostupan." };
  }

  // 4. Upisi u bazu
  try {
    await db.query(
      "INSERT INTO rezervacije (datum, termin, ime_prezime, telefon, marka, model, opis) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [datum, termin, ime_prezime, telefon, marka, model, opis]
    );
  } catch (err) {
    // UNIQUE (datum, termin) ne dozvoli duplu rezervaciju
    if (err.code === "ER_DUP_ENTRY") {
      return { greska: "Termin je upravo zauzet, izaberi drugi." };
    }
    return { greska: "Nešto nije u redu, pokušaj ponovo." };
  }

  revalidatePath("/admin"); // dashboard odmah vidi novu rezervaciju
  return { ok: true };
}


export async function obrisiRezervaciju(formData) {
  // Samo ulogovani admin smije brisati
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  const id = formData.get("id");

  await db.query("DELETE FROM rezervacije WHERE id = ?", [id]);

  revalidatePath("/admin");
  revalidatePath("/rezervacija");
}