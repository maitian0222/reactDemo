import React, { useState, useEffect, useCallback } from 'react';

function useButtonClick({ count, onClick }) {
  const [num, setNum] = useState(count || 0);

  // const handleClick = useCallback((curNum: number) => {
  //   if (onClick) {
  //     setNum(curNum + 1);
  //     onClick(curNum + 1);
  //   }
  // });

  const handleClick = (curNum: number) => {
    setNum(curNum + 1);
  };
  return [num, handleClick];
}
export default function Example() {
  const [count, setCount] = useButtonClick({
    count: 0,
    onClick: (value: number) => console.log(value),
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count)}>Click me</button>
    </div>
  );
}
