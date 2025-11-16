# 🎮 GameHub - Aplikasi Jual Beli Akun Game

Aplikasi web modern dan elegan untuk promosi dan penjualan akun game dengan tampilan yang menarik menggunakan HTML, CSS, dan JavaScript.

## ✨ Fitur

- **Tampilan Modern & Elegan**: Desain dengan gradient yang menarik dan animasi yang smooth
- **Responsive Design**: Dapat diakses dengan baik di desktop, tablet, dan mobile
- **Pencarian & Filter**: Fitur pencarian dan filter berdasarkan kategori game
- **Detail Akun**: Modal popup untuk melihat detail lengkap akun game
- **Upload Foto Akun**: Fitur untuk mengupload dan mengganti foto akun game (disimpan di localStorage)
- **QR Code Pembayaran**: Tampilan QR code pembayaran ketika user klik tombol "Beli"
- **Upload QR Code**: Fitur untuk mengupload QR code pembayaran custom (disimpan di localStorage)
- **Sistem Harga**: Menampilkan harga dalam format Rupiah (IDR)
- **Kontak**: Form kontak dan informasi kontak WhatsApp, Telegram, dan Email
- **Smooth Scrolling**: Navigasi yang halus antar section
- **Dark Theme**: Tema gelap yang nyaman untuk mata
- **LocalStorage**: Data foto akun dan QR code disimpan di browser localStorage

## 🚀 Cara Menggunakan

1. Buka file `index.html` di browser web Anda
2. Aplikasi akan langsung menampilkan katalog akun game yang tersedia
3. Gunakan fitur pencarian untuk mencari akun game tertentu
4. Filter berdasarkan kategori (Mobile Game, PC Game, Console Game)
5. Urutkan berdasarkan harga atau terbaru
6. **Upload Foto Akun**: Hover pada gambar akun dan klik "Ganti Foto" untuk mengupload foto akun game
7. Klik "Detail" untuk melihat informasi lengkap akun
8. Klik "Beli" untuk melihat QR code pembayaran
9. **Upload QR Code**: Di modal QR code, klik "Upload QR Code" untuk mengupload QR code pembayaran Anda
10. QR code akan tersimpan di browser dan akan muncul setiap kali user klik "Beli"

## 📁 Struktur File

```
web jb/
├── index.html      # Halaman utama aplikasi
├── styles.css      # Styling dan desain aplikasi
├── script.js       # Logika dan interaktivitas
└── README.md       # Dokumentasi
```

## 🎨 Fitur Desain

- **Gradient Background**: Menggunakan gradient yang menarik untuk hero section
- **Card Design**: Desain card yang modern dengan efek hover
- **Modal Popup**: Modal yang elegan untuk menampilkan detail akun
- **Animations**: Animasi smooth untuk berbagai interaksi
- **Custom Scrollbar**: Scrollbar yang disesuaikan dengan tema
- **Mobile Menu**: Menu hamburger untuk tampilan mobile

## 🔧 Kustomisasi

### Menambah Akun Game Baru

Edit file `script.js` dan tambahkan objek baru di array `gameAccounts`:

```javascript
{
    id: 13,
    title: "Nama Game",
    category: "mobile", // atau "pc" atau "console"
    image: "🎮",
    price: 250000,
    level: "Level 50",
    rank: "Rank",
    description: "Deskripsi akun game"
}
```

### Upload Foto Akun Game

1. Hover pada card akun game
2. Klik tombol "Ganti Foto" yang muncul
3. Pilih gambar dari komputer Anda
4. Foto akan langsung tersimpan dan muncul di card akun

### Upload QR Code Pembayaran

1. Klik tombol "Beli" pada akun game yang diinginkan
2. Di modal QR code, scroll ke bawah
3. Klik "Upload QR Code"
4. Pilih gambar QR code pembayaran dari komputer Anda
5. QR code akan tersimpan dan muncul setiap kali user klik "Beli"

### Mengubah Informasi Kontak

Edit file `index.html` pada section kontak atau edit file `script.js` pada fungsi `buyAccount()` untuk mengubah nomor WhatsApp.

### Mengubah Warna Tema

Edit file `styles.css` pada bagian `:root` untuk mengubah variabel warna:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... */
}
```

## 📱 Browser Support

Aplikasi ini mendukung semua browser modern:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## 📝 Catatan

- Pastikan semua file berada di folder yang sama
- Tidak memerlukan server khusus, cukup buka `index.html` di browser
- Untuk produksi, disarankan menggunakan HTTPS

## 🎯 Langkah Selanjutnya

1. Ganti informasi kontak dengan informasi yang sebenarnya
2. Tambahkan akun game sesuai kebutuhan
3. Integrasikan dengan sistem payment gateway jika diperlukan
4. Tambahkan backend untuk manajemen akun game
5. Tambahkan sistem autentikasi untuk penjual

## 📄 Lisensi

Aplikasi ini dibuat untuk keperluan komersial dan pribadi.

---

Dibuat dengan ❤️ menggunakan HTML, CSS, dan JavaScript

