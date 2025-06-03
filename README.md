# Warung Madura Syaiful - Deployment Guide

## Aplikasi React untuk Warung Madura dengan fitur Kos Putra

### Teknologi yang Digunakan

- React 19.1.0 dengan TypeScript
- React Router untuk routing
- Styled Components untuk styling
- Lucide React untuk icons

### Fitur Utama

- Katalog produk kebutuhan sehari-hari
- Listing kamar kos untuk putra
- Detail halaman kamar dengan foto owner dan peta lokasi
- Responsive design untuk semua device
- Tema Madura yang autentik

### Deploy ke Vercel

#### Langkah 1: Persiapan

Pastikan semua file konfigurasi sudah ada:

- ✅ `vercel.json` - Konfigurasi routing SPA
- ✅ `public/_redirects` - Fallback routing
- ✅ `package.json` dengan `"homepage": "."`

#### Langkah 2: Commit dan Push

```bash
git add .
git commit -m "Fix SPA routing - ready for Vercel deployment"
git push origin main
```

#### Langkah 3: Vercel Auto-Deploy

- Vercel akan otomatis detect perubahan
- Build akan menggunakan npm run build
- Deploy akan menggunakan folder `build/`

### Troubleshooting Error 404

Jika masih mendapat error 404 setelah deploy:

1. **Cek Vercel Dashboard**

   - Pastikan build berhasil
   - Cek function logs untuk error

2. **Cek Build Output**

   - Pastikan `build/index.html` ada
   - Pastikan static files di `build/static/`

3. **Test Routes**
   - Home: `/`
   - Kos: `/kos`
   - Room Detail: `/kos/1`

### Local Development

```bash
npm install
npm start
```

### Production Build

```bash
npm run build
npm install -g serve
serve -s build
```

### Environment

- Node.js 16+
- npm 8+

Aplikasi ini sudah dioptimasi untuk deployment di Vercel dengan konfigurasi SPA routing yang benar.
