import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const handleStyle: React.CSSProperties = {
  backgroundColor: 'green',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  cursor: 'move',
  marginRight: '2px',
};
const itemSoure = {
  beginDrag(props) {
    return props.item;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
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

class DragItem extends Component {
  public render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;
    return connectDragPreview(connectDragSource(<div style={handleStyle} />));
  }
}

export default DragSource('item', itemSoure, collect)(DragItem);
