import { useEffect, useState, useMemo } from "react";

const API_KEY = "a8f896e2fe5bfa1aa1fe9c8b";

export default function App() {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [targets] = useState(["EUR", "GBP", "ZAR"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result !== "success") throw new Error("API error");
        setRates(data.conversion_rates);
        setError(null);
      })
      .catch(() => setError("Failed to load exchange rates"))
      .finally(() => setLoading(false));
  }, [base]);

  const converted = useMemo(() => {
    if (!rates) return {};
    return targets.reduce((acc, cur) => {
      acc[cur] = rates[cur]?.toFixed(2) || "0.00";
      return acc;
    }, {});
  }, [rates, targets]);

  const currencies = Object.keys(rates);

  return (
    <div className="relative min-h-screen">
      {/* Star field */}
      <div className="star-field" />

      {/* Sun */}
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 blur-2xl shadow-[0_0_120px_40px_rgba(255,140,0,0.6)] animate-pulse-slow" />

      {/* Orbit rings */}
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-reverse" />

      {/* Planets */}
      <div className="absolute top-1/2 left-1/2 w-[14px] h-[14px] bg-blue-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.9)] orbit orbit-1" />
      <div className="absolute top-1/2 left-1/2 w-[18px] h-[18px] bg-purple-400 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.9)] orbit orbit-2" />
      <div className="absolute top-1/2 left-1/2 w-[10px] h-[10px] bg-pink-400 rounded-full shadow-[0_0_18px_rgba(236,72,153,0.9)] orbit orbit-3" />

      {/* Converter UI */}
      <main className="relative z-10 flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(124,58,237,0.5)]">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent mb-6">
            Cosmic Multi-Currency Converter
          </h1>

          {loading && <p className="text-center">Loading exchange rates...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <select
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3"
                >
                  {currencies.map((cur) => (
                    <option key={cur}>{cur}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                {targets.map((cur) => (
                  <div
                    key={cur}
                    className="flex justify-between items-center bg-black/40 border border-white/10 rounded-xl px-4 py-3 hover:scale-[1.02] transition"
                  >
                    <span className="text-lg">{cur}</span>
                    <span className="text-xl font-semibold text-purple-300">
                      {converted[cur]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Shooting star */}
      <div className="absolute top-20 left-[-20%] w-[300px] h-[2px] bg-gradient-to-r from-white via-white/50 to-transparent rotate-12 animate-shoot" />
    </div>
  );
}
