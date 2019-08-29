import React from 'react';
import { DraggableArea } from 'react-draggable-tags';
import Comp1 from './Comp1';
const styles = require('./css/simple.css');

const initialTags = [
  { id: 1, content: Comp1, type: 'comp' },
  { id: 2, content: 'undraggable', undraggable: true },
  { id: 3, content: 'banana' },
  { id: 4, content: 'lemon' },
  { id: 5, content: 'orange' },
  { id: 6, content: 'grape' },
  { id: 7, content: 'strawberry' },
  { id: 8, content: 'cherry' },
  { id: 9, content: 'peach' },
];

export default function Simple() {
  return (
    <div className="Simple">
      <DraggableArea
        tags={initialTags}
        render={({ tag, index }) => (
          <div className={`tag ${tag.undraggable ? 'undraggable' : ''}`}>
            {tag.type === 'comp' ? <tag.content /> : tag.content}
          </div>
        )}
        onChange={(tags) => console.log(tags)}
      />
    </div>
  );
}
