import React from 'react';
import { Title, syncTitle } from '../Title';
import PageStack from '../../services/PageStack';
import routes from './pagetestroutes';
import { parsePath, createMemoryHistory, History } from 'history';
import { shallow, mount } from 'enzyme';

it('syncTitle: pageStack is null', () => {
  syncTitle(null, '标题');
});

it('syncTitle: title is null', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));
  syncTitle(pageStack, null);
  expect(pageStack.activePage.title).toBe('标签1');
});

it('syncTitle: title is same', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));
  syncTitle(pageStack, '标签1');
  expect(pageStack.activePage.title).toBe('标签1');
});

it('syncTitle', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));
  syncTitle(pageStack, '标签2');
  expect(pageStack.activePage.title).toBe('标签2');
});

it('sync title when component did mount', () => {
  const pageStack = new PageStack(routes);
  pageStack.addPage(parsePath('/page1'));
  const history: History = createMemoryHistory();

  const wrapper = shallow(
    <Title pageStack={pageStack} history={history} title="标签2" />,
  );

  expect(pageStack.activePage.title).toBe('标签2');

  wrapper.setProps({ title: '标签2' });
  wrapper.setProps({ title: '标签3' });

  expect(pageStack.activePage.title).toBe('标签3');
});
