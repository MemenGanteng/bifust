import React, { useState, useEffect, useRef } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeftIcon, ClockIcon, InfoIcon } from '../components/Icons';

const OTPScreen = ({ onNavigate, onVerify, isScheduled }) => {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    }
  }, [timer]);

  // Auto focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle input change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtpCode(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key down for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otpCode];
    
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    
    setOtpCode(newOtp);
    
    // Focus last filled input or last input
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  // Handle resend
  const handleResend = () => {
    setTimer(60);
    setOtpCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  // Handle verify
  const handleVerify = () => {
    if (otpCode.join('').length === 6) {
      setIsVerifying(true);
      // Simulate verification delay
      setTimeout(() => {
        setIsVerifying(false);
        onVerify();
      }, 1500);
    }
  };

  const isComplete = otpCode.join('').length === 6;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('summary')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Verifikasi OTP</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className="w-36 h-36 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center relative">
            <div className="text-6xl">📱</div>
            <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              ✉️
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Masukkan Kode OTP</h2>
          <p className="text-gray-500 text-sm">
            Kami telah mengirimkan kode 6 digit ke nomor<br />
            handphone Anda <span className="font-medium text-gray-700">••••••••89</span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-2 mb-6">
          {otpCode.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isVerifying}
              className={`w-12 h-14 text-center text-2xl font-bold bg-white border-2 rounded-xl focus:outline-none transition-all ${
                digit 
                  ? 'border-red-500 text-gray-800' 
                  : 'border-gray-200 text-gray-400'
              } ${isVerifying ? 'opacity-50' : ''}`}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          {timer > 0 ? (
            <div className="flex items-center justify-center gap-2 text-red-600">
              <ClockIcon className="w-5 h-5" />
              <span className="font-medium">
                Kirim ulang dalam {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
              </span>
            </div>
          ) : (
            <button 
              onClick={handleResend}
              className="text-red-600 font-semibold hover:underline"
            >
              Kirim Ulang Kode
            </button>
          )}
        </div>

        {/* Help */}
        <div className="bg-blue-50 rounded-2xl p-4 flex gap-3 mb-8">
          <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Tidak menerima kode? Pastikan nomor handphone yang terdaftar aktif dan memiliki sinyal.
          </p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          disabled={!isComplete || isVerifying}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
            isComplete && !isVerifying
              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200 hover:from-red-700 hover:to-red-600 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Memverifikasi...</span>
            </>
          ) : (
            'Verifikasi'
          )}
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;
