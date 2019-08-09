import React from 'react';
import { Button } from 'antd';
import { Subscription } from 'rxjs';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import PageStatus from '../services/PageStatus';
import PageButtonType from '../types/PageButtonType';
export interface State {
  buttons?: PageButtonType[];
}

export default class NavButtons extends React.Component<{}, State> {
  private subscription: Subscription;
  constructor(props: {}) {
    super(props);

    this.state = {};
  }

  public componentDidMount() {
    this.subscription = PageStatus.instance
      .getCurrentPageStatus()
      .pipe(
        debounceTime(16),
        map((pageStack) => pageStack.buttons),
        distinctUntilChanged(),
      )
      .subscribe((buttons) => {
        this.setState({
          buttons,
        });
      });
  }

  public componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  public render() {
    return this.state.buttons ? (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: 0,
          top: 0,
          height: '32px',
        }}
      >
        {this.state.buttons.map((button, index) => (
          <Button onClick={button.onClick}>{button.icon}</Button>
        ))}
      </div>
    ) : null;
  }
}
