// Data bank yang tersedia untuk transfer
// Logo placeholder: ganti dengan path gambar asli jika ada
// Contoh: logo: '/images/banks/bca.png'

export const banks = [
  { 
    id: 'cimb', 
    name: 'Bank CIMB Niaga', 
    code: 'CIMB', 
    color: '#B71C1C',
    logo: null, // cimb.png
    methods: ['bifast', 'online', 'rtgs']
  },
  { 
    id: 'bca', 
    name: 'Bank Central Asia', 
    code: 'BCA', 
    color: '#003D79',
    logo: null, // bca.png
    methods: ['bifast', 'online', 'rtgs']
  },
  { 
    id: 'mandiri', 
    name: 'Bank Mandiri', 
    code: 'MANDIRI', 
    color: '#003366',
    logo: null, // mandiri.png
    methods: ['bifast', 'online', 'rtgs']
  },
  { 
    id: 'bni', 
    name: 'Bank Negara Indonesia', 
    code: 'BNI', 
    color: '#F15A22',
    logo: null, // bni.png
    methods: ['bifast', 'online', 'rtgs']
  },
  { 
    id: 'bri', 
    name: 'Bank Rakyat Indonesia', 
    code: 'BRI', 
    color: '#00529C',
    logo: null, // bri.png
    methods: ['bifast', 'online', 'rtgs']
  },
  { 
    id: 'danamon', 
    name: 'Bank Danamon', 
    code: 'DANAMON', 
    color: '#00A651',
    logo: null, // danamon.png
    methods: ['bifast', 'online', 'rtgs']
  },
  { 
    id: 'permata', 
    name: 'Bank Permata', 
    code: 'PERMATA', 
    color: '#00A3E0',
    logo: null, // permata.png
    methods: ['bifast', 'online']
  },
  { 
    id: 'ocbc', 
    name: 'Bank OCBC NISP', 
    code: 'OCBC', 
    color: '#D71920',
    logo: null, // ocbc.png
    methods: ['bifast', 'online']
  },
  { 
    id: 'maybank', 
    name: 'Maybank Indonesia', 
    code: 'MAYBANK', 
    color: '#FFC72C',
    logo: null, // maybank.png
    methods: ['bifast', 'online']
  },
  { 
    id: 'mega', 
    name: 'Bank Mega', 
    code: 'MEGA', 
    color: '#003D7C',
    logo: null, // mega.png
    methods: ['bifast', 'online']
  },
  { 
    id: 'seabank', 
    name: 'SeaBank', 
    code: 'SEABANK', 
    color: '#00D4AA',
    logo: null, // seabank.png
    methods: ['bifast']
  },
  { 
    id: 'jago', 
    name: 'Bank Jago', 
    code: 'JAGO', 
    color: '#FFCC00',
    logo: null, // jago.png
    methods: ['bifast']
  },
  { 
    id: 'bsi', 
    name: 'Bank Syariah Indonesia', 
    code: 'BSI', 
    color: '#00A19A',
    logo: null, // bsi.png
    methods: ['bifast', 'online']
  },
  { 
    id: 'btpn', 
    name: 'Bank BTPN', 
    code: 'BTPN', 
    color: '#F7941D',
    logo: null, // btpn.png
    methods: ['bifast', 'online']
  },
];

// Biaya admin per metode transfer
export const transferFees = {
  bifast: 2500,
  online: 6500,
  rtgs: 25000,
};

// Limit transfer per metode
export const transferLimits = {
  bifast: {
    min: 10000,
    max: 250000000,
  },
  online: {
    min: 10000,
    max: 100000000,
  },
  rtgs: {
    min: 100000000,
    max: 1000000000,
  },
};

// Threshold untuk OTP tambahan saat eksekusi
export const highValueThreshold = 10000000; // Rp 10 juta
