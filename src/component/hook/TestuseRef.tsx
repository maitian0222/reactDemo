import * as React from 'react';
import { useRef, useEffect, useState } from 'react';

/**
 * useRef 使用场景
 *
 */

/**
 *
 * 一、存储之前的旧值
 * @export
 * @returns
 */
function Test1() {
  const t = useRef(null);
  const [name, setName] = useState('ajanuw');
  useEffect(() => {
    t.current = name;
  });
  const prevName = t.current;
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <h2>{name}</h2>
      <p>{prevName}</p>
    </div>
  );
}

/**
 * 2. 保存事件程序
 *
 * @export
 * @returns
 */
function Test2() {
  const t = useRef(null);
  function handleClick() {
    t.current = setInterval(() => console.log(1), 2000);
  }
  function handleClear() {
    clearTimeout(t.current);
  }

  return (
    <>
      <button onClick={handleClick}>start</button>
      <button onClick={handleClear}>clear</button>
    </>
  );
}

/**
 * 3.保存dom
 *
 * @returns
 */
export default function Test3() {
  const currentInput = useRef(null);

  useEffect(() => {
    console.log(currentInput.current); // div
  });

  const clickBtn = () => {
    currentInput.current.focus();
  };

  return (
    <div>
      <input ref={currentInput} />
      <button onClick={clickBtn}>clear</button>
    </div>
  );
}
