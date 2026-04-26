# Project UTS Pemrograman Mobile Lanjut

## Dibuat Oleh
- Bagas Bani Aryasatya
- NIM: 2410501055

## Tema
Tema yang dipilih adalah **Tema C (BookShelf)**.

## Tech Stack + Versi
- Node.js (disarankan versi LTS terbaru)
- Expo `~54.0.33`
- Expo Router `~6.0.23`
- React `19.1.0`
- React Native `0.81.5`
- TypeScript `~5.9.2`
- Zustand `^5.0.12`

## Cara Install dan Menjalankan
1. Clone repository
   ```bash
   git clone <url-repository>
   cd BookShelf
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Jalankan project
   ```bash
   npx expo start
   ```

## Screenshot Aplikasi (9 Screen)
- `screenshots/screen-home.png`
- `screenshots/screen-search-def.png`
- `screenshots/screen-search-val.png`
- `screenshots/search-screen-success.png`
- `screenshots/screen-detail.png`
- `screenshots/screen-favorite-nf.png`
- `screenshots/screen-favorite-fav.png`
- `screenshots/screen-favorit-detail.png`
- `screenshots/screen-about.png`

### Home Screen
![Home Screen](./screenshots/screen-home.png)

### Search Screen (Default)
![Search Screen Default](./screenshots/screen-search-def.png)

### Search Screen (With Query)
![Search Screen With Query](./screenshots/screen-search-val.png)

### Search Screen (Success Result)
![Search Screen Success](./screenshots/search-screen-success.png)

### Detail Screen
![Detail Screen](./screenshots/screen-detail.png)

### Favorites Screen (Kosong)
![Favorites Screen Empty](./screenshots/screen-favorite-nf.png)

### Favorites Screen (Ada Data)
![Favorites Screen With Data](./screenshots/screen-favorite-fav.png)

### Favorite Detail Screen
![Favorite Detail Screen](./screenshots/screen-favorit-detail.png)

### About Screen
![About Screen](./screenshots/screen-about.png)

## Link Video Demo
Isi link video demo di bawah ini:

- [Demo Aplikasi BookShelf](PASTE_LINK_VIDEO_DEMO_DI_SINI)

## Justifikasi State Management
Project ini menggunakan **Zustand** sebagai state management karena kebutuhan aplikasi BookShelf cenderung berfokus pada data koleksi buku, status baca, dan proses pencarian/filter yang dipakai lintas screen. Zustand dipilih karena API-nya sederhana, ringan, dan tidak memerlukan banyak boilerplate dibandingkan pendekatan global state lain. Dalam konteks pembelajaran mobile, Zustand membantu memisahkan logic state dari komponen UI sehingga struktur kode lebih mudah dirawat ketika fitur bertambah. Selain itu, integrasinya dengan React Native cukup langsung tanpa konfigurasi kompleks. Untuk skala UTS, pemilihan ini sudah seimbang antara kemudahan implementasi, performa yang baik, dan keterbacaan kode.

## Referensi
- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Stack Overflow](https://stackoverflow.com/)
- Blog pengembangan React Native (artikel terkait implementasi UI, navigasi, dan state management)
- Video tutorial React Native/Expo di YouTube (materi dasar hingga integrasi fitur)

## Refleksi
Melalui pengerjaan project BookShelf ini, saya belajar bahwa membangun aplikasi mobile bukan hanya soal membuat tampilan yang menarik, tetapi juga bagaimana menyusun alur data dan struktur kode agar aplikasi tetap rapi saat berkembang. Di awal, saya fokus pada pembuatan UI per screen, lalu mulai memahami pentingnya navigasi yang konsisten antar halaman agar pengalaman pengguna lebih nyaman. Saya juga mendapatkan pemahaman baru tentang cara mengelola state global menggunakan Zustand, terutama saat beberapa screen membutuhkan data yang sama. Dari sini saya belajar bahwa pemilihan state management harus menyesuaikan kebutuhan aplikasi, tidak selalu harus yang paling kompleks.

Selain sisi teknis, saya juga belajar proses debugging ketika muncul error pada bundling, path asset, dan integrasi komponen. Proses tersebut melatih ketelitian saya dalam membaca pesan error dan mencari akar masalah secara bertahap. Saya semakin paham pentingnya dokumentasi resmi sebagai acuan utama sebelum mencoba solusi lain dari forum atau tutorial. Sebagai mahasiswa yang baru mendesain aplikasi seperti ini, saya merasa project ini menambah kepercayaan diri saya dalam mengembangkan aplikasi mobile secara end-to-end, mulai dari perencanaan fitur, implementasi, pengujian, sampai dokumentasi hasil kerja.
