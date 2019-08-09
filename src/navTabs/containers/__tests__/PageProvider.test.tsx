import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import PageStack from '../../services/PageStack';
import routes from './pagetestroutes';

jest.useFakeTimers();

let mockProvider: jest.Mock<{ pageStack: PageStack }>;
let PageProvider;

const getPageProviderWithContext = () => {
  // 模拟PageContext的Provider，以截获PageProvider向PageContext.Provider提供的value
  jest.doMock('../PageContext', () => {
    return {
      Provider: (props) => {
        mockProvider(props.value);
        return props.children;
      },
    };
  });

  return require('../PageProvider').default;
};

beforeEach(() => {
  jest.resetModules();
  mockProvider = jest.fn();
  PageProvider = getPageProviderWithContext();
});

it('初始化时打开首页', () => {
  const history = createMemoryHistory();
  const wrapper = mount(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  expect(wrapper.text()).toBe('test');

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  expect(pageStack.pages.length).toBe(1);
  expect(pageStack.activePageId).toBe('dashboard');
});

it('指定默认页面', () => {
  const history = createMemoryHistory();
  history.push('/page1');
  const wrapper = mount(
    <PageProvider
      history={history}
      routes={routes}
      defaultPath="/page1"
      defaultPageTitle="Page1"
    >
      test
    </PageProvider>,
  );

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  expect(pageStack.pages.length).toBe(1);
  expect(pageStack.activePageId).toBe('page1');
});

it('history初始化地址与指定默认页面不一致时', () => {
  const history = createMemoryHistory();
  history.push('/page1');
  const wrapper = mount(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.activePageId).toBe('page1');
});

it('监听push事件', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  history.push('/page1');
  jest.runAllTimers();

  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.activePageId).toBe('page1');
});

it('监听连续的push事件', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  history.push('/page1');
  history.push('/page1');
  history.push('/page2');
  jest.runAllTimers();

  expect(pageStack.pages.length).toBe(3);
  expect(pageStack.activePageId).toBe('page2');
});

it('监听pop事件', () => {
  const history = createMemoryHistory();
  history.push('/page1');

  const wrapper = mount(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  history.goBack();
  jest.runAllTimers();

  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.activePageId).toBe('dashboard');
});

it('监听replace事件', () => {
  const history = createMemoryHistory();
  history.push('/page1');

  const wrapper = mount(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  history.replace('/page2');
  jest.runAllTimers();

  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.activePageId).toBe('page2');
});

it('变更页面标题', () => {
  const history = createMemoryHistory();

  const wrapper = mount(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  const pageStack: PageStack = mockProvider.mock.calls[0][0].pageStack;

  pageStack.setPageTitle('dashboard', '新的个人工作台');

  jest.runAllTimers();
  expect(wrapper.state().pages[0].title).toBe('新的个人工作台');
});

it('unmount', () => {
  const history = createMemoryHistory();

  const wrapper = shallow(
    <PageProvider history={history} routes={routes}>
      test
    </PageProvider>,
  );

  wrapper.unmount();
});
