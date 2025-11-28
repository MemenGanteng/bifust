import React from 'react';
import { HomeIcon, TransferIcon, WalletIcon, SettingsIcon } from './Icons';

const BottomNav = ({ active, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'rekening', icon: TransferIcon, label: 'Rekening Saya' },
    { id: 'wealth', icon: WalletIcon, label: 'Wealth' },
    { id: 'settings', icon: SettingsIcon, label: 'Pengaturan' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 flex justify-around items-center max-w-md mx-auto z-50">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
            active === item.id 
              ? 'text-red-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
