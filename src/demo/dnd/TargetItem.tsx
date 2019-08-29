import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
const itemSoure = {
  beginDrag(props) {
    return {
      ...props.item,
      index: props.index,
    };
  },
};

const ItemTarget = {
  hover(props, monitor, component: React.ReactInstance) {
    const dragItem = monitor.getItem();
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    console.log(`dragIndex:${dragIndex}  hoverIndex:${hoverIndex}`);
    const type = dragItem.type;
    // Don't replace items with themselves
    // 拖拽项和鼠标移上项位置一样 return
    if (dragIndex === hoverIndex) {
      return;
    }

    // 从另一个数据源拖拽过来，且type=== 'source'(type为另一拖拽源数据item对象的key)
    if (dragIndex === undefined && type) {
      props.addItem(dragItem.key, hoverIndex);
      return;
    }

    // Determine rectangle on screen
    /* eslint react/no-find-dom-node: 0 */
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveItem(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },

  canDrop(props, monitor) {
    const fileType = monitor.getItem().fileType;
    if (fileType !== props.fileType) {
      return false;
    }
    return true;
  },

  drop(props, monitor) {
    const dragItem = monitor.getItem();
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    const type = dragItem.type;

    if (dragIndex === undefined && type) {
      props.addItem(dragItem.key, hoverIndex);
      return;
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class Item extends Component {
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      item,
      deleteItem,
    } = this.props;
    const Comp = item.component;
    return connectDragSource(
      connectDropTarget(
        <div style={{ padding: '5px 0' }}>
          <Comp />
          <button onClick={() => deleteItem(item.key)}>移除</button>
        </div>,
      ),
    );
  }
}

export default DragSource('item', itemSoure, collect)(
  DropTarget('item', ItemTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  }))(Item),
);
