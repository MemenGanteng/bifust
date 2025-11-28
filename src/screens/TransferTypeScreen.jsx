import React from 'react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  BiFastIcon, 
  OnlineIcon, 
  RTGSIcon,
  InfoIcon 
} from '../components/Icons';
import { formatCurrency } from '../utils/helpers';
import { transferFees } from '../data/banks';

const TransferTypeScreen = ({ onNavigate, onSelectMethod }) => {
  const transferOptions = [
    { 
      id: 'bifast', 
      title: 'BI-FAST', 
      desc: 'Transfer instan ke semua bank di Indonesia (<3 detik)',
      icon: BiFastIcon,
      fee: transferFees.bifast,
      recommended: true,
      features: ['Real-time', 'Bisa dijadwalkan', '24/7']
    },
    { 
      id: 'online', 
      title: 'Online / LLG', 
      desc: 'Transfer ke bank melalui kliring',
      icon: OnlineIcon,
      fee: transferFees.online,
      features: ['Jam operasional bank']
    },
    { 
      id: 'rtgs', 
      title: 'RTGS', 
      desc: 'Transfer nominal besar antar bank (min. Rp100 juta)',
      icon: RTGSIcon,
      fee: transferFees.rtgs,
      features: ['Nominal besar', 'Jam operasional']
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Pilih Jenis Transfer</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Transfer dari */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-400 mb-2">Transfer Dari</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">OCTO</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">OCTO Pay (••••3433)</p>
              <p className="text-xs text-gray-400">IDR ••••</p>
            </div>
          </div>
        </div>

        {/* Transfer Options */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-600 px-1">Jenis Transfer</p>
          
          {transferOptions.map(option => (
            <button
              key={option.id}
              onClick={() => {
                onSelectMethod(option.id);
                onNavigate('selectBank');
              }}
              className={`w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all border-2 ${
                option.recommended ? 'border-red-100' : 'border-transparent'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                option.recommended 
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <option.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-800">{option.title}</h3>
                  {option.recommended && (
                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                      Rekomendasi
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{option.desc}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs text-gray-400">Biaya: Rp{formatCurrency(option.fee)}</span>
                  {option.features.map((f, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="bg-green-50 rounded-2xl p-4 flex gap-3">
          <div className="text-green-600 mt-0.5 flex-shrink-0">
            <InfoIcon className="w-5 h-5" />
          </div>
          <p className="text-sm text-green-700">
            <span className="font-semibold">BI-FAST</span> adalah metode transfer yang paling cepat dengan biaya terjangkau. Mendukung fitur <span className="font-semibold">transfer terjadwal</span>!
          </p>
        </div>
      </div>

      <BottomNav active="transfer" onNavigate={(id) => {
        if (id === 'home') onNavigate('home');
      }} />
    </div>
  );
};

export default TransferTypeScreen;
