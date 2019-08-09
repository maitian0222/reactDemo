import React from 'react';
import NavTabs from '../components/NavTabs';
import PageContext from './PageContext';
import { History, createPath } from 'history';
import PageStack from '../services/PageStack';
import partial from 'lodash/partial';

/**
 * 请求关闭导航标签的事件监听器
 *
 * @export
 * @param {PageStack} pageStack 页面堆栈
 * @param {History} history 历史
 * @param {string} pageId 页面id
 */
export function onRequestCloseTab(
  pageStack: PageStack,
  history: History,
  pageId: string,
) {
  pageStack.removePage(pageId);
  //if (pageStack.activePage) {
  const location = pageStack.activePage.location;
  history.push(createPath(location), location.state);
  //}
}

export function onRequestCloseAllTab(pageStack: PageStack) {
  pageStack.removeAllPagesButNotFirstPage();
}

/**
 * 点击导航标签的事件监听器
 *
 * @export
 * @param {PageStack} pageStack 页面堆栈
 * @param {History} history 历史
 * @param {string} pageId 页面id
 */
export function onClickTab(
  pageStack: PageStack,
  history: History,
  pageId: string,
) {
  const page = pageStack.getPageById(pageId);
  history.push(createPath(page.location), page.location.state);
}

/**
 * 导航多标签容器组件
 *
 * @export
 * @returns
 */
export default function NavTabsContainer() {
  return (
    <PageContext.Consumer>
      {({ pageStack, history }) => (
        <NavTabs
          items={pageStack.pages}
          activePageId={pageStack.activePageId}
          onRequestCloseTab={partial(onRequestCloseTab, pageStack, history)}
          onRequestCloseAllTab={partial(onRequestCloseAllTab, pageStack)}
          onClick={partial(onClickTab, pageStack, history)}
        />
      )}
    </PageContext.Consumer>
  );
}
