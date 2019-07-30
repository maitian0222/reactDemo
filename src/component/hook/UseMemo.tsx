import React, { useState, useMemo } from 'react';
export default function App() {
  const [name, setName] = useState('名称');
  const [content, setContent] = useState('内容');
  return (
    <>
      <button onClick={() => setName(new Date().getTime())}>name</button>
      <button onClick={() => setContent(new Date().getTime())}>content</button>
      <MessageText name={name}>{content}</MessageText>
    </>
  );
}

function MessageText({ name, children }) {
  function changeName(name) {
    console.log('11');
    return name + '改变name的方法';
  }

  const otherName = useMemo(() => changeName(name), [name]); // useMemo来缓存 某个 值； 只有name值更新的时候changeName才会重新调用
  return (
    <>
      <div>{otherName}</div>
      <div>{children}</div>
    </>
  );
}
