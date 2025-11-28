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
    { icon: TransferIcon, label: 'Transfer', action: () => onNavigate('transferType') },
    { icon: BillIcon, label: 'Tagihan & Isi Ulang', action: null },
    { icon: QRIcon, label: 'Transaksi Tanpa Kartu', action: null },
    { icon: VoucherIcon, label: 'Poin Xtra', action: null },
    { icon: WalletIcon, label: 'Kartu Elektronik', action: null },
  ];

  const secondaryActions = [
    { icon: VoucherIcon, label: 'Voucher', action: null },
    { icon: HeartIcon, label: 'Penerima Favorit', action: () => onNavigate('favorites') },
    { icon: BiFastIcon, label: 'BI-FAST', action: () => onNavigate('transferType', { method: 'bifast' }) },
    { icon: SettingsIcon, label: 'Semua Menu', action: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 via-red-600 to-red-700 rounded-b-3xl pb-6">
        <StatusBar />
        
        {/* App Bar */}
        <div className="px-4 lg:px-8 py-3 flex justify-between items-center">
          <span className="text-white font-bold text-2xl tracking-tight">OCTO</span>
          <div className="flex items-center gap-3">
            <button className="text-white/80 hover:text-white transition-colors p-2">
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-white transition-colors p-2">
              <SearchIcon className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-white transition-colors p-2">
              <BellIcon className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="px-4 lg:px-8 mb-4">
          <h1 className="text-white text-lg lg:text-xl">Selamat siang, <span className="font-semibold">NONI!</span></h1>
        </div>

        {/* E-Wallet Card */}
        <div className="mx-4 lg:mx-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-white/80 text-xs font-medium bg-white/20 px-2 py-0.5 rounded">E-Wallet</span>
              <p className="text-white/60 text-xs mt-2">OCTO Pay (••••3433)</p>
            </div>
            <button className="bg-white text-red-600 text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1 hover:bg-gray-100 transition-colors">
              <PlusIcon className="w-4 h-4" />
              Isi Ulang
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">IDR</span>
            <span className="text-white text-2xl lg:text-3xl font-bold">
              {showBalance ? formatCurrency(balance) : '••••••••'}
            </span>
            <button 
              onClick={() => setShowBalance(!showBalance)}
              className="text-white/70 hover:text-white transition-colors ml-1"
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
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-4">
              {/* Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {['Untukmu', 'Transaksi', 'Produk', 'Lainnya'].map((tab, i) => (
                  <button 
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                      i === 1 
                        ? 'bg-red-600 text-white' 
                        : 'text-gray-500 hover:bg-gray-100'
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
                    className={`flex flex-col items-center gap-2 p-2 lg:p-3 rounded-xl transition-all ${
                      item.action ? 'hover:bg-gray-50 active:bg-gray-100' : 'opacity-60'
                    }`}
                  >
                    <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <span className="text-[10px] lg:text-xs text-gray-600 text-center leading-tight">{item.label}</span>
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
                    className={`flex flex-col items-center gap-2 p-2 lg:p-3 rounded-xl transition-all ${
                      item.action ? 'hover:bg-gray-50 active:bg-gray-100' : 'opacity-60'
                    }`}
                  >
                    <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                    <span className="text-[10px] lg:text-xs text-gray-600 text-center leading-tight">{item.label}</span>
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
                className="w-full mt-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center relative">
                  <TransferIcon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {scheduledCount}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800">Transfer Terjadwal Aktif</p>
                  <p className="text-xs text-gray-500">{scheduledCount} jadwal berjalan</p>
                </div>
                <span className="text-red-600 text-sm font-medium">Kelola →</span>
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
