import React from 'react';
import withPageContext from '../utils/withPageContext';
import PageContextType from '../types/PageContextType';

/**
 * 文档标题组件
 *
 * 此组件会监听页面堆栈中当前页的标题变化，从而同步到document.title，实现浏览器页面的标题同步。
 */
class DocumentTitle extends React.Component<PageContextType> {
  public componentDidUpdate() {
    const title = this.props.pageStack.activePage.title;

    document.title = `国家开发银行-${title}`;
  }
  public render() {
    return null;
  }
}

export default withPageContext(DocumentTitle);
