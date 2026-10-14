# MIGRATION_HANDOVER.md — Handover Sesi: Evaluasi Migrasi Unsur → Vue/Nuxt

> Dokumen ini untuk AI agent penerus. Semua klaim di bawah sudah diverifikasi
> langsung dari kode repositori pada sesi evaluasi tanggal 2026-10-09.
> Bahasa kerja: Indonesia. User berkomunikasi dalam Bahasa Indonesia.

---

## 1. Konteks Permintaan User

User ingin **memigrasikan proyek ini dari Next.js ke Vue atau Nuxt** dan meminta:
1. ✅ Evaluasi batasan (constraints) & blocker migrasi — SELESAI (sesi ini).
2. ✅ Trade-off Vue murni vs Nuxt + rekomendasi — SELESAI (sesi ini).
3. ⬜ **Rencana migrasi bertahap (checklist per fase)** — BELUM DIBUAT.
   Ini adalah langkah berikutnya setelah user mengonfirmasi pilihan path.

Status keputusan: **Rekomendasi sudah diberikan (Nuxt 3 + SSG), user BELUM
secara eksplisit mengkonfirmasi.** Jangan mulai eksekusi migrasi sebelum user
konfirmasi — tanyakan dulu jika sesi baru dimulai tanpa konfirmasi itu.

---

## 2. Profil Proyek (faktual, hasil inspeksi)

- Root: `/Users/zou/Labs/personal/unsur`, branch `main` (sinkron dengan origin).
- Git status saat handover: hanya 1 file untracked — `IMPROVEMENT_PLAN.md`
  (berisi rencana enhancement 9 kelompok fitur: search/filter, heatmap,
  comparison drawer, quiz, timeline, temperature sim, 3D/AR, a11y, PWA).
- Package manager: **pnpm**. Verify command saat ini: `pnpm run lint`,
  `pnpm run build`.
- Stack saat ini:
  - Next.js `14.2.25` (App Router), React `18.2.0`, TypeScript `4.9.5`
  - Tailwind `3.4.17` (+ tailwindcss-animate, aspect-ratio plugin dimatikan
    via `corePlugins`)
  - shadcn/ui primitives: Radix UI (dialog, select, separator, slot, tabs,
    tooltip), cva, clsx, tailwind-merge, lucide-react
  - 3D: `@react-three/fiber 8.12.0`, `@react-three/drei 9.57.3`,
    `three 0.150.1`, `three-stdlib`
  - Animasi: `@react-spring/web 9.7.1` (TERDAFTAR di package.json tapi TIDAK
    ADA file yang mengimpornya — cek lagi sebelum membawa ke stack baru)
  - d3 modules (array, color, interpolate-path, scale, scale-chromatic, shape)
    + d3-array dsb — dipakai di `src/lib/color-helpers.tsx` dsb.
- Halaman hanya 2: `/` dan `/acknowledgment`. Tidak ada API route,
  tidak ada `getServerSideProps`/`getStaticProps`, tidak ada data-fetch:
  seluruh data elemen = file statis di repo.
- Ukuran: ~40 file source. File terbesar:
  `src/data/elemens-data-v2.ts` (~6.936 baris, data 118 unsur termasuk
  lantanida/aktinida), `src/components/ui/sidebar.tsx` (788 baris),
  `src/data/elemens-data.ts` (versi lama, kemungkinan duplikat/sisa —
  diimpor oleh `src/hooks/use-element-store.tsx` awalnya tapi yang aktif
  sekarang `elemens-data-v2`; konfirmasi sendiri sebelum membuang).

Struktur kunci:
```
src/app/{layout,page}.tsx, src/app/acknowledgment/{layout,page}.tsx
src/components/layout/{app-header,app-sidebar,header-logo}.tsx
src/components/ui/{sidebar,button,input,select,separator,sheet,tabs,tooltip,skeleton,icon}.tsx
src/components/periodic-table/{periodic-table,element-tile,element-tile-detail,element-detail,detail-rows}.tsx
src/components/atom/{model-wrapper,bohr-model,bohr-atom}.tsx
src/Components/element-tile.tsx  (versi lama, cek apakah masih dipakai)
src/hooks/{use-element-store.tsx,useInterval.ts,use-mobile.tsx}
src/data/{elemens-data-v2.ts,elemens-data.ts,label.ts}
src/lib/{color-helpers.tsx,temperature-helpers.ts,utils.ts}
src/types/global.ts
```

---

## 3. Hasil Evaluasi Migrasi (temuan terverifikasi)

### 3.1 Blocker utama (rewrite wajib, bukan swap import)

1. **shadcn/ui + Radix → shadcn-vue + Reka UI (radix-vue).**
   9 komponen UI di `src/components/ui/`. Paling berat: `sidebar.tsx` (788
   baris; composisi Radix Dialog+Tooltip+dropdown, cookie `sidebar_state`,
   `useSidebar` consumer, hover-safe expand, `usePathname` gate untuk halaman
   acknowledgment di line ~122-124). shadcn-vue punya block Sidebar ekuivalen
   tapi tetap butuh porting disiplin. Estimasi: 1–2 hari.
2. **R3F/drei → TresJS.** Hanya 2 file: `src/components/atom/model-wrapper.tsx`
   (client-only `<Canvas>` + OrbitControls + Suspense, height 13rem) dan
   `bohr-model.tsx` (auto-generated gltfjsx: `useGLTF`, `useAnimations`,
   manpulasi material imperatif `MeshStandardMaterial` via `useEffect`,
   overwrite `color/metalness/roughness/specularIntensity`).
   Konsep deklaratif TresJS beda; logika material tetap imperatif three.js.
   Estimasi: ~1 hari.
3. **React Context → Pinia (atau provide/inject).**
   `src/hooks/use-element-store.tsx`: Context `ElementStoreProps`
   (element + setElementOnSidebar), membuka sidebar mobile/desktop lewat
   `useSidebar().setOpen/setOpenMobile`, `useIsMobile` (matchMedia 768px).
   Pola inter-store ini harus dirancang ulang di Pinia.

### 3.2 Aman dibawa langsung (agnostik framework)

- Tailwind config + design token — carry-over tanpa perubahan
  (`tailwind.config.js`, `src/styles/globals.css`; ekstensi custom
  grid-cols-18, fontSize xxxs, radius-var, semua warna hsl-var).
- Data & tipe: `elemens-data-v2.ts`, `types/global.ts`, `label.ts`.
- Helper: `temperature-helpers.ts`, `color-helpers.ts`, `utils.ts`,
  `useInterval.ts`.
- SVG Bohr statis `bohr-atom.tsx` (bukan 3D; pakai class animate-spin +
  duration dinamis) — porting ke Vue praktis mekanis.
- Semua logika aplikasi: 100% client-side (semua page/berat 'use client'
  kecuali layout + acknowledgment; tidak ada data-fetch server).

### 3.3 Penggantian API Next-specific (mechanis)

| Next.js | Pengganti (Nuxt) |
|---|---|
| `next/link` (5 file: element-tile, header-logo, app-header, acknowledgment/page, element-tile-detail) | `NuxtLink` |
| `usePathname` (app-header, sidebar) | `useRoute().path` |
| `next/image` (element-tile, header-logo, detail-rows) | `<img>` biasa ATAU `@nuxt/image` |
| `metadata` / `generateMetadata` (layout.tsx, acknowledgment/layout.tsx) | `useHead()` / `useSeoMeta()` |
| `images.domains` di next.config.js | `nuxt-img` domains config (kalau pakai @nuxt/image) |

Host remote yang perlu di-whitelist jika pakai image optimizer:
`upload.wikimedia.org`, `images-of-elements.com`,
`storage.googleapis.com` (untuk `.glb` model 3D dari Google Arts & Culture
Art Experiments — URL berpola
`https://storage.googleapis.com/search-ar-edu/periodic-table/element_NNN_<name>/element_NNN_<name>.glb`).

### 3.4 Catatan lingkungan (penting untuk agent penerus)

- Shell env di mesin user: `NODE_ENV=production` persisten pada terminal
  Hermes — saat menjalankan dev server gunakan
  `NODE_ENV=development pnpm exec vite ...` (atau padanan) agar
  `import.meta.env.DEV` tidak false.
- User menjalankan dev server sendiri; verifikasi UI cukup lewat instans
  yang sudah jalan — JANGAN start dev server baru.
- Konvensi prioritas kerja: selalu branch terpisah (bukan main), commit
  per perubahan logis, JANGAN merge tanpa diminta.

---

## 4. Keputusan & Rekomendasi yang Sudah Disampaikan ke User

**Rekomendasi final: Nuxt 3 + SSG (prerender), bukan Vue murni.**

Argumen inti yang sudah dikomunikasikan:
1. Rdmap akan tumbuh (PWA, quiz, timeline, API eksternal — dari
   IMPROVEMENT_PLAN.md). Mulai dari Vue murni berpotensi migrasi dua kali.
2. Cost porting nyaris identik di kedua path; overhead tambahan Nuxt tipis
   (useHead + ClientOnly untuk canvas).
3. SEO penting karena ini situs edukasi publik.
4. Nuxt + SSG tetap menghasilkan static output (prerender), jadi kebingungan
   deploy "butuh Node runtime" bisa diatasi.

Kapan user harus memilih Vue murni: kalau proyek dijamin tetap kecil
(2 halaman, tanpa PWA/i18n/API) dan tujuan migrasi murni belajar Vue.

Trade-off ringkas sudah disampaikan ke user di percakapan sebelumnya;
rinciannya:
- Vue murni: migration surface terkecil; deploy static paling murni; tapi
  SEO kosong (CSR), PWA/i18n/sitemap dirakit sendiri.
- Nuxt: SSR/SSG + useHead + modul ekosistem (i18n, PWA, image, eslint)
  siap pakai; konvensi folder + auto-import; tapi overhead hydration/Nitro
  dan risiko debug WebGL-in-SSR klasik (mitigasi: `<ClientOnly>` / `ssr:false`
  di komponen canvas).

---

## 5. Langkah Lanjutan (untuk agent penerus)

Urutan kerja yang disepakati sebelumnya:

1. **Konfirmasi user: pilih Nuxt+SSG atau Vue murni.** (Skip jika user
   sudah mengonfirmasi di pesan berikutnya.)
2. Buat rencana migrasi bertahap (checklist per fase), urutan fase:
   a. Scaffolding proyek baru (Nuxt 3 + SSG, atau Vue+Vite) di branch
      terpisah, semisal `feat/migrate-nuxt`.
   b. Port data + tipe + helper (frame-agnostic).
   c. Port UI kit (shadcn-vue + Reka UI), mulai sidebar.
   d. Port 3D (TresJS) + SVG Bohr.
   e. Port route + header + meta (useHead), acknowledgment page.
   f. Build & verify (`pnpm run build` di proyek baru; tambahkan perbandingan
      visual terhadap app lama bila diminta).
3. Pertahankan Next.js app lama sampai proyek baru paritas fitur.

---

## 6. Batas Tugas Agent Penerus (jangan lampaui)

- Tidak ada izin commit/push ke main; kerja di branch terpisah.
- Jangan mulai eksekusi migrasi sebelum user menyetujui pilihan path.
- Semua angka estimasi di dokumen ini adalah PERKIRAAN konservatif berbasis
  kompleksitas kode, bukan hasil benchmark — sampaikan ulang sebagai estimasi,
  bukan kepastian.
