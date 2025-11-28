import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { 
  ChevronLeftIcon, 
  CalendarIcon,
  ClockIcon,
  CheckIcon,
  UserIcon,
  InfoIcon,
  WarningIcon,
} from '../components/Icons';
import { formatCurrency, formatDate, formatDateTime, dayNames } from '../utils/helpers';

const ScheduleDetailScreen = ({ onNavigate, schedule, onPauseSchedule, onDeleteSchedule }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!schedule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Jadwal tidak ditemukan</p>
      </div>
    );
  }

  const getFrequencyLabel = () => {
    if (schedule.frequency === 'daily') return 'Setiap Hari';
    if (schedule.frequency === 'weekly') {
      const days = schedule.selectedDays.map(d => dayNames[d].long).join(', ');
      return `Setiap ${days}`;
    }
    if (schedule.frequency === 'monthly') return `Setiap Tanggal ${schedule.selectedDate}`;
    return '-';
  };

  const getStatusInfo = () => {
    if (schedule.status === 'active') {
      return { 
        label: 'Aktif', 
        color: 'bg-green-100 text-green-700',
        desc: 'Jadwal berjalan sesuai pengaturan'
      };
    }
    if (schedule.status === 'paused') {
      return { 
        label: 'Dijeda', 
        color: 'bg-yellow-100 text-yellow-700',
        desc: 'Jadwal dihentikan sementara'
      };
    }
    if (schedule.status === 'completed') {
      return { 
        label: 'Selesai', 
        color: 'bg-gray-100 text-gray-600',
        desc: 'Jadwal telah berakhir'
      };
    }
    return { label: '-', color: '', desc: '' };
  };

  const statusInfo = getStatusInfo();

  // Calculate stats
  const successCount = schedule.executions.filter(e => e.status === 'success').length;
  const failedCount = schedule.executions.filter(e => e.status === 'failed').length;
  const totalExecuted = schedule.executions.length;

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 lg:px-8 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('scheduledList')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Detail Jadwal</h1>
        </div>

        {/* Status Card */}
        <div className="mx-4 lg:mx-8 mb-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs mb-1">Status Jadwal</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
              <p className="text-white/60 text-xs mt-1">{statusInfo.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Total Eksekusi</p>
              <p className="text-white text-2xl font-bold">{totalExecuted}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-4 space-y-4">
        {/* Recipient Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs text-gray-400 mb-3 font-medium">Penerima</h3>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
              style={{ backgroundColor: schedule.bankColor }}
            >
              {schedule.bankCode.slice(0, 4)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-800">{schedule.recipientName}</p>
              <p className="text-sm text-gray-500">{schedule.bankName}</p>
              <p className="text-xs text-gray-400">{schedule.recipientAccount}</p>
            </div>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs text-gray-400 mb-3 font-medium">Detail Transfer</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Nominal per Transfer</span>
              <span className="font-bold text-gray-800 text-lg">Rp{formatCurrency(schedule.amount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Biaya Admin</span>
              <span className="font-medium text-gray-700">Rp2.500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Metode</span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">BI-FAST</span>
            </div>
          </div>
        </div>

        {/* Schedule Details */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs text-gray-400 mb-3 font-medium">Pengaturan Jadwal</h3>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Frekuensi</span>
              <span className="font-semibold text-gray-800">{getFrequencyLabel()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tanggal Mulai</span>
              <span className="font-medium text-gray-700">{formatDate(schedule.startDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tanggal Berakhir</span>
              <span className="font-medium text-gray-700">{formatDate(schedule.endDate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dibuat</span>
              <span className="font-medium text-gray-700 text-xs">{formatDateTime(schedule.createdAt)}</span>
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              {schedule.skipHolidays ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 rounded border-2 border-gray-300" />
              )}
              <span className={schedule.skipHolidays ? 'text-gray-800' : 'text-gray-400'}>
                Lewati akhir pekan & hari libur
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {schedule.notifyBeforeTransfer ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 rounded border-2 border-gray-300" />
              )}
              <span className={schedule.notifyBeforeTransfer ? 'text-gray-800' : 'text-gray-400'}>
                Notifikasi sebelum transfer
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              {schedule.autoCancelIfInsufficient ? (
                <CheckIcon className="w-4 h-4 text-green-500" />
              ) : (
                <div className="w-4 h-4 rounded border-2 border-gray-300" />
              )}
              <span className={schedule.autoCancelIfInsufficient ? 'text-gray-800' : 'text-gray-400'}>
                Auto batal jika saldo tidak cukup
              </span>
            </div>
          </div>
        </div>

        {/* Execution Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-xs text-gray-400 mb-3 font-medium">Statistik Eksekusi</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-gray-800">{totalExecuted}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{successCount}</p>
              <p className="text-xs text-gray-500">Berhasil</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
              <p className="text-xs text-gray-500">Gagal</p>
            </div>
          </div>

          {/* Recent Executions */}
          {schedule.executions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Eksekusi Terakhir</p>
              <div className="space-y-2">
                {schedule.executions.slice(0, 3).map(exec => (
                  <div key={exec.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      {exec.status === 'success' ? (
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                          <WarningIcon className="w-3 h-3 text-red-600" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-800">{formatDate(exec.date)}</p>
                        {exec.status === 'failed' && (
                          <p className="text-xs text-red-500">{exec.failReason}</p>
                        )}
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${exec.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {exec.status === 'success' ? `Rp${formatCurrency(exec.amount)}` : 'Gagal'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => onPauseSchedule(schedule.id)}
            className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
              schedule.status === 'paused'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            {schedule.status === 'paused' ? 'Aktifkan Kembali' : 'Jeda Jadwal'}
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full py-3.5 rounded-xl font-semibold bg-white text-red-600 border-2 border-red-600 hover:bg-red-50 transition-all"
          >
            Hapus Jadwal
          </button>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-xl p-4 flex gap-3">
          <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Perubahan pada jadwal akan berlaku mulai eksekusi berikutnya. Eksekusi yang sudah berjalan tidak dapat dibatalkan.
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <WarningIcon className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">Hapus Jadwal?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Jadwal transfer ke <span className="font-semibold">{schedule.recipientName}</span> akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                Batal
              </button>
              <button
                onClick={() => onDeleteSchedule(schedule.id)}
                className="flex-1 py-3 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleDetailScreen;
