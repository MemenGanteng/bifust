import React, { useState, useEffect, useRef } from 'react';
import StatusBar from '../components/StatusBar';
import { ChevronLeftIcon, ClockIcon, InfoIcon, ShieldCheckIcon } from '../components/Icons';

const OTPScreen = ({ 
  onNavigate, 
  onVerify, 
  isScheduled,
  otpType = 'schedule', // 'schedule' | 'highValue'
  amount = 0,
}) => {
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

  // Reset OTP when type changes
  useEffect(() => {
    setOtpCode(['', '', '', '', '', '']);
    setTimer(60);
    inputRefs.current[0]?.focus();
  }, [otpType]);

  // Handle input change
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpCode];
    newOtp[index] = value.slice(-1);
    setOtpCode(newOtp);

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
      setTimeout(() => {
        setIsVerifying(false);
        onVerify();
      }, 1500);
    }
  };

  const isComplete = otpCode.join('').length === 6;

  // Content based on OTP type
  const otpContent = {
    schedule: {
      title: 'Verifikasi Penjadwalan',
      subtitle: 'Masukkan Kode OTP',
      description: 'Kami telah mengirimkan kode 6 digit ke nomor handphone Anda',
      icon: '📱',
      iconBadge: '✉️',
      infoText: 'Tidak menerima kode? Pastikan nomor handphone yang terdaftar aktif dan memiliki sinyal.',
      buttonText: 'Verifikasi Jadwal',
      headerColor: 'from-red-600 to-red-700',
    },
    highValue: {
      title: 'Verifikasi Nominal Besar',
      subtitle: 'Konfirmasi Keamanan Tambahan',
      description: `Transfer >Rp10.000.000 memerlukan verifikasi tambahan untuk keamanan transaksi Anda`,
      icon: '🔐',
      iconBadge: '⚠️',
      infoText: 'Verifikasi tambahan diperlukan untuk transfer dengan nominal besar demi keamanan rekening Anda.',
      buttonText: 'Konfirmasi Transfer',
      headerColor: 'from-amber-600 to-amber-700',
    },
  };

  const content = otpContent[otpType];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`bg-gradient-to-br ${content.headerColor} rounded-b-3xl`}>
        <StatusBar />
        <div className="px-4 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate(otpType === 'highValue' ? 'otp' : 'pin')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">{content.title}</h1>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Illustration */}
        <div className="flex justify-center mb-8">
          <div className={`w-36 h-36 ${otpType === 'highValue' ? 'bg-gradient-to-br from-amber-100 to-amber-50' : 'bg-gradient-to-br from-red-100 to-red-50'} rounded-full flex items-center justify-center relative`}>
            <div className="text-6xl">{content.icon}</div>
            <div className={`absolute -bottom-1 -right-1 w-12 h-12 ${otpType === 'highValue' ? 'bg-amber-500' : 'bg-green-500'} rounded-full flex items-center justify-center text-white text-2xl shadow-lg`}>
              {content.iconBadge}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{content.subtitle}</h2>
          <p className="text-gray-500 text-sm">
            {content.description}
            {otpType === 'schedule' && (
              <><br /><span className="font-medium text-gray-700">••••••••89</span></>
            )}
          </p>
        </div>

        {/* High Value Warning Badge */}
        {otpType === 'highValue' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">Verifikasi Keamanan Level 2</p>
              <p className="text-xs text-amber-600">OTP kedua untuk nominal besar</p>
            </div>
          </div>
        )}

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
                  ? otpType === 'highValue' ? 'border-amber-500 text-gray-800' : 'border-red-500 text-gray-800'
                  : 'border-gray-200 text-gray-400'
              } ${isVerifying ? 'opacity-50' : ''}`}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          {timer > 0 ? (
            <div className={`flex items-center justify-center gap-2 ${otpType === 'highValue' ? 'text-amber-600' : 'text-red-600'}`}>
              <ClockIcon className="w-5 h-5" />
              <span className="font-medium">
                Kirim ulang dalam {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
              </span>
            </div>
          ) : (
            <button 
              onClick={handleResend}
              className={`${otpType === 'highValue' ? 'text-amber-600' : 'text-red-600'} font-semibold hover:underline`}
            >
              Kirim Ulang Kode
            </button>
          )}
        </div>

        {/* Help */}
        <div className={`${otpType === 'highValue' ? 'bg-amber-50' : 'bg-blue-50'} rounded-2xl p-4 flex gap-3 mb-8`}>
          <InfoIcon className={`w-5 h-5 ${otpType === 'highValue' ? 'text-amber-600' : 'text-blue-600'} flex-shrink-0 mt-0.5`} />
          <p className={`text-sm ${otpType === 'highValue' ? 'text-amber-700' : 'text-blue-700'}`}>
            {content.infoText}
          </p>
        </div>

        {/* Step Indicator for High Value */}
        {otpType === 'highValue' && (
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">✓</div>
              <span className="text-xs text-gray-500">OTP 1</span>
            </div>
            <div className="w-8 h-0.5 bg-amber-400"></div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center">2</div>
              <span className="text-xs text-amber-600 font-medium">OTP 2</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          disabled={!isComplete || isVerifying}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
            isComplete && !isVerifying
              ? otpType === 'highValue'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-200 hover:from-amber-700 hover:to-amber-600 active:scale-[0.98]'
                : 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-200 hover:from-red-700 hover:to-red-600 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Memverifikasi...</span>
            </>
          ) : (
            content.buttonText
          )}
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;
