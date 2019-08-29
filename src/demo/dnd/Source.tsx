import React from 'react';
import SourceItem from './SourceItem';
export default function Source(props) {
  const { list, addItem } = props;
  return (
    <div style={{ width: '300px' }}>
      <header>demo</header>
      <div>
        {list.map((item) => (
          <SourceItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
