import React, { useEffect, useState } from "react";

const BinaryRain = () => {
  const [bits, setBits] = useState([]);

  useEffect(() => {
    const b = Array.from({ length: 50 }, () => ({
      char: Math.random() > 0.5 ? "0" : "1",
      left: Math.random() * window.innerWidth,
      duration: 3 + Math.random() * 5
    }));
    setBits(b);
  }, []);

  return (
    <>
      {bits.map((bit, i) => (
        <span
          key={i}
          className="binary"
          style={{
            left: bit.left,
            animationDuration: `${bit.duration}s`
          }}
        >
          {bit.char}
        </span>
      ))}
    </>
  );
};

export default BinaryRain;