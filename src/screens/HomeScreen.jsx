import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { 
  HeartIcon, 
  SearchIcon, 
  BellIcon, 
  UserIcon,
  TransferIcon,
  BillIcon,
  QRIcon,
  VoucherIcon,
  BiFastIcon,
  SettingsIcon,
  PlusIcon,
  EyeIcon,
  EyeOffIcon,
  WalletIcon,
} from '../components/Icons';
import { formatCurrency } from '../utils/helpers';

const HomeScreen = ({ onNavigate, balance, scheduledCount = 0 }) => {
  const [showBalance, setShowBalance] = useState(false);

  const quickActions = [
    { icon: TransferIcon, label: 'Transfer', action: () => onNavigate('transferType'), highlight: true },
    { icon: BillIcon, label: 'Tagihan & Isi Ulang', action: null },
    { icon: QRIcon, label: 'Transaksi Tanpa Kartu', action: null },
    { icon: VoucherIcon, label: 'Poin Xtra', action: null },
    { icon: WalletIcon, label: 'Kartu Elektronik', action: null },
  ];

  const secondaryActions = [
    { icon: VoucherIcon, label: 'Voucher', action: null },
    { icon: HeartIcon, label: 'Penerima Favorit', action: () => onNavigate('favorites') },
    { icon: BiFastIcon, label: 'BI-FAST', action: () => onNavigate('transferType', { method: 'bifast' }), highlight: true },
    { icon: SettingsIcon, label: 'Semua Menu', action: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20 lg:pb-8">
      {/* Header with Premium Gradient */}
      <div className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 rounded-b-[2rem] pb-6 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>
        
        <StatusBar />
        
        {/* App Bar */}
        <div className="px-4 lg:px-8 py-3 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-white font-extrabold text-2xl tracking-tight">OCTO</span>
            <span className="text-white/60 text-xs font-medium bg-white/10 px-2 py-0.5 rounded-full">Mobile</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white/80 hover:text-white hover:bg-white/10 transition-all p-2.5 rounded-xl">
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-white hover:bg-white/10 transition-all p-2.5 rounded-xl">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-white hover:bg-white/10 transition-all p-2.5 rounded-xl relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10 ml-1">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="px-4 lg:px-8 mb-4 relative z-10">
          <p className="text-white/70 text-sm">Selamat siang,</p>
          <h1 className="text-white text-xl lg:text-2xl font-bold">NONI! 👋</h1>
        </div>

        {/* E-Wallet Card - Glassmorphism */}
        <div className="mx-4 lg:mx-8 bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 relative z-10 animate-fadeInUp">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-white/90 text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-lg inline-flex items-center gap-1">
                <WalletIcon className="w-3 h-3" />
                E-Wallet
              </span>
              <p className="text-white/60 text-xs mt-2">OCTO Pay (••••3433)</p>
            </div>
            <button className="bg-white text-red-600 text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-gray-50 hover:shadow-lg transition-all active:scale-95">
              <PlusIcon className="w-4 h-4" />
              Isi Ulang
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm font-medium">IDR</span>
            <span className="text-white text-3xl lg:text-4xl font-extrabold tracking-tight">
              {showBalance ? formatCurrency(balance) : '••••••••'}
            </span>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/60 hover:text-white hover:bg-white/10 transition-all ml-1 p-1.5 rounded-lg"
            >
              {showBalance ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive Grid */}
      <div className="px-4 lg:px-8 -mt-1">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-premium p-4 animate-fadeInUp stagger-1">
              {/* Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {['Untukmu', 'Transaksi', 'Produk', 'Lainnya'].map((tab, i) => (
                  <button 
                    key={tab}
                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                      i === 1 
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-glow-red' 
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Action Grid - Row 1 */}
              <div className="grid grid-cols-5 gap-2 lg:gap-4">
                {quickActions.map((item, i) => (
                  <button 
                    key={i}
                    onClick={item.action}
                    disabled={!item.action}
                    className={`flex flex-col items-center gap-2 p-2 lg:p-3 rounded-xl transition-all group ${
                      item.action ? 'hover:bg-gray-50 active:scale-95' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all ${
                      item.highlight 
                        ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-glow-red group-hover:scale-105' 
                        : 'bg-red-50 text-red-600 group-hover:bg-red-100'
                    }`}>
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <span className="text-[10px] lg:text-xs text-gray-600 text-center leading-tight font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Action Grid - Row 2 */}
              <div className="grid grid-cols-5 gap-2 lg:gap-4 mt-3">
                {secondaryActions.map((item, i) => (
                  <button 
                    key={i}
                    onClick={item.action}
                    disabled={!item.action}
                    className={`flex flex-col items-center gap-2 p-2 lg:p-3 rounded-xl transition-all group ${
                      item.action ? 'hover:bg-gray-50 active:scale-95' : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all ${
                      item.highlight 
                        ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md group-hover:scale-105' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <span className="text-[10px] lg:text-xs text-gray-600 text-center leading-tight font-medium">{item.label}</span>
                  </button>
                ))}
                {/* Empty slot for alignment */}
                <div></div>
              </div>
            </div>

            {/* Scheduled Transfers Quick Access */}
            {scheduledCount > 0 && (
              <button
                onClick={() => onNavigate('scheduledList')}
                className="w-full mt-4 bg-white rounded-2xl p-4 shadow-premium hover:shadow-lg transition-all flex items-center gap-4 group animate-fadeInUp stagger-2"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center relative shadow-glow-red group-hover:scale-105 transition-transform">
                  <TransferIcon className="w-6 h-6" />
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md animate-bounce-gentle">
                    {scheduledCount}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-800 text-lg">Transfer Terjadwal Aktif</p>
                  <p className="text-sm text-gray-500">{scheduledCount} jadwal sedang berjalan</p>
                </div>
                <span className="text-red-600 text-sm font-bold group-hover:translate-x-1 transition-transform">Kelola →</span>
              </button>
            )}
          </div>

          {/* Right Column - e-Wallet & Promo (visible on lg) */}
          <div className="hidden lg:block space-y-4 mt-0">
            {/* e-Wallet Section */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-gray-800">e-Wallet</h2>
                <button className="text-red-600 text-sm font-medium">Lihat Semua</button>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">OCTO</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">OCTO Pay</p>
                    <p className="text-xs text-gray-400">IDR •••</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">GO</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">gopay</p>
                    <button className="text-xs text-red-600 font-medium">Hubungkan</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-3">Akses Cepat</h2>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('scheduledList')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                    <TransferIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Transfer Terjadwal</p>
                    <p className="text-xs text-gray-400">{scheduledCount} jadwal aktif</p>
                  </div>
                </button>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                    <HeartIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Penerima Favorit</p>
                    <p className="text-xs text-gray-400">Transfer cepat</p>
                  </div>
                </button>
                <button
                  onClick={() => onNavigate('executionHistory')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <BellIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Riwayat Eksekusi</p>
                    <p className="text-xs text-gray-400">Status transfer</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: e-Wallet Section */}
      <div className="px-4 mt-4 lg:hidden">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-800">e-Wallet</h2>
          <button className="text-red-600 text-sm font-medium">Lihat Semua</button>
        </div>
        <div className="flex gap-3">
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 flex-1 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 font-bold text-xs">OCTO</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">OCTO Pay</p>
              <p className="text-xs text-gray-400">IDR •••</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 flex-1 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 font-bold text-xs">GO</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">gopay</p>
              <button className="text-xs text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded-full">
                Hubungkan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="px-4 lg:px-8 mt-4">
        <h2 className="font-semibold text-gray-800 mb-3">Berita & Promosi</h2>
        <div className="flex gap-2 mb-3">
          {['Semua', 'Promosi', 'Berita'].map((tab, i) => (
            <button 
              key={tab}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                i === 0 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-4 lg:p-6 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/80 text-xs bg-white/20 px-2 py-0.5 rounded">CIMB NIAGA</span>
              <span className="text-white/80 text-xs">70th</span>
            </div>
            <h3 className="text-white font-bold text-sm lg:text-lg mb-1">Gunakan BI-FAST untuk Transfer!</h3>
            <p className="text-white/80 text-xs lg:text-sm">Transfer cepat dan aman kapan saja dengan fitur penjadwalan</p>
          </div>
          <div className="text-5xl lg:text-6xl">🚀</div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden">
        <BottomNav active="home" onNavigate={(id) => {
          if (id === 'home') onNavigate('home');
        }} />
      </div>
    </div>
  );
};

export default HomeScreen;
