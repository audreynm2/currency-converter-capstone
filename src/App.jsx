import React, { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  const handleConvert = async () => {
    if (!amount) return;
    try {
      const res = await fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await res.json();
      setResult(data.result.toFixed(2));
    } catch (err) {
      console.error('Conversion error:', err);
      setResult('Error');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <div className="stars"></div>

      <h1 className="text-4xl font-bold mb-6 text-purple-400">🌌 Cosmic Currency Converter</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <input
          type="number"
          className="input"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="input"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button className="btn mb-6" onClick={handleConvert}>
        Convert
      </button>

      {result !== null && (
        <div className="text-xl md:text-2xl font-semibold text-purple-200">
          {amount} {fromCurrency} ➡ {result} {toCurrency}
        </div>
      )}
    </div>
  );
}

export default App;
