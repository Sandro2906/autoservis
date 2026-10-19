# BMW M5 E60 - scroll animacija

Next.js 15 (App Router) + JavaScript + Tailwind CSS 4 + ESLint

## Pokretanje
npm install
npm run dev
Otvori http://localhost:3000

Provjera koda: npm run lint

## Struktura
app/
  layout.js                 osnovni HTML okvir
  page.js                   stranica (animacija + sekcija ispod)
  globals.css               Tailwind + nasa plava boja (text-plava, bg-plava)
  components/ScrollVideo.js sva logika (slike, scroll, tekstovi)
public/frames/              240 slika iz videa (1920x1080, izostrene)

## Kako radi
- Video je izrezan u 240 slika (public/frames).
- Procenat skrola (0 do 1) se pretvara u broj slike koja se crta na <canvas>.
- Tekstovi su u nizu TEKSTOVI u ScrollVideo.js ("od" i "do" su procenti skrola).
- Pozicije teksta (Tailwind klase) su u objektu POZICIJE.
- Duzina animacije: klasa h-[600vh] na <section> (vise = sporije).

## Novi video (sa izostravanjem i povecanjem na 1920x1080)
ffmpeg -i video.mp4 -an -vf "hqdn3d=2:2:0:0,scale=1920:1080:flags=lanczos,cas=0.5,unsharp=5:5:0.4" -c:v libwebp -quality 85 public/frames/frame_%04d.webp

- hqdn3d  = uklanja sum (zrnca) iz videa
- scale   = povecava na 1920x1080 (lanczos = najostrije klasicno povecanje)
- cas i unsharp = izostravanje ivica
Pa promijeni BROJ_SLIKA u ScrollVideo.js.
