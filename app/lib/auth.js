import { cookies } from "next/headers";
import db from "@/app/lib/db";

export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_sesija")?.value;

  if (!token) return false;

  const [rows] = await db.query(
    "SELECT * FROM sesije WHERE token = ? AND istice > NOW()",
    [token]
  );

  return rows.length > 0;
}