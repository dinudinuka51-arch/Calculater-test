import React, { useState } from 'react';
import { CalculatorButton } from './components/CalculatorButton';
import { CalculatorDisplay } from './components/CalculatorDisplay';
import { GeminiSearch } from './components/GeminiSearch';

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [operand, setOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [isWaitingForOperand, setIsWaitingForOperand] = useState(false);

  const calculate = (num1: number, op: string, num2: number): number => {
    switch (op) {
      case '+': return num1 + num2;
      case '−': return num1 - num2;
      case '×': return num1 * num2;
      case '÷': return num2 === 0 ? Infinity : num1 / num2;
      default: return num2;
    }
  };

  const handleButtonClick = (label: string) => {
    if (/\d/.test(label)) { // Digit
      if (isWaitingForOperand || display === 'Infinity') {
        setDisplay(label);
        setIsWaitingForOperand(false);
      } else {
        setDisplay(display === '0' ? label : display + label);
      }
    } else if (label === '.') { // Decimal
      if (isWaitingForOperand) {
        setDisplay('0.');
        setIsWaitingForOperand(false);
      } else if (!display.includes('.')) {
        setDisplay(display + '.');
      }
    } else if (label === 'C') { // Clear
      setDisplay('0');
      setOperand(null);
      setOperator(null);
      setIsWaitingForOperand(false);
    } else if (label === '±') { // Plus/Minus
      if (display !== '0') {
         setDisplay(String(parseFloat(display) * -1));
      }
    } else if (label === '%') { // Percent
      setDisplay(String(parseFloat(display) / 100));
      setIsWaitingForOperand(true);
    } else if (['+', '−', '×', '÷'].includes(label)) { // Operator
      const currentValue = parseFloat(display);
      if (operand !== null && operator && !isWaitingForOperand) {
        const result = calculate(operand, operator, currentValue);
        const resultString = String(result);
        setDisplay(resultString);
        setOperand(result);
      } else {
        setOperand(currentValue);
      }
      setOperator(label);
      setIsWaitingForOperand(true);
    } else if (label === '=') { // Equals
      if (operand !== null && operator) {
        const currentValue = parseFloat(display);
        const result = calculate(operand, operator, currentValue);
        const resultString = String(result);
        setDisplay(resultString);
        setOperand(null);
        setOperator(null);
        setIsWaitingForOperand(false);
      }
    }
  };

  const buttonLayout = [
    { label: 'C', className: 'bg-gray-600/80 active:bg-gray-500/80', type: 'special' },
    { label: '±', className: 'bg-gray-600/80 active:bg-gray-500/80', type: 'special' },
    { label: '%', className: 'bg-gray-600/80 active:bg-gray-500/80', type: 'special' },
    { label: '÷', className: 'bg-orange-600/90 active:bg-orange-500/90', type: 'operator' },
    { label: '7', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '8', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '9', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '×', className: 'bg-orange-600/90 active:bg-orange-500/90', type: 'operator' },
    { label: '4', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '5', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '6', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '−', className: 'bg-orange-600/90 active:bg-orange-500/90', type: 'operator' },
    { label: '1', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '2', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '3', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '+', className: 'bg-orange-600/90 active:bg-orange-500/90', type: 'operator' },
    { label: '0', className: 'bg-gray-800/70 active:bg-gray-700/70', span: 'col-span-2' as const, type: 'number' },
    { label: '.', className: 'bg-gray-800/70 active:bg-gray-700/70', type: 'number' },
    { label: '=', className: 'bg-orange-600/90 active:bg-orange-500/90', type: 'operator' },
  ];

  return (
    <main className="min-h-screen w-full p-4 md:p-8 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/5 flex-shrink-0">
          <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg">
            <CalculatorDisplay value={display} />
            <div className="grid grid-cols-4 gap-4 mt-4">
              {buttonLayout.map((btn) => (
                <CalculatorButton
                  key={btn.label}
                  onClick={handleButtonClick}
                  label={btn.label}
                  className={btn.className}
                  span={btn.span}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <GeminiSearch />
        </div>
      </div>
    </main>
  );
};

export default App;
