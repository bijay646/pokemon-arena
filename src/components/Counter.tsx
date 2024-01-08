import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button
        className="text-orange-500 p-6"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Click me here
      </button>
    </div>
  );
};

export default Counter;
