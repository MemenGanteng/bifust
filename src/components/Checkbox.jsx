import React from 'react';
import { CheckIcon } from './Icons';

const Checkbox = ({ checked, onChange, label, sublabel, disabled = false }) => {
  return (
    <label 
      className={`flex items-start gap-3 cursor-pointer select-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={(e) => {
        if (!disabled) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      <div 
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5
          transition-all duration-200
          ${checked 
            ? 'bg-red-600 border-red-600' 
            : 'bg-white border-gray-300 hover:border-red-400'
          }
        `}
      >
        {checked && (
          <CheckIcon className="w-3 h-3 text-white" />
        )}
      </div>
      <div className="flex-1">
        <p className={`text-sm ${checked ? 'text-gray-800 font-medium' : 'text-gray-600'}`}>
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
        )}
      </div>
    </label>
  );
};

export default Checkbox;
