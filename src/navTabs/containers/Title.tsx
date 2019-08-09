import React from 'react';
import PageContextType from '../types/PageContextType';
import withPageContext from '../utils/withPageContext';
import PageStack from '../services/PageStack';

export interface Props extends PageContextType {
  title: string;
}

interface State {
  title: string;
}

/**
 * 设置当前页标题
 *
 * @param pageStack 页面堆栈
 * @param title 页面新标题
 */
export function syncTitle(pageStack: PageStack, title: string) {
  if (
    title &&
    pageStack &&
    pageStack.activePage &&
    pageStack.activePage.title !== title
  ) {
    pageStack.setPageTitle(pageStack.activePageId, title);
  }
}

/**
 * 设置页面标题的组件
 */
export class Title extends React.Component<Props, State> {
  public componentDidMount() {
    this.syncTitle();
  }

  public syncTitle() {
    syncTitle(this.props.pageStack, this.props.title);
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.title !== prevProps.title) {
      this.syncTitle();
    }
  }

  public render() {
    return null;
  }
}

export default withPageContext(Title);
