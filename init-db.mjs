// init-db.mjs
// Pravi tabele u bazi iz SQL fajlova u folderu "sql".
// Pokretanje (u folderu gdje je package.json):
//   node --env-file=.env init-db.mjs
// Pokreni SAMO JEDNOM: ako SQL ima DROP TABLE, brise postojece podatke.

import fs from "fs";
import mysql from "mysql2/promise";

// 1. Nadji sve .sql fajlove u folderu "sql" (npr. init.sql)
const fajlovi = fs.readdirSync("sql").filter((f) => f.endsWith(".sql")).sort();

if (fajlovi.length === 0) {
  console.log("❌ Nema .sql fajlova u folderu sql");
  process.exit(1);
}

// 2. Spoji se na bazu (podaci iz .env)
const db = await mysql.createConnection({
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  multipleStatements: true, // dozvoli vise SQL naredbi odjednom
});

// 3. Pokreni svaki SQL fajl
for (const fajl of fajlovi) {
  const sql = fs.readFileSync(`sql/${fajl}`, "utf8");
  await db.query(sql);
  console.log(`✅ Pokrenut: ${fajl}`);
}

// 4. Ispisi koje tabele sad postoje
const [tabele] = await db.query("SHOW TABLES");
console.log("📋 Tabele u bazi:", tabele.map((t) => Object.values(t)[0]).join(", "));

await db.end();
