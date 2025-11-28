import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CalendarIcon,
  ClockIcon,
  SearchIcon,
} from '../components/Icons';
import { formatCurrency, formatDate, dayNames } from '../utils/helpers';

const ScheduledListScreen = ({ onNavigate, scheduledTransfers, onPauseSchedule }) => {
  const [filter, setFilter] = useState('all'); // all, active, paused
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransfers = scheduledTransfers.filter(transfer => {
    const matchesFilter = filter === 'all' || transfer.status === filter;
    const matchesSearch = 
      transfer.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transfer.bankName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getFrequencyLabel = (transfer) => {
    if (transfer.frequency === 'daily') return 'Setiap Hari';
    if (transfer.frequency === 'weekly') {
      const days = transfer.selectedDays.map(d => dayNames[d].short).join(', ');
      return `Setiap ${days}`;
    }
    if (transfer.frequency === 'monthly') return `Setiap Tgl ${transfer.selectedDate}`;
    return '-';
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Aktif</span>;
    }
    if (status === 'paused') {
      return <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">Dijeda</span>;
    }
    if (status === 'completed') {
      return <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">Selesai</span>;
    }
    return null;
  };

  const activeCount = scheduledTransfers.filter(s => s.status === 'active').length;
  const pausedCount = scheduledTransfers.filter(s => s.status === 'paused').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 lg:px-8 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Transfer Terjadwal</h1>
        </div>

        {/* Stats */}
        <div className="px-4 lg:px-8 pb-6">
          <div className="flex gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-white/70 text-xs">Jadwal Aktif</p>
              <p className="text-white text-2xl font-bold">{activeCount}</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-white/70 text-xs">Dijeda</p>
              <p className="text-white text-2xl font-bold">{pausedCount}</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-white/70 text-xs">Total</p>
              <p className="text-white text-2xl font-bold">{scheduledTransfers.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cari penerima atau bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'active', label: 'Aktif' },
            { id: 'paused', label: 'Dijeda' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === tab.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {filteredTransfers.length > 0 ? (
            filteredTransfers.map(transfer => (
              <div
                key={transfer.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  {/* Bank Logo */}
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: transfer.bankColor }}
                  >
                    {transfer.bankCode.slice(0, 4)}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800 truncate">{transfer.recipientName}</p>
                      {getStatusBadge(transfer.status)}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{transfer.bankName} • {transfer.recipientAccount}</p>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{getFrequencyLabel(transfer)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        <span>s/d {formatDate(transfer.endDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amount & Action */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-gray-800">Rp{formatCurrency(transfer.amount)}</p>
                    <button
                      onClick={() => onNavigate('scheduleDetail', { schedule: transfer })}
                      className="text-red-600 text-xs font-medium mt-1 hover:underline"
                    >
                      Detail →
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => onPauseSchedule(transfer.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                      transfer.status === 'paused'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    {transfer.status === 'paused' ? 'Aktifkan' : 'Jeda'}
                  </button>
                  <button
                    onClick={() => onNavigate('scheduleDetail', { schedule: transfer })}
                    className="flex-1 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Tidak ada jadwal transfer</p>
              <p className="text-gray-400 text-sm mt-1">Buat jadwal transfer baru untuk melihat di sini</p>
              <button
                onClick={() => onNavigate('transferType')}
                className="mt-4 px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-all"
              >
                Buat Jadwal Baru
              </button>
            </div>
          )}
        </div>

        {/* View History Button */}
        {scheduledTransfers.length > 0 && (
          <button
            onClick={() => onNavigate('executionHistory')}
            className="w-full mt-4 py-3 bg-white rounded-xl text-red-600 font-medium text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <ClockIcon className="w-5 h-5" />
            Lihat Riwayat Eksekusi
          </button>
        )}
      </div>

      <BottomNav active="home" onNavigate={(id) => {
        if (id === 'home') onNavigate('home');
      }} />
    </div>
  );
};

export default ScheduledListScreen;
