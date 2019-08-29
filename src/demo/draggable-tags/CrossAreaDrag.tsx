import React from 'react';
import { useState } from 'react';
import { DraggableAreasGroup } from 'react-draggable-tags';
const deleteIcon = require('./images/delete.png');
import Comp1 from './Comp1';
const styles = require('./css/simple.css');
const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();

export default function CrossAreaDrag() {
  const [leftTags, setLeftTags] = useState([
    { id: 1, content: Comp1, type: 'comp' },
    { id: 2, content: 'undraggable', undraggable: true },
    { id: 3, content: 'banana' },
    { id: 4, content: 'lemon' },
    { id: 5, content: 'orange' },
    { id: 6, content: 'grape' },
    { id: 7, content: 'strawberry' },
    { id: 8, content: 'cherry' },
    { id: 9, content: 'peach' },
  ]);

  const [rightTags, setRightTags] = useState([
    { id: 7, content: 'strawberry' },
    { id: 8, content: 'cherry' },
    { id: 9, content: 'peach' },
  ]);

  const handleClickDelete = (tag) => {
    const tags = rightTags.filter((t) => tag.id !== t.id);
    setRightTags(tags);
  };

  return (
    <div className="CrossArea">
      <div className="square left">
        <DraggableArea1
          tags={leftTags}
          render={({ tag }) => (
            <div className={`tag ${tag.undraggable ? 'undraggable' : ''}`}>
              {tag.type === 'comp' ? <tag.content /> : tag.content}
            </div>
          )}
          onChange={(lTags) => setLeftTags(lTags)}
        />
      </div>
      <div className="square right">
        <DraggableArea2
          tags={rightTags}
          render={({ tag }) => (
            <div className="tag">
              <img
                className="delete"
                src={deleteIcon}
                onClick={() => handleClickDelete(tag)}
              />
              {tag.content}
            </div>
          )}
          onChange={(rTags) => setRightTags(rTags)}
        />
      </div>
    </div>
  );
}
