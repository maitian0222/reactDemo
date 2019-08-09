import React from 'react';
import { History } from 'history';
import Page from '../types/Page';

const isEmptyChildren = (children) => React.Children.count(children) === 0;

export function renderPage(history: History, page: Page) {
  if (!page) {
    return null;
  }

  const { id, pageConfig, match } = page;
  const location = page.location;
  const staticContext = null;

  const { children, component, render } = pageConfig;
  const props = { key: id, match, location, history, staticContext };

  if (component) {
    return React.createElement(component, props);
  }
  if (render) {
    return render(props);
  }
  if (typeof children === 'function') {
    return children(props);
  }
  if (children && !isEmptyChildren(children)) {
    return React.cloneElement(React.Children.only(children), { key: id });
  }
  return null;
}

export interface Props {
  history: History;
  page: Page;
}

export interface State {
  page: Page;
  delaying: boolean;
}

/**
 * 显示页面的组件
 */
export default class PageComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      delaying: true,
      page: props.page,
    };
  }

  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.page !== nextProps.page) {
      const fromBlackToWhite = prevState.page.hidden && !nextProps.page.hidden;
      return {
        delaying: fromBlackToWhite,
        page: nextProps.page,
      };
    }
  }

  public componentDidMount() {
    if (this.state.delaying) {
      requestAnimationFrame(() =>
        this.setState({
          delaying: false,
        }),
      );
    }
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextState.delaying) {
      requestAnimationFrame(() => {
        this.setState({
          delaying: false,
        });
      });
      return false;
    }

    if (nextState.delaying !== this.state.delaying) {
      return true;
    }

    return (
      this.state.page !== nextState.page &&
      !(nextState.page.hidden && this.state.page.hidden)
    );
  }

  public render() {
    const page = this.state.page;
    return (
      <div
        key={page.id}
        style={{
          width: '100%',
          height: '100%',
          display: page.hidden ? 'none' : 'block',
        }}
      >
        {!this.state.delaying && renderPage(this.props.history, page)}
      </div>
    );
  }
}
