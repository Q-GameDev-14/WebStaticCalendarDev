**DYNAMMIC CALENDAR & IMSAKIYAH SPA**

**PROJECT OVERVIEW**
Aplikasi ini adalah Single Page Application (SPA) berbasis web yang berfungsi sebagai kalender bulanan dinamis yang terintegrasi langsung dengan jadwal sholat real-time. Dibangun dengan pendekatan Vanilla JavaScript modern dan arsitektur modular, aplikasi ini dirancang untuk beradaptasi secara otomatis dengan event tertentu—seperti mengubah antarmuka menjadi Mode Imsakiyah secara otomatis saat memasuki bulan suci Ramadan.

Tujuan utama pembuatan proyek ini adalah menyediakan jadwal waktu sholat yang akurat, elegan, dan ringan tanpa bergantung pada framework besar, sekaligus mendemonstrasikan praktik terbaik dalam manipulasi DOM, pemanggilan API asinkron, dan manajemen state tema berbasis tanggal.

**FEATURES**
- **Dynamic Calendar Generation:** Otomatis mendeteksi bulan dan tahun saat ini tanpa memerlukan input manual.
- **Real-Time Prayer Schedule:** Mengambil jadwal sholat akurat selama satu bulan penuh berdasarkan lokasi menggunakan API eksternal.
- **Event-Based Theme System:** Sistem tema otomatis yang mendeteksi hari besar (seperti Ramadan atau Natal) dan merubah UI (warna, background, tipografi) sesuai prioritas event.
- **Real-Time Digital Clock:** Menampilkan jam digital yang diperbarui setiap detik dan disesuaikan dengan zona waktu lokal (WIB).
- **Automatic Row Highlight & Auto-Scroll:** Secara cerdas menandai baris tanggal hari ini dengan gaya visual khusus dan menggulir (scroll) tabel secara otomatis agar baris tersebut langsung terlihat oleh pengguna.
- **Fallback Calculation:** Fitur kalkulasi otomatis untuk waktu Duha jika titik akhir (endpoint) API tidak menyediakannya.
- **Modular & Scalable Architecture:** Kode dipecah menjadi modul-modul kecil (CSS dan JS) dengan tanggung jawab spesifik (Separation of Concerns).
- **Smooth Micro-Interactions:** Dilengkapi dengan staggered animation saat tabel dimuat dan efek transisi hover yang elegan.

**TECH STACK**
- **HTML5:** Struktur semantik.
- **CSS3:** Menggunakan CSS Variables (Design Tokens), Flexbox, dan Keyframe Animations tanpa framework eksternal (murni Vanilla CSS).
- **JavaScript (ES6+):** Menggunakan sistem ES Modules (import/export), async/await, dan Fetch API.
- **Aladhan API:** RESTful API eksternal penyedia data jadwal sholat.
- **Architecture:** Modular Single Page Application (SPA).

**PROJECT STRUCTURE**

project/
│
├── index.html
│
├── css/
│   ├── main.css
│   ├── layout.css
│   ├── table.css
│   ├── themes.css
│   └── animations.css
│
└── js/
    ├── app.js
    ├── calendar.js
    ├── prayerTimes.js
    ├── clock.js
    └── themeManager.js

**FILE / MODULE EXPLANATION**
**CSS MODULES**
- **main.css:** Berisi CSS reset, variabel global (design tokens untuk warna, font, transisi), dan styling dasar elemen body.
- **layout.css:** Mengatur tata letak struktur utama seperti header, container, letak lencana lokasi (location badge), dan responsivitas (media queries).
- **table.css:** Menangani seluruh desain visual tabel data, penyelarasan teks, warna kolom waktu sholat, dan status loading.
- **themes.css:** Menyimpan modifikasi styling berdasarkan class tema yang aktif (Default, Ramadhan, Natal), termasuk efek visual spesifik seperti bintang/bulan sabit berbasis CSS murni.
- **animations.css:** Mendefinisikan keyframe untuk animasi fade-in, slide-in pada baris tabel, dan efek pulse glow pada hari ini.

**JavaScript MODULES**
- **app.js:** Entry point utama atau orchestrator. Bertugas mengimpor semua modul dan menjalankan alur kerja aplikasi secara berurutan saat halaman dimuat.
- **calendar.js:** Modul UI yang bertugas merender data API ke dalam elemen <table>, memformat tampilan waktu, membuat kalkulasi fallback Duha, dan menerapkan animasi ke DOM.
- **prayerTimes.js:** Menangani logika asinkron (Fetch API) untuk mengambil data kalender bulanan dari Aladhan API.
- **clock.js:** Mengelola jam digital waktu nyata (real-time) dan memformat waktu ke zona waktu spesifik menggunakan Intl.DateTimeFormat.
- **themeManager.js:** Otak dari penentuan tema. Mengevaluasi tanggal Masehi dan Hijriah dari data API untuk memutuskan tema mana yang harus diterapkan ke body HTML dan memperbarui judul halaman.

**HOW THE APPLICATION WORKS**
1. **Inisialisasi (app.js):** Saat DOM selesai dimuat, aplikasi menjalankan jam real-time via clock.js.
2. **Pengambilan Data (prayerTimes.js):** Aplikasi mengambil objek tanggal hari ini (Bulan & Tahun) dan melakukan fetch ke Aladhan API untuk mendapatkan jadwal sholat satu bulan penuh.
3. **Evaluasi Tema (themeManager.js):** Aplikasi memeriksa data API hari ini. Jika terdeteksi bulan ke-9 Hijriah, tema diubah ke theme-ramadhan. Jika berada di rentang tanggal tertentu di bulan Desember, diubah ke theme-natal. Sisanya akan menggunakan theme-default.
4. **Rendering Tabel (calendar.js):** Data array bulanan di-looping. Waktu diformat dan disuntikkan ke dalam tabel. Jika iterasi cocok dengan tanggal hari ini, baris tersebut diberi class row-today dan browser akan otomatis men-scroll ke baris tersebut.

**INSTALLATION & USAGE**
Karena aplikasi ini menggunakan standar ES6 Modules (type="module"), aplikasi ini harus dijalankan melalui protokol http/https, bukan protokol file://.

1. **Clone Repository:**
    git clone https://github.com/username/dynamic-imsakiyah-calendar.git

2. **Buka Folder Project:**
Masuk ke direktori proyek menggunakan code editor pilihan Anda (misalnya VS Code).

3. **Jalankan Local Server:**
    - Jika menggunakan VS Code, instal ekstensi Live Server.
    - Klik kanan pada index.html dan pilih "Open with Live Server".
    - Aplikasi akan terbuka secara otomatis di browser bawaan Anda (biasanya di http://127.0.0.1:5500).

**CONFIGURATION**
Anda dapat menyesuaikan lokasi dan zona waktu aplikasi tanpa perlu mengubah logika utama. Buka file js/app.js dan modifikasi objek LOCATION_CONFIG:

const LOCATION_CONFIG = {
    city: 'Padalarang',           // Ubah sesuai kota Anda
    country: 'Indonesia',         // Negara
    method: 20,                   // 20 = Kementerian Agama RI
    timezone: 'Asia/Jakarta'      // Zona waktu (WIB)
};

**HOW TO ADD A NEW THEME**
Sistem tema di aplikasi ini dirancang agar sangat mudah diperluas (*scalable*). Jika Anda ingin menambahkan tema baru (misalnya tema Idul Fitri atau Kemerdekaan), ikuti 3 langkah mudah berikut:

**Step 1: Daftarkan Class Tema Baru di CSS**
Buka file `css/themes.css`. Buat sebuah *class* baru untuk tema Anda (contoh: `.theme-merdeka`) dan lakukan *override* pada variabel warna CSS yang diinginkan.

    /* Contoh: Tema Kemerdekaan (Merah Putih) */
    .theme-merdeka {
        --bg-main: #ffffff;
        --bg-surface: #f8fafc;
        --bg-surface-hover: #f1f5f9;
        
        --accent-color: #ef4444; /* Merah */
        --accent-glow: rgba(239, 68, 68, 0.15);
        
        --text-primary: #0f172a;
        --text-secondary: #475569;
    }

**Step 2: Tambahkan Dekorasi Visual (Opsional)**
Jika tema Anda membutuhkan dekorasi latar belakang khusus (seperti bintang pada mode Ramadhan atau salju pada mode Natal), gunakan pseudo-element pada #bg-decor di dalam file themes.css yang sama.

    .theme-merdeka #bg-decor {
        /* Tambahkan background pattern atau gradient khusus di sini */
    }

**Step 3: Daftarkan Logika Trigger di JavaScript**
Buka file js/themeManager.js. Tambahkan logika kondisional (if/else) untuk mendeteksi kapan tema tersebut harus aktif berdasarkan objek tanggal (currentDate).

    // Di dalam function initThemeManager()
    // 1. Buat rule deteksi (Contoh: 17 Agustus)
    const isKemerdekaan = (currentMonth === 7) && (currentDay === 17);

    // 2. Masukkan ke dalam rantai logika if-else
    if (displayMode === 'ramadhan') {
        // ... logika ramadhan ...
    } else if (isKemerdekaan) {
        // TERAPKAN TEMA BARU
        body.classList.add('theme-merdeka');
        mainTitle.textContent = `Spesial Kemerdekaan ${currentYear}`;
        subTitle.textContent = 'EDISI 17 AGUSTUS';
        hijriTitle.style.display = 'none';
    } else if (isNatalSeason) {
        // ... logika natal ...
    }

**FUTURE IMPROVEMENTS**
- **Geolocation API:** Menambahkan fitur deteksi lokasi otomatis berdasarkan GPS perangkat pengguna.
- **Offline Support (PWA):** Mengimplementasikan Service Workers dan manifest agar aplikasi dapat diinstal dan jadwal tetap bisa diakses saat perangkat offline.
- **Audio Notifications:** Menambahkan fitur putar suara adzan otomatis saat waktu sholat tiba.
- **Language Toggle:** Opsi multi-bahasa (Indonesia / Inggris / Arab).

**LICENSE**
Didistribusikan di bawah lisensi MIT License. Lihat LICENSE untuk informasi lebih lanjut.
