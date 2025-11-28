# OCTO Mobile - BI-FAST Scheduled Transfer Prototype

Prototype aplikasi mobile banking untuk fitur **Transfer Terjadwal BI-FAST** berdasarkan Case Study 3 dari CIMB Niaga.

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js 18+ terinstall
- npm atau yarn

### Instalasi & Jalankan

```bash
# Masuk ke folder project
cd octo-bifast-prototype

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser dan akses `http://localhost:5173`

## 📱 Fitur yang Diimplementasi

### Sesuai Case Study:

1. **Flow Transfer BI-FAST**
   - Home → Pilih Jenis Transfer → Pilih Bank → Form Transfer → Ringkasan → OTP → Sukses

2. **Penjadwalan Fleksibel**
   - Frekuensi: Harian / Mingguan / Bulanan
   - **Harian**: Transfer setiap hari pada periode tertentu
   - **Mingguan**: Pilih hari-hari dalam seminggu (Senin, Selasa, dst)
   - **Bulanan**: Pilih tanggal setiap bulan (1-31)
   - Tanggal mulai & berakhir
   - Estimasi jumlah transfer otomatis dihitung

3. **Opsi Jadwal (dengan Checkbox)**
   - ☑️ Lewati Akhir Pekan & Hari Libur
   - ☑️ Kirim Notifikasi Sebelum Transfer (30 menit)
   - ☑️ Auto Batal Jika Saldo Tidak Cukup

4. **Keamanan**
   - OTP 6 digit saat penjadwalan
   - Warning untuk transfer > Rp10 juta (butuh OTP tambahan saat eksekusi)
   - Validasi form lengkap

5. **Transparansi**
   - Biaya admin jelas (Rp2.500 untuk BI-FAST)
   - Estimasi jumlah transfer
   - Detail jadwal di ringkasan
   - ID Transaksi & Nomor Referensi

## 📁 Struktur Project

```
octo-bifast-prototype/
├── src/
│   ├── App.jsx                    # Main app & state management
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles + Tailwind
│   ├── components/
│   │   ├── Icons.jsx              # SVG icon components
│   │   ├── StatusBar.jsx          # Phone status bar
│   │   ├── BottomNav.jsx          # Bottom navigation
│   │   └── Checkbox.jsx           # Custom checkbox component
│   ├── screens/
│   │   ├── HomeScreen.jsx         # Home / Dashboard
│   │   ├── TransferTypeScreen.jsx # Pilih jenis transfer
│   │   ├── SelectBankScreen.jsx   # Pilih bank tujuan
│   │   ├── TransferFormScreen.jsx # Form transfer + jadwal
│   │   ├── SummaryScreen.jsx      # Ringkasan transfer
│   │   ├── OTPScreen.jsx          # Verifikasi OTP
│   │   └── SuccessScreen.jsx      # Sukses
│   ├── data/
│   │   └── banks.js               # Data bank & config
│   └── utils/
│       └── helpers.js             # Utility functions
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Customization

### Menambah Logo Bank

Edit `src/data/banks.js`:

```javascript
{
  id: 'bca',
  name: 'Bank Central Asia',
  code: 'BCA',
  color: '#003D79',
  logo: '/images/banks/bca.png', // Tambahkan path logo
  methods: ['bifast', 'online', 'rtgs']
}
```

Letakkan gambar di folder `public/images/banks/`

### Mengubah Biaya Transfer

Edit `src/data/banks.js`:

```javascript
export const transferFees = {
  bifast: 2500,   // Rp2.500
  online: 6500,   // Rp6.500
  rtgs: 25000,    // Rp25.000
};
```

### Mengubah Threshold OTP Tambahan

Edit `src/data/banks.js`:

```javascript
export const highValueThreshold = 10000000; // Rp10 juta
```

## 🛠 Tech Stack

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Plus Jakarta Sans** - Font

## 📝 Notes

- Ini adalah prototype untuk demonstrasi flow UI/UX
- Tidak ada backend/API yang sebenarnya
- Validasi rekening menggunakan data dummy
- OTP tidak benar-benar terkirim (dummy)

## 📄 License

Prototype ini dibuat untuk keperluan edukasi / tugas kuliah.
