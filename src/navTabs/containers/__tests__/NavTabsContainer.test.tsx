import React from 'react';
import { onRequestCloseTab, onClickTab } from '../NavTabsContainer';
import { createMemoryHistory, parsePath } from 'history';
import routes from './pagetestroutes';
import PageStack from '../../services/PageStack';
import { mount } from 'enzyme';

it('onRequestCloseTab', () => {
  const history = createMemoryHistory();
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));
  pageStack.addPage(parsePath('/page2'));

  onRequestCloseTab(pageStack, history, 'page2');

  expect(history.location.pathname).toBe('/page1');
  expect(pageStack.activePageId).toBe('page1');
});

it('onClickTab', () => {
  const history = createMemoryHistory();
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));
  pageStack.addPage(parsePath('/page2'));

  onClickTab(pageStack, history, 'page1');

  expect(history.location.pathname).toBe('/page1');
});

// tslint:disable-next-line:no-any
let NavTabs: jest.Mock<any>;

beforeEach(() => {
  NavTabs = jest.fn();
  NavTabs.mockReturnValue(<div>NavTabs</div>);
  jest.resetModules();
});

// tslint:disable-next-line:no-any
function getNavTabsContrainerWithContext(context: any) {
  jest.doMock('../../components/NavTabs', () => NavTabs);
  jest.doMock('../PageContext', () => ({
    Consumer: ({ children }) => {
      return children(context);
    },
  }));

  return require('../NavTabsContainer').default;
}

it('render NavTabsContainer', () => {
  const history = createMemoryHistory();
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));
  pageStack.addPage(parsePath('/page2'));

  const NavTabsContainer = getNavTabsContrainerWithContext({
    pageStack,
    history,
  });

  const wrapper = mount(<NavTabsContainer />);
  const props = NavTabs.mock.calls[0][0];

  expect(wrapper.text()).toBe('NavTabs');
  expect(props.activePageId).toBe('page2');
});
