// Format angka ke format Rupiah (tanpa simbol Rp)
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return '0';
  return new Intl.NumberFormat('id-ID').format(amount);
};

// Format tanggal ke format Indonesia
export const formatDate = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Format tanggal dengan waktu
export const formatDateTime = (date) => {
  if (!date) return '-';
  return new Date(date).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  });
};

// Generate Transaction ID
export const generateTransactionId = () => {
  const timestamp = Date.now().toString().slice(-10);
  const random = Math.random().toString(36).slice(-4).toUpperCase();
  return `MB${timestamp}${random}`;
};

// Generate Reference Number
export const generateReferenceNumber = () => {
  const random = Math.random().toString(36).slice(-12).toUpperCase();
  return `REF${random}`;
};

// Get tanggal hari ini dalam format YYYY-MM-DD
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Hitung jumlah hari antara 2 tanggal
export const daysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Nama hari dalam bahasa Indonesia
export const dayNames = [
  { id: 0, short: 'Min', long: 'Minggu' },
  { id: 1, short: 'Sen', long: 'Senin' },
  { id: 2, short: 'Sel', long: 'Selasa' },
  { id: 3, short: 'Rab', long: 'Rabu' },
  { id: 4, short: 'Kam', long: 'Kamis' },
  { id: 5, short: 'Jum', long: 'Jumat' },
  { id: 6, short: 'Sab', long: 'Sabtu' },
];

// Generate array tanggal 1-31 untuk pilihan bulanan
export const monthDates = Array.from({ length: 31 }, (_, i) => i + 1);

// Validasi nomor rekening (basic)
export const validateAccountNumber = (number) => {
  // Minimal 10 digit, maksimal 16 digit
  const cleaned = number.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 16;
};

// Validasi nominal transfer
export const validateAmount = (amount, min, max, balance) => {
  const numAmount = parseInt(amount) || 0;
  
  if (numAmount < min) {
    return { valid: false, error: `Minimal transfer Rp${formatCurrency(min)}` };
  }
  if (numAmount > max) {
    return { valid: false, error: `Maksimal transfer Rp${formatCurrency(max)}` };
  }
  if (numAmount > balance) {
    return { valid: false, error: 'Saldo tidak cukup' };
  }
  
  return { valid: true, error: null };
};

// Hitung estimasi jumlah transfer terjadwal
export const calculateScheduleCount = (startDate, endDate, frequency, selectedDays = [], selectedDate = 1) => {
  if (!startDate || !endDate) return 0;
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  let current = new Date(start);
  
  while (current <= end) {
    if (frequency === 'daily') {
      count++;
      current.setDate(current.getDate() + 1);
    } else if (frequency === 'weekly') {
      if (selectedDays.includes(current.getDay())) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    } else if (frequency === 'monthly') {
      if (current.getDate() === selectedDate) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
  }
  
  return count;
};

// Simulasi validasi rekening ke API (dummy)
export const simulateAccountValidation = (bankCode, accountNumber) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dummy names based on last digit
      const names = [
        'NONI PRATAMA',
        'BUDI SANTOSO',
        'SITI RAHAYU',
        'AHMAD WIJAYA',
        'DEWI LESTARI',
        'RUDI HARTONO',
        'MAYA SARI',
        'DIAN KUSUMA',
        'ANDI SETIAWAN',
        'PUTRI HANDAYANI',
      ];
      
      const lastDigit = parseInt(accountNumber.slice(-1)) || 0;
      resolve({
        valid: true,
        name: names[lastDigit],
        accountNumber: accountNumber,
      });
    }, 800);
  });
};
