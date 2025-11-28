import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import TransferTypeScreen from './screens/TransferTypeScreen';
import SelectBankScreen from './screens/SelectBankScreen';
import TransferFormScreen from './screens/TransferFormScreen';
import SummaryScreen from './screens/SummaryScreen';
import OTPScreen from './screens/OTPScreen';
import SuccessScreen from './screens/SuccessScreen';
import ScheduledListScreen from './screens/ScheduledListScreen';
import ScheduleDetailScreen from './screens/ScheduleDetailScreen';
import ExecutionHistoryScreen from './screens/ExecutionHistoryScreen';
import FavoriteRecipientsScreen from './screens/FavoriteRecipientsScreen';
import { generateTransactionId, generateReferenceNumber, formatDateTime } from './utils/helpers';

function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // User data
  const [balance, setBalance] = useState(43280000);
  
  // Transfer flow state
  const [transferMethod, setTransferMethod] = useState('bifast');
  const [selectedBank, setSelectedBank] = useState(null);
  const [transferData, setTransferData] = useState({
    accountNumber: '',
    accountName: '',
    amount: '',
    message: '',
    isScheduled: false,
    frequency: 'daily',
    startDate: '',
    endDate: '',
    selectedDays: [],
    selectedDate: 1,
    skipHolidays: true,
    notifyBeforeTransfer: true,
    autoCancelIfInsufficient: true,
    scheduleCount: 0,
  });
  
  // Transaction result
  const [transactionResult, setTransactionResult] = useState({
    transactionId: '',
    referenceNumber: '',
    time: '',
  });

  // Scheduled transfers (dummy data for demo)
  const [scheduledTransfers, setScheduledTransfers] = useState([
    {
      id: 'SCH001',
      recipientName: 'BUDI SANTOSO',
      recipientAccount: '1234567890',
      bankName: 'Bank Central Asia',
      bankCode: 'BCA',
      bankColor: '#003D79',
      amount: 500000,
      frequency: 'monthly',
      selectedDate: 25,
      selectedDays: [],
      startDate: '2025-11-01',
      endDate: '2026-11-01',
      status: 'active', // active, paused, completed
      skipHolidays: true,
      notifyBeforeTransfer: true,
      autoCancelIfInsufficient: true,
      createdAt: '2025-11-01T10:00:00',
      executions: [
        { id: 'EXE001', date: '2025-11-25', status: 'success', amount: 500000, fee: 2500, transactionId: 'MB1234567890' },
      ]
    },
    {
      id: 'SCH002',
      recipientName: 'SITI RAHAYU',
      recipientAccount: '0987654321',
      bankName: 'Bank Mandiri',
      bankCode: 'MANDIRI',
      bankColor: '#003366',
      amount: 1000000,
      frequency: 'weekly',
      selectedDate: 1,
      selectedDays: [1, 5], // Senin, Jumat
      startDate: '2025-11-01',
      endDate: '2025-12-31',
      status: 'active',
      skipHolidays: false,
      notifyBeforeTransfer: true,
      autoCancelIfInsufficient: false,
      createdAt: '2025-11-01T14:00:00',
      executions: [
        { id: 'EXE002', date: '2025-11-22', status: 'success', amount: 1000000, fee: 2500, transactionId: 'MB1234567891' },
        { id: 'EXE003', date: '2025-11-25', status: 'failed', amount: 1000000, fee: 0, transactionId: null, failReason: 'Saldo tidak cukup' },
      ]
    },
    {
      id: 'SCH003',
      recipientName: 'AHMAD WIJAYA',
      recipientAccount: '5678901234',
      bankName: 'Bank BNI',
      bankCode: 'BNI',
      bankColor: '#F15A22',
      amount: 250000,
      frequency: 'daily',
      selectedDate: 1,
      selectedDays: [],
      startDate: '2025-11-20',
      endDate: '2025-11-30',
      status: 'paused',
      skipHolidays: true,
      notifyBeforeTransfer: true,
      autoCancelIfInsufficient: true,
      createdAt: '2025-11-20T09:00:00',
      executions: [
        { id: 'EXE004', date: '2025-11-20', status: 'success', amount: 250000, fee: 2500, transactionId: 'MB1234567892' },
        { id: 'EXE005', date: '2025-11-21', status: 'success', amount: 250000, fee: 2500, transactionId: 'MB1234567893' },
        { id: 'EXE006', date: '2025-11-22', status: 'failed', amount: 250000, fee: 0, transactionId: null, failReason: 'Rekening tujuan tidak valid' },
      ]
    },
  ]);

  // Selected schedule for detail view
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Favorite recipients
  const [favoriteRecipients, setFavoriteRecipients] = useState([
    { id: 'FAV001', name: 'BUDI SANTOSO', accountNumber: '1234567890', bankCode: 'BCA', bankName: 'Bank Central Asia', bankColor: '#003D79' },
    { id: 'FAV002', name: 'SITI RAHAYU', accountNumber: '0987654321', bankCode: 'MANDIRI', bankName: 'Bank Mandiri', bankColor: '#003366' },
  ]);

  // Reset transfer state
  const resetTransfer = () => {
    setTransferMethod('bifast');
    setSelectedBank(null);
    setTransferData({
      accountNumber: '',
      accountName: '',
      amount: '',
      message: '',
      isScheduled: false,
      frequency: 'daily',
      startDate: '',
      endDate: '',
      selectedDays: [],
      selectedDate: 1,
      skipHolidays: true,
      notifyBeforeTransfer: true,
      autoCancelIfInsufficient: true,
      scheduleCount: 0,
    });
    setTransactionResult({
      transactionId: '',
      referenceNumber: '',
      time: '',
    });
  };

  // Navigation handler
  const handleNavigate = (screen, options = {}) => {
    if (options.reset) {
      resetTransfer();
    }
    if (options.method) {
      setTransferMethod(options.method);
    }
    if (options.schedule) {
      setSelectedSchedule(options.schedule);
    }
    if (options.recipient) {
      // Pre-fill from favorite
      setSelectedBank({
        id: options.recipient.bankCode.toLowerCase(),
        name: options.recipient.bankName,
        code: options.recipient.bankCode,
        color: options.recipient.bankColor,
      });
      setTransferData(prev => ({
        ...prev,
        accountNumber: options.recipient.accountNumber,
        accountName: options.recipient.name,
      }));
    }
    setCurrentScreen(screen);
  };

  // Handle method selection
  const handleSelectMethod = (method) => {
    setTransferMethod(method);
  };

  // Handle bank selection
  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
  };

  // Handle OTP verification success
  const handleOtpVerify = () => {
    const txId = generateTransactionId();
    const refNum = generateReferenceNumber();
    const txTime = formatDateTime(new Date());
    
    // Generate transaction result
    setTransactionResult({
      transactionId: txId,
      referenceNumber: refNum,
      time: txTime,
    });
    
    // If scheduled, add to scheduled transfers list
    if (transferData.isScheduled) {
      const newSchedule = {
        id: 'SCH' + Date.now(),
        recipientName: transferData.accountName,
        recipientAccount: transferData.accountNumber,
        bankName: selectedBank.name,
        bankCode: selectedBank.code,
        bankColor: selectedBank.color,
        amount: parseInt(transferData.amount),
        frequency: transferData.frequency,
        selectedDate: transferData.selectedDate,
        selectedDays: transferData.selectedDays,
        startDate: transferData.startDate,
        endDate: transferData.endDate,
        status: 'active',
        skipHolidays: transferData.skipHolidays,
        notifyBeforeTransfer: transferData.notifyBeforeTransfer,
        autoCancelIfInsufficient: transferData.autoCancelIfInsufficient,
        createdAt: new Date().toISOString(),
        executions: [],
      };
      setScheduledTransfers(prev => [newSchedule, ...prev]);
    } else {
      // Deduct balance for instant transfer
      const totalDeduct = parseInt(transferData.amount) + 2500;
      setBalance(prev => prev - totalDeduct);
    }
    
    // Navigate to success
    setCurrentScreen('success');
  };

  // Handle schedule actions
  const handlePauseSchedule = (scheduleId) => {
    setScheduledTransfers(prev => prev.map(s => 
      s.id === scheduleId ? { ...s, status: s.status === 'paused' ? 'active' : 'paused' } : s
    ));
    if (selectedSchedule?.id === scheduleId) {
      setSelectedSchedule(prev => ({ ...prev, status: prev.status === 'paused' ? 'active' : 'paused' }));
    }
  };

  const handleDeleteSchedule = (scheduleId) => {
    setScheduledTransfers(prev => prev.filter(s => s.id !== scheduleId));
    setCurrentScreen('scheduledList');
  };

  // Handle favorite actions
  const handleAddFavorite = (recipient) => {
    const newFav = {
      id: 'FAV' + Date.now(),
      name: recipient.name,
      accountNumber: recipient.accountNumber,
      bankCode: recipient.bankCode,
      bankName: recipient.bankName,
      bankColor: recipient.bankColor,
    };
    setFavoriteRecipients(prev => [newFav, ...prev]);
  };

  const handleRemoveFavorite = (favId) => {
    setFavoriteRecipients(prev => prev.filter(f => f.id !== favId));
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigate={handleNavigate} 
            balance={balance}
            scheduledCount={scheduledTransfers.filter(s => s.status === 'active').length}
          />
        );
      
      case 'transferType':
        return (
          <TransferTypeScreen 
            onNavigate={handleNavigate}
            onSelectMethod={handleSelectMethod}
          />
        );
      
      case 'selectBank':
        return (
          <SelectBankScreen 
            onNavigate={handleNavigate}
            onSelectBank={handleSelectBank}
            transferMethod={transferMethod}
          />
        );
      
      case 'transferForm':
        return (
          <TransferFormScreen 
            onNavigate={handleNavigate}
            selectedBank={selectedBank}
            transferMethod={transferMethod}
            balance={balance}
            transferData={transferData}
            setTransferData={setTransferData}
            favoriteRecipients={favoriteRecipients}
          />
        );
      
      case 'summary':
        return (
          <SummaryScreen 
            onNavigate={handleNavigate}
            selectedBank={selectedBank}
            transferMethod={transferMethod}
            transferData={transferData}
            balance={balance}
          />
        );
      
      case 'otp':
        return (
          <OTPScreen 
            onNavigate={handleNavigate}
            onVerify={handleOtpVerify}
            isScheduled={transferData.isScheduled}
          />
        );
      
      case 'success':
        return (
          <SuccessScreen 
            onNavigate={handleNavigate}
            selectedBank={selectedBank}
            transferMethod={transferMethod}
            transferData={transferData}
            transactionResult={transactionResult}
            onAddFavorite={handleAddFavorite}
          />
        );

      case 'scheduledList':
        return (
          <ScheduledListScreen
            onNavigate={handleNavigate}
            scheduledTransfers={scheduledTransfers}
            onPauseSchedule={handlePauseSchedule}
          />
        );

      case 'scheduleDetail':
        return (
          <ScheduleDetailScreen
            onNavigate={handleNavigate}
            schedule={selectedSchedule}
            onPauseSchedule={handlePauseSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />
        );

      case 'executionHistory':
        return (
          <ExecutionHistoryScreen
            onNavigate={handleNavigate}
            scheduledTransfers={scheduledTransfers}
          />
        );

      case 'favorites':
        return (
          <FavoriteRecipientsScreen
            onNavigate={handleNavigate}
            favorites={favoriteRecipients}
            onRemoveFavorite={handleRemoveFavorite}
          />
        );
      
      default:
        return (
          <HomeScreen 
            onNavigate={handleNavigate} 
            balance={balance}
            scheduledCount={scheduledTransfers.filter(s => s.status === 'active').length}
          />
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Desktop: centered with max-width, Mobile: full width */}
      <div className="w-full max-w-6xl mx-auto lg:py-8 lg:px-4">
        <div className="w-full lg:rounded-3xl lg:shadow-2xl lg:overflow-hidden bg-gray-50">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}

export default App;
