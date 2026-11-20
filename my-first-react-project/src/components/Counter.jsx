import React from 'react';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  
  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Добавить</button>
      <button onClick={decrement}>Убавить</button>
    </div>
  );
};

export default Counter;