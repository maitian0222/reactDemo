import React from 'react';
import NavTabs from '../NavTabs';
import { shallow } from 'enzyme';
import routes from '../../containers/__tests__/pagetestroutes';
import PageStack from '../../services/PageStack';
import { parsePath } from 'history';
import NavTab from '../NavTab';

it('render nav tabs', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/'));
  pageStack.addPage(parsePath('/page1'));

  const wrapper = shallow(
    <NavTabs items={pageStack.pages} activePageId={pageStack.activePageId} />,
  );

  const navTabs = wrapper.find(NavTab);
  expect(navTabs.length).toBe(2);
  expect(navTabs.at(0).props().pageId).toBe('dashboard');
  expect(navTabs.at(1).props().pageId).toBe('page1');
});

it('不指定items', () => {
  const wrapper = shallow(
    <NavTabs items={undefined} activePageId={undefined} />,
  );

  const navTabs = wrapper.find(NavTab);
  expect(navTabs.length).toBe(0);
});
