import React, { useState } from 'react';
import { ToolItem } from '../../types';
import { Calculator, DollarSign, Activity, Percent, Ruler, Calendar, RefreshCw, Scale, Flame, ArrowRight } from 'lucide-react';

interface Props {
  tool: ToolItem;
}

export const CalculatorToolRunner: React.FC<Props> = ({ tool }) => {
  // Loan States
  const [loanAmount, setLoanAmount] = useState(250000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTenure, setLoanTenure] = useState(30);

  // BMI States
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);

  // Unit Converter States
  const [inputValue, setInputValue] = useState(10);
  const [unitFrom, setUnitFrom] = useState('meters');
  const [unitTo, setUnitTo] = useState('feet');

  // Age Calculator States
  const [birthDate, setBirthDate] = useState('1998-05-15');

  // Currency States
  const [amountCurrency, setAmountCurrency] = useState(100);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('EUR');

  // Scientific Calculator State
  const [sciExpression, setSciExpression] = useState('24 * (12 + 8) / 4');
  const [sciResult, setSciResult] = useState<string | number>('120');

  // Loan EMI Formula
  const calculateEMI = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return {
      monthlyEMI: isNaN(emi) ? 0 : Math.round(emi),
      totalInterest: isNaN(totalInterest) ? 0 : Math.round(totalInterest),
      totalPayment: isNaN(totalPayment) ? 0 : Math.round(totalPayment),
    };
  };

  // BMI Formula
  const calculateBMI = () => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let category = 'Normal Weight';
    let color = 'text-emerald-600';
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-amber-600';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      color = 'text-orange-600';
    } else if (bmi >= 30) {
      category = 'Obese';
      color = 'text-red-600';
    }
    return { bmi: bmi.toFixed(1), category, color };
  };

  // Unit Conversion Logic
  const convertUnits = () => {
    let result = inputValue;
    if (tool.id === 'unit-converter-length') {
      let meters = inputValue;
      if (unitFrom === 'feet') meters = inputValue * 0.3048;
      if (unitFrom === 'inches') meters = inputValue * 0.0254;
      if (unitFrom === 'kilometers') meters = inputValue * 1000;
      if (unitFrom === 'miles') meters = inputValue * 1609.34;

      if (unitTo === 'meters') result = meters;
      if (unitTo === 'feet') result = meters / 0.3048;
      if (unitTo === 'inches') result = meters / 0.0254;
      if (unitTo === 'kilometers') result = meters / 1000;
      if (unitTo === 'miles') result = meters / 1609.34;
    } else if (tool.id === 'unit-converter-weight') {
      let kg = inputValue;
      if (unitFrom === 'pounds') kg = inputValue * 0.453592;
      if (unitFrom === 'grams') kg = inputValue / 1000;
      if (unitFrom === 'ounces') kg = inputValue * 0.0283495;

      if (unitTo === 'kilograms') result = kg;
      if (unitTo === 'pounds') result = kg / 0.453592;
      if (unitTo === 'grams') result = kg * 1000;
      if (unitTo === 'ounces') result = kg / 0.0283495;
    } else if (tool.id === 'unit-converter-temp') {
      if (unitFrom === 'celsius' && unitTo === 'fahrenheit') result = (inputValue * 9) / 5 + 32;
      else if (unitFrom === 'fahrenheit' && unitTo === 'celsius') result = ((inputValue - 32) * 5) / 9;
      else if (unitFrom === 'celsius' && unitTo === 'kelvin') result = inputValue + 273.15;
    }
    return result.toFixed(2);
  };

  // Age Calculator Formula
  const calculateAge = () => {
    const dob = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      days += 30;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  };

  const emiData = calculateEMI();
  const bmiData = calculateBMI();
  const ageData = calculateAge();

  return (
    <div className="space-y-6">
      {/* 1. Mortgage & Loan Calculator */}
      {['loan-mortgage-calc', 'compound-interest-calc'].includes(tool.id) && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-5">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" /> Mortgage & Loan Amortization
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Loan Principal ($)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Tenure (Years)
              </label>
              <input
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800/80">
            <div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Monthly EMI</p>
              <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-1">
                ${emiData.monthlyEMI.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Total Interest Paid</p>
              <p className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                ${emiData.totalInterest.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Total Amount Payable</p>
              <p className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                ${emiData.totalPayment.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. BMI Calculator */}
      {tool.id === 'bmi-calculator' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-5">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-500" /> Body Mass Index (BMI) & Category
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold"
              />
            </div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/40 p-5 rounded-xl border border-teal-200 dark:border-teal-800/80 flex items-center justify-between">
            <div>
              <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">Your BMI Score</p>
              <p className="text-3xl font-black text-teal-900 dark:text-teal-100 mt-0.5">{bmiData.bmi}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">Health Category</p>
              <p className={`text-lg font-bold ${bmiData.color}`}>{bmiData.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Unit Converters */}
      {tool.id.startsWith('unit-converter') && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-5">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-emerald-500" /> Unit Converter
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Value</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">From Unit</label>
              <select
                value={unitFrom}
                onChange={(e) => setUnitFrom(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {tool.id === 'unit-converter-length' && (
                  <>
                    <option value="meters">Meters</option>
                    <option value="feet">Feet</option>
                    <option value="inches">Inches</option>
                    <option value="kilometers">Kilometers</option>
                    <option value="miles">Miles</option>
                  </>
                )}
                {tool.id === 'unit-converter-weight' && (
                  <>
                    <option value="kilograms">Kilograms</option>
                    <option value="pounds">Pounds</option>
                    <option value="grams">Grams</option>
                    <option value="ounces">Ounces</option>
                  </>
                )}
                {tool.id === 'unit-converter-temp' && (
                  <>
                    <option value="celsius">Celsius</option>
                    <option value="fahrenheit">Fahrenheit</option>
                    <option value="kelvin">Kelvin</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">To Unit</label>
              <select
                value={unitTo}
                onChange={(e) => setUnitTo(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                {tool.id === 'unit-converter-length' && (
                  <>
                    <option value="feet">Feet</option>
                    <option value="meters">Meters</option>
                    <option value="inches">Inches</option>
                    <option value="miles">Miles</option>
                  </>
                )}
                {tool.id === 'unit-converter-weight' && (
                  <>
                    <option value="pounds">Pounds</option>
                    <option value="kilograms">Kilograms</option>
                    <option value="grams">Grams</option>
                  </>
                )}
                {tool.id === 'unit-converter-temp' && (
                  <>
                    <option value="fahrenheit">Fahrenheit</option>
                    <option value="celsius">Celsius</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Converted Output:</span>
            <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100">
              {convertUnits()} {unitTo}
            </span>
          </div>
        </div>
      )}

      {/* 4. Age Calculator */}
      {tool.id === 'age-calculator' && (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-5">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" /> Exact Age & Duration Calculator
          </h4>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
            <div>
              <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100">{ageData.years}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Years</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100">{ageData.months}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Months</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-900 dark:text-emerald-100">{ageData.days}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Days</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Scientific / Standard Calculator */}
      {!['loan-mortgage-calc', 'compound-interest-calc', 'bmi-calculator', 'age-calculator'].includes(tool.id) &&
        !tool.id.startsWith('unit-converter') && (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-500" /> Web Calculator
            </h4>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Expression / Calculation</label>
              <input
                type="text"
                value={sciExpression}
                onChange={(e) => {
                  setSciExpression(e.target.value);
                  try {
                    // Safe eval for basic math
                    const res = Function(`"use strict"; return (${e.target.value.replace(/[^0-9+\-*/().]/g, '')})`)();
                    setSciResult(res);
                  } catch {
                    setSciResult('Syntax Error');
                  }
                }}
                className="w-full px-4 py-3 text-lg font-mono rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold"
              />
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Result:</span>
              <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100 font-mono">{sciResult}</span>
            </div>
          </div>
        )}
    </div>
  );
};
