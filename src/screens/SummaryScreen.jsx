import React from 'react';
import StatusBar from '../components/StatusBar';
import { 
  ChevronLeftIcon, 
  UserIcon, 
  InfoIcon,
  CheckIcon,
} from '../components/Icons';
import { formatCurrency, formatDate, dayNames } from '../utils/helpers';
import { transferFees, highValueThreshold } from '../data/banks';

const SummaryScreen = ({ 
  onNavigate, 
  selectedBank, 
  transferMethod,
  transferData,
  balance,
}) => {
  const fee = transferFees[transferMethod];
  const totalAmount = parseInt(transferData.amount) + fee;
  const needsExtraOtp = parseInt(transferData.amount) > highValueThreshold;

  const frequencyLabels = {
    daily: 'Setiap Hari',
    weekly: `Setiap ${transferData.selectedDays?.map(d => dayNames[d].long).join(', ') || '-'}`,
    monthly: `Setiap Tanggal ${transferData.selectedDate || 1}`,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('transferForm')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">
            {transferData.isScheduled ? 'Ringkasan Transfer Terjadwal' : 'Ringkasan Transfer'}
          </h1>
        </div>

        {/* Balance Card */}
        <div className="mx-4 mb-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-white/70 text-xs">E-Wallet</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-white/70 text-sm">IDR</span>
                <span className="text-white text-xl font-bold">{formatCurrency(balance)}</span>
              </div>
              <p className="text-white/60 text-xs mt-1">OCTO Pay (••••3433)</p>
            </div>
            <button className="bg-white text-red-600 text-xs font-semibold px-3 py-2 rounded-xl">
              Isi Saldo
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Recipient */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs text-gray-400 mb-3 font-medium">Penerima</h3>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
              <UserIcon className="w-6 h-6 text-gray-500" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800">{transferData.accountName}</p>
              <p className="text-sm text-gray-500 truncate">{selectedBank?.name}</p>
              <p className="text-xs text-gray-400">{transferData.accountNumber}</p>
            </div>
            <span className="ml-auto text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold flex-shrink-0">
              BI-FAST
            </span>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs text-gray-400 mb-3 font-medium">Detail Transfer</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Jumlah Transfer</span>
              <span className="font-semibold text-gray-800">Rp{formatCurrency(transferData.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Biaya Admin</span>
              <span className="font-semibold text-gray-800">Rp{formatCurrency(fee)}</span>
            </div>
            <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total Pembayaran</span>
              <span className="font-bold text-red-600 text-lg">Rp{formatCurrency(totalAmount)}</span>
            </div>
            {transferData.message && (
              <div className="pt-2.5 border-t border-gray-100">
                <span className="text-sm text-gray-600">Pesan</span>
                <p className="text-gray-800 font-medium mt-0.5">{transferData.message}</p>
              </div>
            )}
            <div className="pt-2.5 border-t border-gray-100">
              <span className="text-sm text-gray-600">Sumber Dana</span>
              <p className="text-gray-800 font-medium mt-0.5">OCTO Pay (••••3433)</p>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        {transferData.isScheduled && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-xs text-gray-400 mb-3 font-medium">Detail Jadwal</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Frekuensi</span>
                <span className="font-semibold text-gray-800 text-right text-sm">
                  {frequencyLabels[transferData.frequency]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tanggal Mulai</span>
                <span className="font-semibold text-gray-800">{formatDate(transferData.startDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tanggal Berakhir</span>
                <span className="font-semibold text-gray-800">{formatDate(transferData.endDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estimasi Transfer</span>
                <span className="font-semibold text-gray-800">{transferData.scheduleCount}x transaksi</span>
              </div>
              
              {/* Options Summary */}
              <div className="pt-2.5 border-t border-gray-100">
                <span className="text-sm text-gray-600 block mb-2">Opsi Jadwal</span>
                <div className="space-y-1.5">
                  {transferData.skipHolidays && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Lewati akhir pekan & hari libur</span>
                    </div>
                  )}
                  {transferData.notifyBeforeTransfer && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Notifikasi 30 menit sebelum transfer</span>
                    </div>
                  )}
                  {transferData.autoCancelIfInsufficient && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                      <span>Auto batal jika saldo tidak cukup</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="bg-amber-50 rounded-2xl p-4 flex gap-3">
          <InfoIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-700 font-medium">
              {transferData.isScheduled 
                ? 'Pembuatan jadwal transfer memerlukan verifikasi OTP'
                : 'Pastikan data penerima sudah sesuai sebelum melanjutkan'
              }
            </p>
            {needsExtraOtp && (
              <p className="text-xs text-amber-600 mt-1">
                Transfer di atas Rp{formatCurrency(highValueThreshold)} memerlukan OTP tambahan saat eksekusi
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Total</span>
          <span className="text-xl font-bold text-gray-800">Rp{formatCurrency(totalAmount)}</span>
        </div>
        <button
          onClick={() => onNavigate('otp')}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3.5 rounded-xl hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 active:scale-[0.98]"
        >
          Konfirmasi
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
