# Hammurabi Restaurang – hemsida

Statisk en-sidig webbplats för **Hammurabi Restaurang**, en irakisk och kurdisk
kolgrill i Årsta, Stockholm. Byggd med ren HTML5, modern CSS och lite vanilla
JavaScript – **inget ramverk och inget byggsteg**. Enkel att hosta och underhålla.

---

## Innehåll
- Sticky meny med ankarnavigering och mobilanpassad hamburgermeny
- Hero, Om oss, Meny (6 kategorier), Galleri, Öppettider, Hitta hit och Footer
- Live-status **"Öppet nu / Stängt just nu"** baserat på aktuell tid och veckodag
- Inbäddad Google Maps-karta, klickbar telefon- och e-postlänk
- Optimerad för lokal Google-sökning: meta-taggar, Open Graph, Twitter Card och
  strukturerad data (schema.org `Restaurant`, JSON-LD)
- Kontaktformulär förberett för **Netlify Forms**

---

## Filstruktur
```
hammurabi_restaurang/
├── index.html        # All sidans innehåll
├── css/style.css     # Design och layout (CSS-variabler, responsivt)
├── js/main.js        # Mobilmeny, scrollspy, öppet/stängt-status
├── images/           # Platshållarbilder (byt ut mot egna foton)
├── favicon.svg       # Ikon i webbläsarfliken
├── robots.txt        # För sökmotorer
├── sitemap.xml       # Webbplatskarta
├── netlify.toml      # Netlify-inställningar (headers, cache)
└── README.md         # Den här filen
```

---

## Förhandsgranska lokalt

**Enklast:** dubbelklicka på `index.html` så öppnas sidan i din webbläsare.

**Bättre (rekommenderas, så att kartan och formuläret beter sig som på webben)** –
starta en lokal webbserver i projektmappen:

```bash
# Har du Python installerat:
python -m http.server 8000
# Öppna sedan http://localhost:8000 i webbläsaren
```

Alternativt: installera tillägget **Live Server** i VS Code och klicka "Go Live".

---

## Publicera

### Alternativ A – Netlify (rekommenderat)
1. Koden finns på GitHub: `https://github.com/lukasbjork/hammurabi_restaurang`
2. Logga in på [netlify.com](https://www.netlify.com) → **Add new site → Import an existing project**
3. Välj GitHub och repot `hammurabi_restaurang`
4. Lämna build-kommandot tomt och **Publish directory** = `.` (rot). Klicka **Deploy**.
5. Klart! Sidan publiceras automatiskt vid varje ny push.

   **Kontaktformuläret** fungerar direkt på Netlify (Netlify Forms). Inkomna
   meddelanden hittar du under **Forms** i Netlify-panelen. Lägg gärna till en
   notifiering till din e-post under *Forms → Settings → Form notifications*.

### Alternativ B – Vercel (om Netlifys gratiskvot är slut)
1. Logga in på [vercel.com](https://vercel.com) → **Add New → Project** → importera repot
2. Framework Preset = **Other**, Output Directory = `.` (rot). Klicka **Deploy**.

   OBS: På Vercel fungerar **inte** Netlify Forms. Kontaktformuläret blir då en
   platshållare – koppla det till en gratis mejltjänst som
   [Formspree](https://formspree.io) eller [Web3Forms](https://web3forms.com)
   (byt `action`/inställningar i `<form>` enligt deras guide), eller ta bort
   formuläret och hänvisa till telefon.

### Alternativ C – valfritt webbhotell
Ladda bara upp alla filer (behåll mappstrukturen) till webbhotellets `public_html`
eller motsvarande. Ingen server eller databas behövs.

> Efter publicering: uppdatera URL:erna `https://hammurabi-restaurang.netlify.app/`
> i `index.html` (canonical, og:url, JSON-LD), `robots.txt` och `sitemap.xml` till
> din riktiga domän.

---

## ✅ Checklista för ägaren (det här bör du uppdatera)

- [ ] **Riktig meny & priser** – alla rätter och priser i menyn är *exempel*. Byt ut
      dem i `index.html` (sektionen med `id="meny"`).
- [ ] **Egna bilder** – ersätt platshållarna i `images/` med egna foton. Behåll
      filnamnen (se `images/README.txt`) så slipper du ändra i koden.
- [ ] **E-postadress** – byt `info@hammurabirestaurang.se` mot din riktiga adress
      (sök i `index.html`).
- [ ] **Sociala medier** – lägg in riktiga länkar till Instagram och Facebook
      (sök efter `social-link` i `index.html`).
- [ ] **Delningsbild (og-image)** – byt `images/og-image.jpg` mot en egen bild,
      exakt 1200 × 630 px.
- [ ] **Kontaktformulär** – fungerar på Netlify direkt. På annat webbhotell, koppla
      till en mejltjänst (se Alternativ B).
- [ ] **Google Maps & koordinater** – kontrollera att kartnålen hamnar rätt och
      justera vid behov `latitude`/`longitude` i JSON-LD i `index.html`.
- [ ] **Öppettider** – om tiderna ändras, uppdatera dem på tre ställen: listan i
      `index.html` (sektionen `id="oppettider"`), `HOURS`-objektet i `js/main.js`
      och `openingHoursSpecification` i JSON-LD.
- [ ] **Domän** – koppla gärna en egen domän (t.ex. `hammurabirestaurang.se`) och
      uppdatera URL:erna enligt rutan ovan.

---

## Snabbstart
1. Öppna projektmappen.
2. Dubbelklicka `index.html` (eller kör `python -m http.server 8000`).
3. Surfa runt, testa menyn och "Öppet nu"-statusen.
4. Byt ut bilder, meny och kontaktuppgifter enligt checklistan.
5. Pusha till GitHub och koppla till Netlify – klart att gå live.
