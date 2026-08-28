# PORT-4

Bilingual (EN / AR, with full RTL) marketing site and content dashboard for **PORT-4**, a software development team.

Every piece of copy on the public site is editable from the built-in dashboard, in both languages, and persists to `localStorage`.

## Stack

- **React 18** + **JavaScript** (Vite)
- **Tailwind CSS 3** — brand tokens in [`tailwind.config.js`](tailwind.config.js)
- **Redux Toolkit** — content, i18n, auth, UI state
- **React Router 6** — public site + `/dashboard` route
- **Framer Motion** — page and section animations

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Routes

- `/` — the public site.
- `/dashboard` — content dashboard (passcode gate; default: `port4`).

## Editing content

Open `/dashboard`, sign in, and use the sidebar to edit any section. Fields with translations show EN and AR side-by-side. Changes save to your browser instantly.

To reset to the defaults shipped in the source, click **"Reset to defaults"** in the dashboard topbar (or run `localStorage.clear()` in DevTools).

## Language & RTL

Both the site and dashboard include an `EN / ع` toggle. Switching to Arabic sets `<html dir="rtl">`, swaps fonts to IBM Plex Sans Arabic, and applies RTL-aware spacing and icon direction throughout.

## Project layout

```
src/
  App.jsx                # router shell + dir/lang application
  main.jsx               # store hydration + mount
  index.css              # Tailwind + brand base
  routes/
    PublicSite.jsx       # public marketing page
    Dashboard.jsx        # dashboard shell + child routes
  components/            # public site sections (Hero, Services, ...)
  dashboard/             # dashboard shell + editors
    editors/             # one editor per content section
  store/                 # slices: content, i18n, auth, ui, contact, services + persist middleware
  data/defaults.js       # default site content (EN + AR)
  i18n/translations.js   # UI chrome strings (EN + AR)
  hooks/useLocalized.js  # useLang / useT / useContent
```

## Notes

- The auth gate is a client-side passcode intended for demo purposes. Wire a real backend before shipping to production.
- The contact form is UI-only (no backend). Connect it to your preferred email service (Resend, Postmark, SendGrid, etc.) when integrating.
