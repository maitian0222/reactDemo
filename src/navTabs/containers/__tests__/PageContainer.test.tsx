import React from 'react';
import { render } from 'enzyme';
import { renderPage } from '../PageContainer';
import { createMemoryHistory, parsePath } from 'history';
import PageStack from '../../services/PageStack';
import routes, { Page3, Page2, TestPage, Page4 } from './pagetestroutes';

const history = createMemoryHistory();

it('render page: not exists page', () => {
  expect(renderPage(history, new PageStack(routes))).toBe(null);
});

it('render page: not exists render config', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/norenderpage'));
  expect(renderPage(history, pageStack)).toBe(null);
});

it('render page: render config', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page2'));

  const element = renderPage(history, pageStack);
  expect(React.isValidElement(element)).toBeTruthy();
  expect(React.Children.only(element).type).toBe(Page2);
});

it('render page: component config', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));

  const element = renderPage(history, pageStack);
  expect(React.isValidElement(element)).toBeTruthy();
  expect(React.Children.only(element).type).toBe(TestPage);
});

it('render page: child function', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page3'));

  const element = renderPage(history, pageStack);
  expect(React.isValidElement(element)).toBeTruthy();
  expect(React.Children.only(element).type).toBe(Page3);
});

it('render page: children config', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page4'));

  const element = renderPage(history, pageStack);
  expect(React.isValidElement(element)).toBeTruthy();
  expect(React.Children.only(element).type).toBe(Page4);
});

describe('PageContainerComponent', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  // tslint:disable-next-line:no-any
  function getPageContainerWithContext(context: any) {
    jest.doMock('../PageContext', () => ({
      Consumer: ({ children }) => {
        return children(context);
      },
    }));

    return require('../PageContainer').default;
  }

  it('render page2', () => {
    const pageStack = new PageStack(routes);

    pageStack.addPage(parsePath('/page2'));

    const PageContainer = getPageContainerWithContext({
      pageStack,
      history,
    });

    const wrapper = render(<PageContainer />);

    expect(wrapper.text()).toBe('page2');
  });
});
