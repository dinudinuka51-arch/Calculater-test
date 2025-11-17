import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  const getFontSize = (length: number) => {
    if (length <= 7) return '6rem';
    if (length <= 9) return '5rem';
    if (length <= 12) return '4rem';
    return '3rem';
  };

  return (
    <div className="bg-transparent text-white text-right w-full h-28 flex items-end justify-end p-4 overflow-hidden">
      <h1 
        className="font-light whitespace-nowrap" 
        style={{ fontSize: getFontSize(value.length), lineHeight: '1' }}
      >
        {value}
      </h1>
    </div>
  );
};
