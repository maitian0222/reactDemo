import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'immutability-helper';
import Source from './Source';
import Target from './Target';
import Test from './Test';
import resource from './config/resource';
import items from './config/items';

const styles = {};
import { Hello, Goodbye, Goodluck, HaveFun } from './components';
class App extends Component {
  private timer;
  constructor(props) {
    super(props);
    this.state = {
      list: resource,
      arr: [],
      testList: [1],
    };
  }

  public deleteItem = (key) => {
    const index = this.state.arr.findIndex((item) => item.key === key);
    const temp = update(this.state.arr, {
      $splice: [[index, 1]],
    });
    this.setState({
      arr: temp,
    });
  };
  public addItem = (key, hoverIndex) => {
    const index = items.findIndex((item) => item.key === key);
    const arrIndex = this.state.arr.findIndex((item) => item.key === key);
    console.log(`arrIndex:${arrIndex}   hoverIndex:${hoverIndex}`);
    if (arrIndex !== -1) {
      if (hoverIndex === undefined) {
        return;
      }
      // 元素已经被从数据源拖拽到目标区域
      if (arrIndex === hoverIndex) {
        return;
      }
      const temp = update(this.state.arr, {
        $splice: [[arrIndex, 1], [hoverIndex, 0, this.state.arr[arrIndex]]],
      });

      this.setState({
        arr: temp,
      });
      return;
    } else {
      if (hoverIndex) {
        const temp = update(this.state.arr, {
          $splice: [[hoverIndex, 0, items[index]]],
        });
        this.setState({
          arr: temp,
        });
      } else {
        const temp = update(this.state.arr, {
          $push: [items[index]],
        });
        this.setState({
          arr: temp,
        });
      }
    }
  };

  public onMoveItem = (dragIndex: number, hoverIndex: number) => {
    const item = this.state.arr[dragIndex];

    const files = update(this.state.arr, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, item]],
    });

    this.setState({
      arr: files,
    });
  };

  public changeTestList = () => {
    // this.setState({
    //   testList: update(this.state.testList, {
    //     $set: [1],
    //   }),
    // });
  };

  public render() {
    return (
      <div style={{ display: 'flex' }}>
        <Source list={this.state.list} addItem={this.addItem} />
        <Target
          arr={this.state.arr}
          addItem={this.addItem}
          moveItem={this.onMoveItem}
          deleteItem={this.deleteItem}
        />
        <button onClick={() => this.changeTestList()}>修改testList</button>
        <Test list={this.state.testList} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
