import React from 'react';
import { History } from 'history';
import PageStack from '../services/PageStack';
import PageContext from './PageContext';
import PageCacheStrategy from '../services/PageCacheStrategy';
import Page from '../types/Page';
import VisibleControl from './VisibleControl';
import PageStateProvider from './PageStateProvider';

const isEmptyChildren = (children) => React.Children.count(children) === 0;

export function renderPage(history: History, page: Page) {
  if (!page) {
    return null;
  }

  const { key, pageConfig, match } = page;
  const location = page.location;
  const staticContext = null;

  const { children, component, render } = pageConfig;
  const props = {
    key,
    match,
    location,
    history,
    staticContext,
    className: page.hidden
      ? 'sinoui-page sinoui-page__hidden'
      : 'sinoui-page sinoui-page__shown',
  };

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
    return React.cloneElement(React.Children.only(children), {
      key,
    });
  }
  return null;
}

export function renderPages(history: History, pageStack: PageStack) {
  const pages = new PageCacheStrategy(pageStack).getCachablePages();
  const currentPage = pages.find((_) => !_.hidden);
  return (
    <React.Fragment>
      {pages.map((page) => (
        <div
          key={page.key}
          className={
            page.hidden
              ? 'sinoui-page-content sinoui-page-content__hidden'
              : 'sinoui-page-content sinoui-page-content__shown'
          }
        >
          <PageStateProvider
            history={history}
            page={page}
            currentPage={currentPage}
          >
            <VisibleControl visible={!page.hidden}>
              {renderPage(history, page)}
            </VisibleControl>
          </PageStateProvider>
        </div>
      ))}
    </React.Fragment>
  );
}

/**
 * 页面容器组件
 */
export default function PageContainer() {
  return (
    <PageContext.Consumer>
      {({ pageStack, history }) => renderPages(history, pageStack)}
    </PageContext.Consumer>
  );
}
