import * as React from 'react';
import { useState } from 'react';
import produce from 'immer';
window.produce = produce;
export default function TestImmer() {
  const baseState = [
    {
      todo: 'Learn typescript',
      done: true,
    },
    {
      todo: 'Try immer',
      done: false,
    },
  ];
  const [todos, setTodos] = useState(baseState);

  const onBtnClick = (value: string) => {
    setTodos(
      produce((draft) => {
        draft.push({
          todo: value,
        });
      }),
    );
  };
  return (
    <div>
      <ul>
        {todos.map((item, index) => (
          <li key={index}>{item.todo}</li>
        ))}
      </ul>
      <button onClick={() => onBtnClick('add new todo!')}>添加元素</button>
    </div>
  );
}
