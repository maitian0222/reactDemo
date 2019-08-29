import React from 'react';
import {useState} from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

function Hello () {
  return  <div>hello</div>;
}

function Hi () {
  return  <div>Hi</div>;
}
const Dustbin = () => {
  const [list,setList] = useState([]);
  const [{ canDrop, isOver, dragItem }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: (item, monitor) => setDrop(item, monitor),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      dragItem: monitor.getItem(),
    }),
  });

  const setDrop = (item, monitor) => {
    debugger;
      setList(item.comp);
      return { name: 'Dustbin' };
  }

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
      <Hello/>
      <Hi/>
    </div>
  );
};
export default Dustbin;
