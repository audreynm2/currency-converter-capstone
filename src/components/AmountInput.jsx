export default function AmountInput({ amount, setAmount }) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "0.5rem", width: "100%" }}
      />
    </div>
  );
}