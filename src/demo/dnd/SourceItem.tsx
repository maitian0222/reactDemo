import React, { Component } from 'react';
import DragItem from './DragItem';
import items from './config/items';
const getDragItem = (key: string) => {
  return items.find((item) => item.key === key);
};
export default function SourceItem(props) {
  const { item } = props;
  return (
    <div>
      {item.title}
      {item.items.map((id) => (
        <DragItem item={getDragItem(id)} key={id} />
      ))}
    </div>
  );
}
