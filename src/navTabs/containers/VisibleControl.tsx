import React from 'react';

export interface Props {
  visible?: boolean;
  children: React.ReactNode;
}

export interface State {
  visible?: boolean;
  /**
   * 已经初始化
   */
  inited: boolean;
  /**
   * 冻结
   */
  frozen: boolean;
}

/**
 * 可见性控制组件
 *
 * * 初始状态下如果是不可见的，则不渲染 children，直到变成可见为止；
 * * 组件从可见变成不可见后，不销毁 children，但是也不响应状态变更，即状态变更不引起 children 重绘。
 */
export default class VisibleControl extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visible: props.visible,
      inited: props.visible,
      frozen: false,
    };
  }

  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const visibleToHidden = prevState.visible && !nextProps.visible;
    const hiddenToVisible = !prevState.visible && nextProps.visible;
    const inited = prevState.inited || (!prevState.inited && nextProps.visible);

    if (visibleToHidden || hiddenToVisible || inited !== prevState.inited) {
      let frozen = prevState.frozen;
      if (frozen && hiddenToVisible) {
        frozen = false;
      } else if (!frozen && visibleToHidden) {
        frozen = true;
      }
      return {
        visible: nextProps.visible,
        frozen,
        inited,
      };
    }

    return null;
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !(this.state.frozen && nextState.frozen);
  }

  /**
   * render
   */
  public render() {
    return this.state.inited ? React.Children.only(this.props.children) : null;
  }
}
