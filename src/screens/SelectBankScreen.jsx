import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '../components/Icons';
import { banks } from '../data/banks';

const SelectBankScreen = ({ onNavigate, onSelectBank, transferMethod }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('semua');

  // Filter banks based on search and category
  const filteredBanks = banks.filter(bank => {
    const matchesSearch = 
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMethod = bank.methods.includes(transferMethod);
    
    // Add category filter logic if needed
    let matchesCategory = true;
    if (activeFilter === 'syariah') {
      matchesCategory = bank.code === 'BSI';
    }
    
    return matchesSearch && matchesMethod && matchesCategory;
  });

  const filters = [
    { id: 'semua', label: 'Semua' },
    { id: 'favorit', label: 'Bank Favorit' },
    { id: 'lokal', label: 'Bank Lokal' },
    { id: 'syariah', label: 'Bank Syariah' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('transferType')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Pilih Bank Tujuan</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Cari bank tujuan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-5 h-5" />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-4 px-4">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bank List */}
        <div className="space-y-2">
          {filteredBanks.length > 0 ? (
            filteredBanks.map(bank => (
              <button
                key={bank.id}
                onClick={() => {
                  onSelectBank(bank);
                  onNavigate('transferForm');
                }}
                className="w-full bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-all active:bg-gray-50"
              >
                {/* Bank Logo / Initial */}
                <div 
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={{ backgroundColor: bank.color }}
                >
                  {bank.logo ? (
                    <img src={bank.logo} alt={bank.code} className="w-8 h-8 object-contain" />
                  ) : (
                    bank.code.slice(0, 4)
                  )}
                </div>
                
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">{bank.name}</h3>
                  <p className="text-[10px] text-gray-400 truncate">
                    Transfer {bank.methods.map(m => m === 'bifast' ? 'BI-FAST' : m === 'online' ? 'Online' : 'RTGS').join('/ ')} tersedia
                  </p>
                </div>
                
                <ChevronRightIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </button>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">Bank tidak ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectBankScreen;
