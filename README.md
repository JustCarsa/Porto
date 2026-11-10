# Spotify Web Player Clone 🎵

Sebuah aplikasi web interaktif pemutar musik dengan antarmuka (UI/UX) yang terinspirasi langsung dari **Spotify Web Player**. Dibuat menggunakan teknologi modern HTML5, CSS3, dan JavaScript (Vanilla ES6+) yang ringan, cepat, dan responsif.

![Spotify Clone Preview](https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Fitur Utama

### 1. 🎨 Desain & Tampilan Khas Spotify (Dark Theme)
- **Spotify Palette**: Warna dasar gelap `#121212` & `#181818`, aksen hijau Spotify (`#1ed760`), teks kontras tinggi, dan scrollbar elegan.
- **Dynamic Gradient Header**: Warna gradien dinamis pada header playlist yang beradaptasi dengan warna dominan cover album.
- **Hover Micro-interactions**: Tombol putar hijau mengambang dengan efek transisi halus saat kartu atau baris lagu disorot.
- **Animated Audio Equalizer**: Indikator visual 3-bar equalizer bergerak pada lagu yang sedang diputar.

### 2. 🧭 Navigasi & Halaman (Single Page App)
- **Home View**:
  - Sapaan cerdas dinamis berdasarkan waktu (*"Selamat Pagi"*, *"Selamat Siang"*, *"Selamat Sore"*, *"Selamat Malam"*).
  - 6 Quick-play cards di bagian atas.
  - Section *Dibuat Untuk Kamu*, *Populer di Indonesia*, *Artis Populer*, dan *Fokus & Coding Santai*.
- **Search & Browse View**:
  - Live Real-time Search: Cari judul lagu, nama artis, atau album secara instan.
  - Kartu "Hasil Teratas" (*Top Result*) dan daftar hasil lagu.
  - Kategori penjelajahan (*Pop, Indie, Santai/Lofi, Rock, Podcast, K-Pop, Gaming, R&B*) dengan visual kartu bergaya miring khas Spotify.
- **Playlist Detail View**:
  - Banner playlist lengkap dengan cover art, judul, deskripsi, nama pembuat, dan durasi total.
  - Tabel daftar lagu interaktif lengkap dengan nomor urut, judul, nama album, tanggal, durasi, dan tombol suka.
- **Lagu yang Disukai (Liked Songs)**:
  - Halaman khusus berisi semua lagu yang telah kamu beri tanda *Love*.
- **Lyrics View (Lirik Karaoke)**:
  - Tampilan lirik lagu berukuran besar yang tersinkronisasi otomatis dengan durasi lagu.
  - Klik baris lirik mana saja untuk langsung melompat (*seek*) ke bagian lagu tersebut.
- **Queue View (Antrean)**:
  - Melihat lagu yang sedang diputar dan daftar lagu berikutnya dalam antrean.

### 3. 🎧 Audio Player Engine Lengkap
- **Pemutaran Audio Asli**: Dilengkapi sampel audio nyata.
- **Smart Web Audio Synth Fallback**: Apabila koneksi internet terputus atau audio URL gagal dimuat, sistem Web Audio API bawaan akan menghasilkan nada lofi santai secara otomatis sehingga musik tidak pernah hening.
- **Kontrol Lengkap**:
  - Play / Pause (sinkron di player bar, card, dan playlist banner)
  - Next / Previous track
  - Mode Acak (Shuffle) dengan indikator titik hijau
  - Mode Ulangi (Repeat All & Repeat One dengan badge `1`)
  - Progress bar interaktif (dapat diklik dan digeser / scrub)
  - Pengatur volume suara + tombol Mute/Unmute
  - Tombol suka (*Heart*) yang memperbarui status di seluruh halaman
  - Layar Penuh (*Fullscreen*)

### 4. ⌨️ Pintasan Keyboard (Shortcuts)
- `Spasi` : Putar / Jeda (Play / Pause)
- `Panah Kanan (→)` : Maju 5 detik
- `Panah Kiri (←)` : Mundur 5 detik
- `Panah Atas (↑)` : Naikkan volume 5%
- `Panah Bawah (↓)` : Turunkan volume 5%
- `M` : Mute / Unmute suara
- `L` : Beri tanda suka / batal suka lagu saat ini

---

## 🚀 Cara Menjalankan Project

Karena project ini menggunakan **Pure HTML5, CSS3, dan Vanilla JavaScript**, kamu tidak memerlukan proses instalasi build tools yang rumit!

### Cara 1: Buka Langsung di Browser
Cukup klik dua kali file `index.html` di file manager kamu atau buka melalui Google Chrome / Firefox / Safari.

### Cara 2: Menjalankan dengan Python Web Server
Jalankan perintah berikut di terminal:
```bash
python3 -m http.server 3000
```
Lalu buka browser di alamat:
```
http://localhost:3000
```

---

## 📁 Struktur File

```
pain/
├── index.html        # Struktur markup HTML aplikasi Spotify
├── css/
│   └── style.css     # Styling Spotify (Dark mode, layout grid, animasi, responsif)
├── js/
│   ├── data.js       # Database lagu, playlist, kategori penjelajahan, dan lirik
│   ├── player.js     # Mesin audio player, antrean, kontrol, & Web Audio synth fallback
│   └── app.js        # Logika aplikasi, navigasi view, pencarian, & interaktivitas
└── README.md         # Dokumentasi project
```

---

Dibuat dengan dedikasi untuk menghadirkan pengalaman mendengarkan musik yang nyaman dan otentik layaknya Spotify. Selamat menikmati alunan musik! 🎧
