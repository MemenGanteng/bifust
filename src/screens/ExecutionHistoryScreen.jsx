import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { 
  ChevronLeftIcon, 
  CheckIcon,
  WarningIcon,
  ClockIcon,
  CalendarIcon,
  SearchIcon,
} from '../components/Icons';
import { formatCurrency, formatDate, dayNames } from '../utils/helpers';

const ExecutionHistoryScreen = ({ onNavigate, scheduledTransfers }) => {
  const [filter, setFilter] = useState('all'); // all, success, failed
  const [selectedSchedule, setSelectedSchedule] = useState('all');

  // Flatten all executions from all schedules
  const allExecutions = scheduledTransfers.flatMap(schedule => 
    schedule.executions.map(exec => ({
      ...exec,
      scheduleName: schedule.recipientName,
      scheduleId: schedule.id,
      bankName: schedule.bankName,
      bankCode: schedule.bankCode,
      bankColor: schedule.bankColor,
      accountNumber: schedule.recipientAccount,
    }))
  ).sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date desc

  // Filter executions
  const filteredExecutions = allExecutions.filter(exec => {
    const matchesStatus = filter === 'all' || exec.status === filter;
    const matchesSchedule = selectedSchedule === 'all' || exec.scheduleId === selectedSchedule;
    return matchesStatus && matchesSchedule;
  });

  // Stats
  const totalSuccess = allExecutions.filter(e => e.status === 'success').length;
  const totalFailed = allExecutions.filter(e => e.status === 'failed').length;
  const totalAmount = allExecutions
    .filter(e => e.status === 'success')
    .reduce((sum, e) => sum + e.amount, 0);

  const getStatusIcon = (status) => {
    if (status === 'success') {
      return (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <CheckIcon className="w-5 h-5 text-green-600" />
        </div>
      );
    }
    if (status === 'failed') {
      return (
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <WarningIcon className="w-5 h-5 text-red-600" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
        <ClockIcon className="w-5 h-5 text-yellow-600" />
      </div>
    );
  };

  const getFailReasonBadge = (reason) => {
    const reasons = {
      'Saldo tidak cukup': { color: 'bg-red-100 text-red-700', icon: '💰' },
      'Rekening tujuan tidak valid': { color: 'bg-orange-100 text-orange-700', icon: '🏦' },
      'Limit terlampaui': { color: 'bg-purple-100 text-purple-700', icon: '📊' },
      'Timeout': { color: 'bg-gray-100 text-gray-700', icon: '⏱️' },
      'Gangguan sistem': { color: 'bg-blue-100 text-blue-700', icon: '🔧' },
    };
    
    const style = reasons[reason] || { color: 'bg-gray-100 text-gray-700', icon: '❌' };
    
    return (
      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${style.color}`}>
        <span>{style.icon}</span>
        <span>{reason}</span>
      </span>
    );
  };

  // Group by date
  const groupedByDate = filteredExecutions.reduce((acc, exec) => {
    const date = exec.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(exec);
    return acc;
  }, {});

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
          <h1 className="text-white text-lg font-semibold">Riwayat Eksekusi</h1>
        </div>

        {/* Stats */}
        <div className="px-4 lg:px-8 pb-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-white text-xl font-bold">{allExecutions.length}</p>
              <p className="text-white/70 text-xs">Total Eksekusi</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-green-300 text-xl font-bold">{totalSuccess}</p>
              <p className="text-white/70 text-xs">Berhasil</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-red-300 text-xl font-bold">{totalFailed}</p>
              <p className="text-white/70 text-xs">Gagal</p>
            </div>
          </div>
          <div className="mt-3 bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <p className="text-white/70 text-xs">Total Transfer Berhasil</p>
            <p className="text-white text-2xl font-bold">Rp{formatCurrency(totalAmount)}</p>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-4">
        {/* Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'Semua', count: allExecutions.length },
            { id: 'success', label: 'Berhasil', count: totalSuccess },
            { id: 'failed', label: 'Gagal', count: totalFailed },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                filter === tab.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                filter === tab.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Schedule Filter */}
        <div className="mb-4">
          <select
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            className="w-full bg-white rounded-xl px-4 py-3 text-sm text-gray-700 border-0 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Semua Jadwal</option>
            {scheduledTransfers.map(schedule => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.recipientName} - {schedule.bankName}
              </option>
            ))}
          </select>
        </div>

        {/* Execution List */}
        {filteredExecutions.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(groupedByDate).map(([date, executions]) => (
              <div key={date}>
                {/* Date Header */}
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <p className="text-sm font-medium text-gray-600">{formatDate(date)}</p>
                </div>

                {/* Executions for this date */}
                <div className="space-y-2">
                  {executions.map(exec => (
                    <div key={exec.id} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(exec.status)}
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-800 truncate">{exec.scheduleName}</p>
                            {exec.status === 'success' ? (
                              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                                Berhasil
                              </span>
                            ) : (
                              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                                Gagal
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {exec.bankName} • {exec.accountNumber}
                          </p>
                          
                          {exec.status === 'failed' && exec.failReason && (
                            <div className="mt-2">
                              {getFailReasonBadge(exec.failReason)}
                            </div>
                          )}

                          {exec.transactionId && (
                            <p className="text-[10px] text-gray-400 mt-2 font-mono">
                              ID: {exec.transactionId}
                            </p>
                          )}
                        </div>

                        <div className="text-right flex-shrink-0">
                          <p className={`font-bold ${exec.status === 'success' ? 'text-green-600' : 'text-gray-400 line-through'}`}>
                            Rp{formatCurrency(exec.amount)}
                          </p>
                          {exec.status === 'success' && exec.fee && (
                            <p className="text-xs text-gray-400">
                              +Rp{formatCurrency(exec.fee)} fee
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">Tidak ada riwayat eksekusi</p>
            <p className="text-gray-400 text-sm mt-1">Riwayat akan muncul setelah jadwal dieksekusi</p>
          </div>
        )}

        {/* Legend */}
        {filteredExecutions.length > 0 && (
          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-gray-600 mb-3">Keterangan Status Gagal:</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>💰</span>
                <span>Saldo tidak cukup</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>🏦</span>
                <span>Rekening tidak valid</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>📊</span>
                <span>Limit terlampaui</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>🔧</span>
                <span>Gangguan sistem</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionHistoryScreen;
