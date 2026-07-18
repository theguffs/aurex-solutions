# Aurex Solutions

Sito di raccolta CV per chi cerca lavoro a Roma come **cameriere**, **barista**, **cuoco** o **hostess**.  
Nessuna agenzia pubblica sul sito: quando hai una posizione, contatti tu i candidati per telefono o WhatsApp.

## Avvio locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Configurazione

Copia `.env.example` in `.env.local` e completa:

| Variabile | Uso |
|-----------|-----|
| `NOTIFY_EMAIL` | Email dove ricevi le candidature |
| `RESEND_API_KEY` | API key [Resend](https://resend.com) |
| `RESEND_FROM` | Mittente verificato su Resend |
| `LEADS_WEBHOOK_URL` | Opzionale: Make / Zapier / Google Apps Script → Sheet |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email pubblica in footer/contatti |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_GA_ID` | Opzionale: Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Opzionale: Meta Pixel |

Senza Resend, le candidature vengono comunque salvate in locale in `data/candidature.json` e i CV in `data/cv/`.

### Collegare Google Sheet (consigliato)

1. Crea uno scenario Make/Zapier: webhook → Google Sheets (nuova riga).
2. Oppure uno script Apps Script che riceve POST JSON e scrive sul foglio.
3. Incolla l’URL in `LEADS_WEBHOOK_URL`.

## Pagine

- `/` — home
- `/candidati` — form
- `/lavoro-cameriere-roma`, `/lavoro-barista-roma`, `/lavoro-cuoco-roma`, `/lavoro-hostess-roma` — SEO
- `/privacy` — informativa

## Deploy

1. Domino `.it` (es. `camerieriroma.it`)
2. Deploy su [Vercel](https://vercel.com) collegando il repo
3. Imposta le variabili d’ambiente nel pannello Vercel

Su Vercel il filesystem è effimero: per produzione usa Resend (email + CV allegato) e/o il webhook verso Sheet.

## Pubblicità

Campagne verso chi cerca lavoro:

- Google Ads: “lavoro cameriere Roma”, “lavoro barista Roma”, ecc.
- Meta Ads: targeting Roma, 18–45, hospitality
- Misura il **costo per CV completo** (telefono valido)
