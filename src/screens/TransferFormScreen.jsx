import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar';
import Checkbox from '../components/Checkbox';
import { 
  ChevronLeftIcon, 
  HeartIcon, 
  UserIcon, 
  InfoIcon, 
  WarningIcon,
  CalendarIcon,
} from '../components/Icons';
import { formatCurrency, validateAmount, simulateAccountValidation, getTodayDate, dayNames, monthDates, calculateScheduleCount } from '../utils/helpers';
import { transferFees, transferLimits, highValueThreshold } from '../data/banks';

const TransferFormScreen = ({ 
  onNavigate, 
  selectedBank, 
  transferMethod,
  balance,
  transferData,
  setTransferData,
}) => {
  const [accountNumber, setAccountNumber] = useState(transferData.accountNumber || '');
  const [accountName, setAccountName] = useState(transferData.accountName || '');
  const [amount, setAmount] = useState(transferData.amount || '');
  const [message, setMessage] = useState(transferData.message || '');
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState({});

  // Schedule states
  const [isScheduled, setIsScheduled] = useState(transferData.isScheduled || false);
  const [frequency, setFrequency] = useState(transferData.frequency || 'daily');
  const [startDate, setStartDate] = useState(transferData.startDate || '');
  const [endDate, setEndDate] = useState(transferData.endDate || '');
  
  // For weekly: selected days
  const [selectedDays, setSelectedDays] = useState(transferData.selectedDays || []);
  
  // For monthly: selected date
  const [selectedDate, setSelectedDate] = useState(transferData.selectedDate || 1);
  
  // Options
  const [skipHolidays, setSkipHolidays] = useState(transferData.skipHolidays ?? true);
  const [notifyBeforeTransfer, setNotifyBeforeTransfer] = useState(transferData.notifyBeforeTransfer ?? true);
  const [autoCancelIfInsufficient, setAutoCancelIfInsufficient] = useState(transferData.autoCancelIfInsufficient ?? true);

  const fee = transferFees[transferMethod];
  const limits = transferLimits[transferMethod];

  // Validate account number
  useEffect(() => {
    if (accountNumber.length >= 10) {
      setIsValidating(true);
      simulateAccountValidation(selectedBank.code, accountNumber)
        .then(result => {
          setAccountName(result.name);
          setIsValidating(false);
        });
    } else {
      setAccountName('');
    }
  }, [accountNumber, selectedBank.code]);

  // Toggle day selection for weekly
  const toggleDay = (dayId) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  // Calculate schedule count
  const scheduleCount = isScheduled 
    ? calculateScheduleCount(startDate, endDate, frequency, selectedDays, selectedDate)
    : 0;

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!accountNumber || accountNumber.length < 10) {
      newErrors.account = 'Nomor rekening minimal 10 digit';
    }
    if (!accountName) {
      newErrors.account = 'Nomor rekening tidak valid';
    }
    
    // Include fee in validation
    const amountValidation = validateAmount(amount, limits.min, limits.max, balance, fee);
    if (!amountValidation.valid) {
      newErrors.amount = amountValidation.error;
    }
    
    if (isScheduled) {
      if (!startDate) newErrors.startDate = 'Pilih tanggal mulai';
      if (!endDate) newErrors.endDate = 'Pilih tanggal berakhir';
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        newErrors.endDate = 'Tanggal berakhir harus setelah tanggal mulai';
      }
      if (frequency === 'weekly' && selectedDays.length === 0) {
        newErrors.days = 'Pilih minimal 1 hari';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      setTransferData({
        accountNumber,
        accountName,
        amount,
        message,
        isScheduled,
        frequency,
        startDate,
        endDate,
        selectedDays,
        selectedDate,
        skipHolidays,
        notifyBeforeTransfer,
        autoCancelIfInsufficient,
        scheduleCount,
      });
      onNavigate('summary');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-b-3xl">
        <StatusBar />
        <div className="px-4 py-4 flex items-center gap-3">
          <button 
            onClick={() => onNavigate('selectBank')}
            className="text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Form Transfer</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {/* Selected Bank */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-xs text-gray-400 mb-2 block">Nama Bank</label>
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
              style={{ backgroundColor: selectedBank?.color }}
            >
              {selectedBank?.code.slice(0, 4)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{selectedBank?.name}</p>
              <p className="text-[10px] text-gray-400">Transfer BI-FAST tersedia</p>
            </div>
            <button className="text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors flex-shrink-0">
              <HeartIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Account Number */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-xs text-gray-400 mb-2 block">Nomor Rekening Tujuan</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Masukkan nomor rekening"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            className={`w-full text-lg font-semibold placeholder-gray-300 focus:outline-none ${
              errors.account ? 'text-red-600' : 'text-gray-800'
            }`}
          />
          {isValidating && (
            <div className="mt-2 flex items-center gap-2 text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
              <span className="text-sm">Memvalidasi rekening...</span>
            </div>
          )}
          {accountName && !isValidating && (
            <div className="mt-3 flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <UserIcon className="w-5 h-5" />
              <span className="font-medium text-sm">Nama Penerima: {accountName}</span>
            </div>
          )}
          {errors.account && (
            <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
              <WarningIcon className="w-4 h-4" />
              {errors.account}
            </p>
          )}
        </div>

        {/* Amount */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-xs text-gray-400 mb-2 block">Nominal Transfer</label>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-400">Rp</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={amount ? formatCurrency(amount) : ''}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              className={`flex-1 text-2xl font-bold focus:outline-none ${
                errors.amount ? 'text-red-600' : 'text-gray-800'
              }`}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            Minimum Rp{formatCurrency(limits.min)} • Maksimum Rp{formatCurrency(limits.max)}
          </p>
          {errors.amount && (
            <div className="mt-2 flex items-center gap-2 text-red-500 text-xs">
              <WarningIcon className="w-4 h-4" />
              <span>{errors.amount}</span>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <label className="text-xs text-gray-400 mb-2 block">Pesan (Opsional)</label>
          <input
            type="text"
            placeholder="Tulis catatan untuk penerima"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full text-gray-800 placeholder-gray-300 focus:outline-none text-sm"
            maxLength={50}
          />
          <p className="text-[10px] text-gray-400 mt-1 text-right">{message.length}/50</p>
        </div>

        {/* Schedule Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {/* Schedule Checkbox */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <Checkbox
                checked={isScheduled}
                onChange={setIsScheduled}
                label="Jadwalkan Transfer Ini"
                sublabel="Atur transfer otomatis secara berkala"
              />
            </div>
          </div>

          {/* Schedule Options - Only show when scheduled */}
          {isScheduled && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
              {/* Frequency */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block font-medium">Frekuensi</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'daily', label: 'Harian' },
                    { id: 'weekly', label: 'Mingguan' },
                    { id: 'monthly', label: 'Bulanan' },
                  ].map(freq => (
                    <button
                      key={freq.id}
                      onClick={() => setFrequency(freq.id)}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                        frequency === freq.id
                          ? 'bg-red-600 text-white shadow-md shadow-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly: Day Selection */}
              {frequency === 'weekly' && (
                <div>
                  <label className="text-xs text-gray-500 mb-2 block font-medium">Pilih Hari</label>
                  <div className="flex gap-1.5">
                    {dayNames.map(day => (
                      <button
                        key={day.id}
                        onClick={() => toggleDay(day.id)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedDays.includes(day.id)
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {day.short}
                      </button>
                    ))}
                  </div>
                  {errors.days && (
                    <p className="text-red-500 text-xs mt-1">{errors.days}</p>
                  )}
                </div>
              )}

              {/* Monthly: Date Selection */}
              {frequency === 'monthly' && (
                <div>
                  <label className="text-xs text-gray-500 mb-2 block font-medium">Tanggal Setiap Bulan</label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {monthDates.map(date => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`py-2 rounded-lg text-xs font-medium transition-all ${
                          selectedDate === date
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    * Jika tanggal tidak ada di bulan tertentu, transfer akan dilakukan di tanggal terakhir bulan tersebut
                  </p>
                </div>
              )}

              {/* Duration */}
              <div>
                <label className="text-xs text-gray-500 mb-2 block font-medium">Durasi Jadwal</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Tanggal Mulai</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={getTodayDate()}
                      className={`w-full bg-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.startDate ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-[10px] mt-1">{errors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 mb-1 block">Tanggal Berakhir</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || getTodayDate()}
                      className={`w-full bg-gray-100 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.endDate ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-[10px] mt-1">{errors.endDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Estimated Count */}
              {scheduleCount > 0 && (
                <div className="bg-red-50 rounded-xl p-3">
                  <p className="text-sm text-red-700">
                    <span className="font-semibold">Estimasi:</span> {scheduleCount}x transfer 
                    {frequency === 'daily' && ' (setiap hari)'}
                    {frequency === 'weekly' && ` (setiap ${selectedDays.map(d => dayNames[d].long).join(', ')})`}
                    {frequency === 'monthly' && ` (setiap tanggal ${selectedDate})`}
                  </p>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3 pt-2">
                <Checkbox
                  checked={skipHolidays}
                  onChange={setSkipHolidays}
                  label="Lewati Akhir Pekan & Hari Libur"
                  sublabel="Transfer tidak dieksekusi di hari libur nasional"
                />
                <Checkbox
                  checked={notifyBeforeTransfer}
                  onChange={setNotifyBeforeTransfer}
                  label="Kirim Notifikasi Sebelum Transfer"
                  sublabel="Pengingat 30 menit sebelum transfer"
                />
                <Checkbox
                  checked={autoCancelIfInsufficient}
                  onChange={setAutoCancelIfInsufficient}
                  label="Auto Batal Jika Saldo Tidak Cukup"
                  sublabel="Transfer tidak dieksekusi jika saldo kurang"
                />
              </div>
            </div>
          )}
        </div>

        {/* Info Banners */}
        <div className="space-y-2">
          <div className="bg-blue-50 rounded-xl p-3 flex gap-3">
            <InfoIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              Biaya transfer: <span className="font-semibold">Rp{formatCurrency(fee)}</span> per transaksi
            </p>
          </div>
          {parseInt(amount) > highValueThreshold && (
            <div className="bg-amber-50 rounded-xl p-3 flex gap-3">
              <WarningIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                Transfer di atas Rp{formatCurrency(highValueThreshold)} memerlukan <span className="font-semibold">OTP tambahan</span> saat eksekusi
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 max-w-md mx-auto">
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-3.5 rounded-xl hover:from-red-700 hover:to-red-600 transition-all shadow-lg shadow-red-200 active:scale-[0.98]"
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default TransferFormScreen;
