import { loginAdmin } from "@/app/lib/actions";

export default async function AdminLogin({ searchParams }) {
  const { greska } = await searchParams;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <form action={loginAdmin} className="w-full max-w-sm space-y-4 border border-white/10 bg-white/5 p-8">
        <h1 className="text-2xl font-bold">
          Admin <span className="text-plava">prijava</span>
        </h1>

        <input
          name="korisnik"
          placeholder="Korisničko ime"
          required
          className="w-full border border-white/20 bg-black px-4 py-3"
        />

        <input
          name="lozinka"
          type="password"
          placeholder="Lozinka"
          required
          className="w-full border border-white/20 bg-black px-4 py-3"
        />

        {greska && <p className="text-sm text-red-400">Pogrešno korisničko ime ili lozinka.</p>}

        <button className="w-full bg-plava py-3 font-semibold text-black hover:bg-white">
          Prijavi se
        </button>
      </form>
    </div>
  );
}