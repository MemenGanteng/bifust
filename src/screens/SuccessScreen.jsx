import React from 'react';
import StatusBar from '../components/StatusBar';
import { 
  CheckCircleIcon, 
  HeartIcon, 
  ShareIcon, 
  DownloadIcon,
} from '../components/Icons';
import { formatCurrency, formatDate, formatDateTime, dayNames } from '../utils/helpers';
import { transferFees } from '../data/banks';

const SuccessScreen = ({ 
  onNavigate, 
  selectedBank, 
  transferMethod,
  transferData,
  transactionResult,
}) => {
  const fee = transferFees[transferMethod];
  const totalAmount = parseInt(transferData.amount) + fee;

  const frequencyLabels = {
    daily: 'Setiap Hari',
    weekly: `Setiap ${transferData.selectedDays?.map(d => dayNames[d].long).join(', ') || '-'}`,
    monthly: `Setiap Tanggal ${transferData.selectedDate || 1}`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-700">
      <StatusBar />
      
      <div className="px-4 py-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-green-500">
              <CheckCircleIcon className="w-10 h-10" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            {transferData.isScheduled ? 'Jadwal Berhasil Dibuat!' : 'Transfer Berhasil!'}
          </h1>
          <p className="text-white/80 text-sm">
            {transferData.isScheduled 
              ? 'Transfer terjadwal Anda telah aktif'
              : 'Dana berhasil dikirim ke penerima'
            }
          </p>
        </div>

        {/* Transaction Details Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xl">
          {/* Amount */}
          <div className="text-center border-b border-gray-100 pb-4 mb-4">
            <div className="inline-block mb-2">
              <span className="text-red-600 font-bold text-sm bg-red-50 px-3 py-1 rounded-full">OCTO Mobile</span>
            </div>
            <p className="text-gray-400 text-xs mb-1">NOMINAL</p>
            <p className="text-3xl font-bold text-gray-800">
              IDR {formatCurrency(transferData.amount)}
              <sup className="text-base font-semibold text-gray-400">00</sup>
            </p>
          </div>

          {/* Details */}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Transfer ke</span>
              <span className="font-semibold text-gray-800 text-right">{transferData.accountName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Bank</span>
              <span className="font-medium text-gray-700">{selectedBank?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">No. Rekening</span>
              <span className="font-medium text-gray-700">{transferData.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Metode</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">BI-FAST</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nominal</span>
              <span className="font-medium text-gray-700">Rp{formatCurrency(transferData.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Biaya Admin</span>
              <span className="font-medium text-gray-700">Rp{formatCurrency(fee)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total</span>
              <span className="font-bold text-gray-800">Rp{formatCurrency(totalAmount)}</span>
            </div>
            
            {transferData.message && (
              <div className="pt-2.5 border-t border-gray-100">
                <span className="text-gray-500">Pesan</span>
                <p className="font-medium text-gray-700 mt-0.5">{transferData.message}</p>
              </div>
            )}

            {/* Schedule Info */}
            {transferData.isScheduled && (
              <div className="pt-2.5 border-t border-gray-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Frekuensi</span>
                  <span className="font-medium text-gray-700 text-right text-xs">{frequencyLabels[transferData.frequency]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Periode</span>
                  <span className="font-medium text-gray-700 text-right text-xs">
                    {formatDate(transferData.startDate)} - {formatDate(transferData.endDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimasi</span>
                  <span className="font-medium text-gray-700">{transferData.scheduleCount}x transaksi</span>
                </div>
              </div>
            )}

            {/* Transaction Meta */}
            <div className="bg-gray-50 rounded-xl p-3 mt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Waktu</span>
                <span className="text-gray-700 font-medium">{transactionResult.time}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">ID Transaksi</span>
                <span className="text-gray-700 font-mono text-[10px]">{transactionResult.transactionId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">No. Referensi</span>
                <span className="text-gray-700 font-mono text-[10px]">{transactionResult.referenceNumber}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-6 mt-5 pt-4 border-t border-gray-100">
            <button className="flex flex-col items-center gap-1.5 text-gray-500 hover:text-red-600 transition-colors">
              <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 transition-colors">
                <HeartIcon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">Simpan Favorit</span>
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

        {/* Back to Home */}
        <button
          onClick={() => onNavigate('home', { reset: true })}
          className="w-full mt-5 bg-white text-red-600 font-semibold py-3.5 rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]"
        >
          Kembali ke Beranda
        </button>

        {/* Transfer Baru */}
        <button
          onClick={() => onNavigate('transferType', { reset: true })}
          className="w-full mt-2 bg-transparent text-white font-medium py-3 rounded-xl hover:bg-white/10 transition-all"
        >
          Transfer Baru
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
