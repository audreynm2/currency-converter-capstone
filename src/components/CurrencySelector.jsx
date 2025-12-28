export default function CurrencySelector({ label, currency, setCurrency, currencies }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <label>{label}: </label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        style={{ padding: "0.5rem", width: "100%" }}
      >
        {currencies.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>
    </div>
  );
}