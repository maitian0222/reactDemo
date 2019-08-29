import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import TargetItem from './TargetItem';
const styles = {};

const boxTarget = {
  // 当有对应的 drag source 放在当前组件区域时，会返回一个对象，可以在 monitor.getDropResult() 中获取到
  drop(props, monitor, component) {
    console.log(monitor.didDrop());
    const { key } = monitor.getItem();
    props.addItem(key);
  },
  hover(props, monitor, component) {
    return monitor.isOver({ shallow: true });
  },
  canDrop(props, monitor) {
    return monitor.getItem();
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem(),
  };
}

class Target extends Component {
  render() {
    const {
      connectDropTarget,
      hovered,
      arr,
      canDrop,
      addItem,
      moveItem,
      deleteItem,
    } = this.props;
    // console.log(this.props);
    const backgroundColor = hovered ? 'lightgreen' : 'white';
    const isActive = canDrop && hovered;

    return (
      <div style={{ background: backgroundColor, width: '300px' }}>
        <p>target</p>
        {connectDropTarget(
          <div style={{ height: '100%' }}>
            {arr.map((item, index) => (
              <TargetItem
                key={item.key}
                item={item}
                index={index}
                moveItem={moveItem}
                addItem={addItem}
                deleteItem={deleteItem}
              />
            ))}
          </div>,
        )}
      </div>
    );
  }
}

export default DropTarget('item', boxTarget, collect)(Target);
