import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import { 
  CheckCircleIcon, 
  HeartIcon, 
  ShareIcon, 
  DownloadIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BellIcon,
} from '../components/Icons';
import { formatCurrency, formatDate, formatDateTime, dayNames } from '../utils/helpers';
import { transferFees } from '../data/banks';

const SuccessScreen = ({ 
  onNavigate, 
  selectedBank, 
  transferMethod,
  transferData,
  transactionResult,
  onAddFavorite,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const fee = transferFees[transferMethod];
  const totalAmount = parseInt(transferData.amount) + fee;

  const frequencyLabels = {
    daily: 'Setiap Hari',
    weekly: `Setiap ${transferData.selectedDays?.map(d => dayNames[d].long).join(', ') || '-'}`,
    monthly: `Setiap Tanggal ${transferData.selectedDate || 1}`,
  };

  // Show push notification after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto hide notification after 5 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleAddFavorite = () => {
    setFavorited(true);
    if (onAddFavorite) {
      onAddFavorite({
        name: transferData.accountName,
        bank: selectedBank?.name,
        bankCode: selectedBank?.code,
        accountNumber: transferData.accountNumber,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-700 via-red-600 to-red-500 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -left-20 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      </div>
      
      <StatusBar />
      
      {/* Push Notification Banner */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-white mx-3 mt-10 rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex items-start gap-3 p-4">
            {/* Bank Logo */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
              style={{ backgroundColor: selectedBank?.color || '#003D79' }}
            >
              <span className="text-white text-xs font-bold">{selectedBank?.code?.slice(0, 3)}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-sm font-bold text-gray-800">Catatan Finansial</p>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">sekarang</span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">
                Pemasukan sebesar IDR {formatCurrency(transferData.amount)}.00 dari **{transferData.accountName?.split(' ')[0]?.slice(0,2)} di kategori Transfer Rekening.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 relative z-10">
        {/* Success Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center animate-pulse-soft">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-glow-green animate-success-pop">
                  <CheckCircleIcon className="w-10 h-10 text-green-500" />
                </div>
              </div>
            </div>
            {/* Sparkles */}
            <div className="absolute -top-2 -right-2 text-yellow-300 text-xl animate-bounce-gentle">✨</div>
            <div className="absolute -bottom-1 -left-3 text-yellow-300 text-lg animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>✨</div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6 animate-fadeInUp">
          <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Sukses!</h1>
          <p className="text-white/80 text-sm font-medium">
            {transferData.isScheduled 
              ? 'Transfer terjadwal Anda telah aktif'
              : 'Transaksi Anda telah berhasil'
            }
          </p>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {/* Decorative zigzag top */}
          <div className="h-5 bg-gradient-to-r from-red-600 to-red-500 relative">
            <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-white" style={{
              clipPath: 'polygon(0% 100%, 2% 0%, 4% 100%, 6% 0%, 8% 100%, 10% 0%, 12% 100%, 14% 0%, 16% 100%, 18% 0%, 20% 100%, 22% 0%, 24% 100%, 26% 0%, 28% 100%, 30% 0%, 32% 100%, 34% 0%, 36% 100%, 38% 0%, 40% 100%, 42% 0%, 44% 100%, 46% 0%, 48% 100%, 50% 0%, 52% 100%, 54% 0%, 56% 100%, 58% 0%, 60% 100%, 62% 0%, 64% 100%, 66% 0%, 68% 100%, 70% 0%, 72% 100%, 74% 0%, 76% 100%, 78% 0%, 80% 100%, 82% 0%, 84% 100%, 86% 0%, 88% 100%, 90% 0%, 92% 100%, 94% 0%, 96% 100%, 98% 0%, 100% 100%)'
            }}></div>
          </div>

          <div className="p-5">
            {/* Amount */}
            <div className="text-center border-b border-gray-100 pb-5 mb-5">
              <div className="inline-block mb-3">
                <span className="text-red-600 font-bold text-sm bg-gradient-to-r from-red-50 to-red-100 px-4 py-1.5 rounded-full shadow-sm">OCTO Mobile</span>
              </div>
              <p className="text-gray-400 text-xs mb-1 uppercase tracking-wider font-medium">Nominal</p>
              <p className="text-4xl font-extrabold text-gray-800 tracking-tight">
                IDR {formatCurrency(transferData.amount)}
                <sup className="text-lg font-semibold text-gray-400 ml-0.5">00</sup>
              </p>
            </div>

            {/* Main Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-start">
                <span className="text-gray-500 font-medium">Transfer ke</span>
                <div className="text-right">
                  <span className="font-bold text-gray-800 block">{transferData.accountName}</span>
                  <span className="text-xs text-gray-400">(Nomor Rekening)</span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-gray-500"></span>
                <div className="text-right">
                  <span className="font-semibold text-gray-700 block">{selectedBank?.name}</span>
                  <span className="font-mono text-gray-600 block tracking-wide">{transferData.accountNumber}</span>
                </div>
              </div>

              {/* Add to Favorite Button */}
              <div className="flex justify-end pt-1">
                <button 
                  onClick={handleAddFavorite}
                  disabled={favorited}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    favorited 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  <HeartIcon className="w-3.5 h-3.5" />
                  {favorited ? 'Tersimpan' : 'Tambah ke Favorit'}
                </button>
              </div>

              {/* Time & Transaction ID */}
              <div className="flex justify-between pt-2">
                <span className="text-gray-500">Waktu Transaksi</span>
                <span className="font-medium text-gray-700">{transactionResult.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ID Transaksi</span>
                <span className="font-medium text-gray-700 font-mono text-xs">{transactionResult.transactionId}</span>
              </div>

              {/* Transfer From & Type */}
              <div className="flex justify-between">
                <span className="text-gray-500">Transfer dari</span>
                <span className="font-medium text-gray-700">NONI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Jenis Transfer</span>
                <span className="font-semibold text-gray-800">BIFAST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nomor Referensi</span>
                <span className="font-medium text-gray-700 font-mono text-xs">{transactionResult.referenceNumber}</span>
              </div>

              {/* Expandable Detail */}
              <button 
                onClick={() => setShowDetail(!showDetail)}
                className="flex items-center justify-center gap-1 w-full py-2 text-red-600 text-sm font-medium"
              >
                Detail
                {showDetail ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
              </button>

              {showDetail && (
                <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs animate-fadeIn">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nominal Transfer</span>
                    <span className="font-medium text-gray-700">Rp{formatCurrency(transferData.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Biaya Admin BI-FAST</span>
                    <span className="font-medium text-gray-700">Rp{formatCurrency(fee)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-700">Total Debit</span>
                    <span className="text-gray-800">Rp{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-500">Waktu Proses</span>
                    <span className="font-medium text-green-600">~2 detik (Real-time)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status BI-FAST</span>
                    <span className="font-medium text-green-600">ACCP (Accepted)</span>
                  </div>
                  {transferData.message && (
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-gray-500">Pesan</span>
                      <p className="font-medium text-gray-700 mt-0.5">{transferData.message}</p>
                    </div>
                  )}
                  
                  {/* Schedule Info */}
                  {transferData.isScheduled && (
                    <div className="pt-2 border-t border-gray-200 space-y-2">
                      <p className="text-gray-500 font-medium">Info Jadwal:</p>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Frekuensi</span>
                        <span className="font-medium text-gray-700">{frequencyLabels[transferData.frequency]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Periode</span>
                        <span className="font-medium text-gray-700">
                          {formatDate(transferData.startDate)} - {formatDate(transferData.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Eksekusi</span>
                        <span className="font-medium text-gray-700">{transferData.scheduleCount}x transaksi</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-6 mt-5 pt-4 border-t border-gray-100">
              <button 
                onClick={handleAddFavorite}
                className={`flex flex-col items-center gap-1.5 transition-colors ${favorited ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${favorited ? 'bg-red-100' : 'bg-gray-100 hover:bg-red-50'}`}>
                  <HeartIcon className={`w-5 h-5 ${favorited ? 'fill-red-600' : ''}`} />
                </div>
                <span className="text-[10px] font-medium">{favorited ? 'Favorit ❤️' : 'Simpan Favorit'}</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-red-600 transition-colors">
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 transition-colors">
                  <ShareIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">Bagikan Bukti</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-red-600 transition-colors">
                <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 transition-colors">
                  <DownloadIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">Unduh PDF</span>
              </button>
            </div>
          </div>

          {/* Decorative zigzag bottom */}
          <div className="h-4 bg-white relative">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 to-red-500" style={{
              clipPath: 'polygon(0% 0%, 2% 100%, 4% 0%, 6% 100%, 8% 0%, 10% 100%, 12% 0%, 14% 100%, 16% 0%, 18% 100%, 20% 0%, 22% 100%, 24% 0%, 26% 100%, 28% 0%, 30% 100%, 32% 0%, 34% 100%, 36% 0%, 38% 100%, 40% 0%, 42% 100%, 44% 0%, 46% 100%, 48% 0%, 50% 100%, 52% 0%, 54% 100%, 56% 0%, 58% 100%, 60% 0%, 62% 100%, 64% 0%, 66% 100%, 68% 0%, 70% 100%, 72% 0%, 74% 100%, 76% 0%, 78% 100%, 80% 0%, 82% 100%, 84% 0%, 86% 100%, 88% 0%, 90% 100%, 92% 0%, 94% 100%, 96% 0%, 98% 100%, 100% 0%)'
            }}></div>
          </div>
        </div>

        {/* Transfer Baru Button */}
        <button
          onClick={() => onNavigate('home', { reset: true })}
          className="w-full mt-5 bg-white/20 text-white font-semibold py-3.5 rounded-xl hover:bg-white/30 transition-all active:scale-[0.98] border-2 border-white/30"
        >
          Transfer Baru
        </button>

        {/* Back to Home */}
        <button
          onClick={() => onNavigate('home', { reset: true })}
          className="w-full mt-2 bg-transparent text-white/80 font-medium py-3 rounded-xl hover:text-white transition-all"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
