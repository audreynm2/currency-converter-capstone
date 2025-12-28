import { useState, useEffect } from "react";
import BinaryRain from "./components/BinaryRain";

function App() {
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [converted, setConverted] = useState(0);

  const API_KEY = "a8f896e2fe5bfa1aa1fe9c8b";

  // Fetch rates on load
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
        const data = await res.json();
        if (data.result === "success") {
          setRates(data.conversion_rates);
          setCurrencies(Object.keys(data.conversion_rates));
        } else {
          alert("Failed to fetch exchange rates");
        }
      } catch (err) {
        alert("Error fetching rates");
        console.error(err);
      }
    };
    fetchRates();
  }, []);

  // Calculate conversion whenever input changes
  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = amount * (rates[toCurrency] / rates[fromCurrency]);
      setConverted(result.toFixed(4));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
  <><div className="app-wrapper">
      <BinaryRain /> </div><div style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif"
      }}>
        <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Neo Converter</h1>

        <div style={{ marginBottom: "20px" }}>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label>From:</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px" }}
            >
              {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label>To:</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px" }}
            >
              {currencies.map((cur) => <option key={cur} value={cur}>{cur}</option>)}
            </select>
          </div>
        </div>

        <div style={{
          padding: "15px",
          backgroundColor: "#ecf0f1",
          borderRadius: "5px",
          textAlign: "center",
          fontSize: "18px",
          color: "#2c3e50"
        }}>
          {amount} {fromCurrency} = {converted} {toCurrency}
        </div>

        {rates[fromCurrency] && rates[toCurrency] && (
          <p style={{ textAlign: "center", marginTop: "15px", color: "#34495e" }}>
            Exchange Rate: 1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
          </p>
        )}
      </div></>
  );
}

export default App
