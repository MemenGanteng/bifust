import React from 'react';

const StatusBar = ({ dark = false }) => {
  const textColor = dark ? 'text-gray-800' : 'text-white';
  const iconColor = dark ? 'bg-gray-800' : 'bg-white';
  const iconOpacity = dark ? 'bg-gray-400' : 'bg-white/50';
  
  return (
    <div className={`flex justify-between items-center px-6 py-2 text-sm font-medium ${textColor}`}>
      <span>15:35</span>
      <div className="flex items-center gap-2">
        {/* Signal bars */}
        <div className="flex gap-0.5 items-end">
          <div className={`w-1 h-2 ${iconColor} rounded-sm`}></div>
          <div className={`w-1 h-2.5 ${iconColor} rounded-sm`}></div>
          <div className={`w-1 h-3 ${iconColor} rounded-sm`}></div>
          <div className={`w-1 h-3.5 ${iconOpacity} rounded-sm`}></div>
        </div>
        
        {/* WiFi icon */}
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
        </svg>
        
        {/* Battery */}
        <div className={`flex items-center ${dark ? 'bg-gray-200' : 'bg-white/20'} rounded px-1.5 py-0.5`}>
          <span className="text-xs font-semibold">69</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
