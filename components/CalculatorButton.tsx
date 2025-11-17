import React from 'react';

interface CalculatorButtonProps {
  onClick: (label: string) => void;
  label: string;
  className?: string;
  span?: 'col-span-2';
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, label, className = '', span }) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`h-20 w-20 ${span ? 'w-full' : ''} flex items-center justify-center text-3xl font-medium text-white rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500 transform active:scale-95 ${className} ${span}`}
    >
      {label}
    </button>
  );
};
