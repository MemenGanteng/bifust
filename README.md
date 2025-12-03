# OCTO Mobile - BI-FAST Scheduled Transfer Prototype

Prototype aplikasi mobile banking untuk fitur Transfer Terjadwal BI-FAST pada aplikasi OCTO Mobile CIMB Niaga. Dikembangkan berdasarkan Case Study 3 mata kuliah Software Engineering.

## Deskripsi

Prototype ini mensimulasikan fitur penjadwalan transfer BI-FAST yang memungkinkan nasabah untuk mengatur transfer otomatis dengan berbagai pilihan frekuensi. Fitur ini bertujuan untuk memudahkan nasabah dalam mengelola pembayaran rutin seperti tagihan bulanan, cicilan, atau transfer berkala lainnya.

## Demo

Live prototype dapat diakses di: [https://bi-fast.netlify.app/](https://bi-fast.netlify.app/)

## Fitur

### Transfer BI-FAST
- Pilih jenis transfer (BI-FAST, Online/LLG, RTGS)
- Pilih bank tujuan dari daftar bank BI-FAST member
- Input nomor rekening dengan validasi otomatis
- Tampilan biaya transfer yang transparan

### Penjadwalan Transfer
- Frekuensi harian, mingguan, atau bulanan
- Pemilihan hari untuk frekuensi mingguan (Senin-Minggu)
- Pemilihan tanggal untuk frekuensi bulanan (1-31)
- Pengaturan tanggal mulai dan berakhir
- Estimasi jumlah transfer otomatis

### Opsi Tambahan
- Lewati akhir pekan dan hari libur nasional
- Notifikasi sebelum eksekusi transfer (30 menit)
- Pembatalan otomatis jika saldo tidak mencukupi

### Keamanan
- Verifikasi OTP 6 digit saat pembuatan jadwal
- Peringatan untuk transfer di atas Rp10 juta
- Validasi form yang komprehensif

### Manajemen Jadwal
- Daftar jadwal transfer aktif
- Detail jadwal dengan riwayat eksekusi
- Edit dan batalkan jadwal yang sudah dibuat
- Riwayat transfer yang telah dieksekusi

## Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Font | Plus Jakarta Sans |
| Deployment | Netlify |

## Instalasi

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm atau yarn

### Langkah Instalasi

```bash
# Clone repository
git clone [repository-url]

# Masuk ke direktori project
cd octo-bifast-prototype

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build untuk Production

```bash
# Build project
npm run build

# Preview hasil build
npm run preview
```

## Struktur Project

```
octo-bifast-prototype/
├── src/
│   ├── App.jsx                     # Komponen utama dan state management
│   ├── main.jsx                    # Entry point aplikasi
│   ├── index.css                   # Global styles dan konfigurasi Tailwind
│   ├── components/
│   │   ├── Icons.jsx               # Komponen ikon SVG
│   │   ├── StatusBar.jsx           # Status bar perangkat
│   │   ├── BottomNav.jsx           # Navigasi bawah
│   │   └── Checkbox.jsx            # Komponen checkbox custom
│   ├── screens/
│   │   ├── HomeScreen.jsx          # Halaman utama
│   │   ├── TransferTypeScreen.jsx  # Pilih jenis transfer
│   │   ├── SelectBankScreen.jsx    # Pilih bank tujuan
│   │   ├── TransferFormScreen.jsx  # Form input transfer dan jadwal
│   │   ├── SummaryScreen.jsx       # Ringkasan transfer
│   │   ├── OTPScreen.jsx           # Verifikasi OTP
│   │   ├── PINScreen.jsx           # Verifikasi PIN
│   │   ├── SuccessScreen.jsx       # Konfirmasi sukses
│   │   ├── ScheduledListScreen.jsx # Daftar jadwal aktif
│   │   ├── ScheduleDetailScreen.jsx # Detail jadwal
│   │   ├── ExecutionHistoryScreen.jsx # Riwayat eksekusi
│   │   └── FavoriteRecipientsScreen.jsx # Daftar penerima favorit
│   ├── data/
│   │   └── banks.js                # Data bank dan konfigurasi
│   └── utils/
│       └── helpers.js              # Fungsi utilitas
├── dist/                           # Hasil build production
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Konfigurasi

### Mengubah Biaya Transfer

Edit file `src/data/banks.js`:

```javascript
export const transferFees = {
  bifast: 2500,   // Rp2.500
  online: 6500,   // Rp6.500
  rtgs: 25000,    // Rp25.000
};
```

### Mengubah Threshold Nominal Tinggi

Edit file `src/data/banks.js`:

```javascript
export const highValueThreshold = 10000000; // Rp10.000.000
```

### Menambah Data Bank

Edit file `src/data/banks.js`:

```javascript
{
  id: 'bank_id',
  name: 'Nama Bank',
  code: 'KODE',
  color: '#HEXCOLOR',
  methods: ['bifast', 'online', 'rtgs']
}
```

## Batasan Prototype

- Tidak terhubung dengan backend atau API
- Data rekening menggunakan data dummy untuk simulasi
- OTP tidak benar-benar dikirim ke perangkat
- Transaksi tidak diproses secara aktual
- Saldo dan riwayat transfer bersifat simulasi

## Tim Pengembang

| Nama | NIM | Role |
|------|-----|------|
| Michael | [00000106013] | Project Manager |
| Nathanael Valentino Sutanto | [00000105359] | UI/UX Designer |
| Clement Aelwyn Wirawan| [00000105577] | Frontend Developer |
| Josh Reagan Wiselim | [00000105516] | QA Engineer |

## Lisensi

Prototype ini dikembangkan untuk keperluan tugas akademik mata kuliah Software Engineering di Universitas Multimedia Nusantara.

---

Universitas Multimedia Nusantara | 2024