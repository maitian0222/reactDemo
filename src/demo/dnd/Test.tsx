import React from 'react';
import { createSelector } from 'reselect';

const shopItemsSelector = (state) => state.shop.items;
const taxPercentSelector = (state) => state.shop.taxPercent;

const subtotalSelector = createSelector(
  shopItemsSelector,
  (items) => items.reduce((acc, item) => acc + item.value, 0),
);

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100),
);

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax }),
);

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [{ name: 'apple', value: 1.2 }, { name: 'orange', value: 0.95 }],
  },
};

export default class Test extends React.PureComponent {
  private timer;
  constructor(props) {
    super(props);
    this.state = {
      timer: 10,
    };
  }

  public componentDidMount() {
    console.log('componentDidMount');
    this.timer = setInterval(() => {
      // this.setState((prevState) => ({
      //   timer: --prevState.timer,
      // }));
    }, 1000);
  }

  // public shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  public componentWillUnmount() {
    console.log('componentWillUnmount');
    clearTimeout(this.timer);
  }

  public render() {
    console.log('Test render!!!!');
    // return <div>{this.state.timer}</div>;
    return <div>{this.props.list[0]}</div>;
  }
}
