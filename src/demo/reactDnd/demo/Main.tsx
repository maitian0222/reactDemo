import React from 'react';

// Drag and drop stuff
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './Container';

class ImageUploader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      listCount: 1
    };

    this.onAddItem = this
      .onAddItem
      .bind(this);

    this.listChanged = this.listChanged.bind(this);

  }

  onAddItem(e) {
    e.preventDefault();

    var listArray = this.state.list;
    var buildObject = {
      text: 'Jeremy' + this
        .state
        .listCount
        .toString(),
      age: '25',
      id: this.state.listCount
    };
    listArray.push(buildObject);

    let newListCount = this.state.listCount + 1;

    this.setState({list: listArray, listCount: newListCount});
  }

  listChanged(newList) {
    this.setState({
      list: newList
    })
  }

  render() {

    return (
      <div>
        <h1>Add to List</h1>
        <button onClick={this.onAddItem}>Add Item</button>
        <h1>The List</h1>
        <Container id={1} list={this.state.list} listChanged={this.listChanged}/>
      </div>
    )
  }
}
export default DragDropContext(HTML5Backend)(ImageUploader);