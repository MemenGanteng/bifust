import React, { useState } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeftIcon, LockIcon, DeleteIcon } from '../components/Icons';

const PINScreen = ({ onNavigate, onVerifyPIN, transferData }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleNumberPress = (num) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      setError('');
      
      // Auto submit when 6 digits entered
      if (newPin.length === 6) {
        verifyPIN(newPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const verifyPIN = (pinCode) => {
    setIsVerifying(true);
    
    // Simulate PIN verification (accept any 6-digit PIN for prototype)
    setTimeout(() => {
      setIsVerifying(false);
      // For prototype: PIN "123456" or any 6 digits is valid
      if (pinCode.length === 6) {
        onVerifyPIN(pinCode);
      } else {
        setError('PIN tidak valid');
        setPin('');
      }
    }, 800);
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete']
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 to-red-600 flex flex-col">
      <StatusBar light />
      
      {/* Header */}
      <div className="px-4 py-3 flex items-center">
        <button 
          onClick={() => onNavigate('summary')}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-white font-semibold text-lg pr-10">
          Masukkan PIN
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Lock Icon */}
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6">
          <LockIcon className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-white text-xl font-semibold mb-2">
          Masukkan PIN Anda
        </h2>
        <p className="text-white/80 text-sm text-center mb-8">
          Masukkan 6 digit PIN untuk melanjutkan transaksi
        </p>

        {/* PIN Dots */}
        <div className="flex gap-4 mb-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                i < pin.length 
                  ? 'bg-white scale-110' 
                  : 'bg-white/30'
              } ${isVerifying && i < pin.length ? 'animate-pulse' : ''}`}
            />
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-yellow-300 text-sm mb-4">{error}</p>
        )}

        {/* Loading State */}
        {isVerifying && (
          <p className="text-white/80 text-sm mb-4">Memverifikasi PIN...</p>
        )}
      </div>

      {/* Keypad */}
      <div className="bg-white rounded-t-3xl px-6 py-8">
        <div className="max-w-xs mx-auto">
          {keypadNumbers.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-6 mb-4">
              {row.map((key, keyIndex) => (
                <button
                  key={keyIndex}
                  onClick={() => {
                    if (key === 'delete') {
                      handleDelete();
                    } else if (key !== '') {
                      handleNumberPress(key);
                    }
                  }}
                  disabled={isVerifying || (key === '' )}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold transition-all ${
                    key === '' 
                      ? 'invisible' 
                      : key === 'delete'
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-red-100 active:text-red-600'
                  } ${isVerifying ? 'opacity-50' : ''}`}
                >
                  {key === 'delete' ? (
                    <DeleteIcon className="w-6 h-6" />
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Forgot PIN Link */}
        <p className="text-center mt-4">
          <button className="text-red-600 text-sm font-medium">
            Lupa PIN?
          </button>
        </p>
      </div>
    </div>
  );
};

export default PINScreen;
