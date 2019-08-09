import PageStack from '../PageStack';
import PageConfig from '../../types/PageConfig';
import { parsePath } from 'history';

const pageConfigs: PageConfig[] = [
  {
    pageId: 'dashboard',
    path: '/',
    exact: true,
  },
  {
    pageId: 'dashboard',
    title: '个人控制台',
    path: '/dashboard',
    exact: true,
  },
  {
    title: '发文',
    path: '/archive/dispatch/:gwlxEn/:recordId/view',
    // tslint:disable-next-line:no-any
    pageId: (match: any) => `${match.params.gwlxEn}_${match.params.recordId}`,
  },
  {
    title: '未知页面',
    path: '*',
  },
];

it('添加简单页面', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/'));

  expect(pageStack.activePageId).toBe('dashboard');
  expect(pageStack.pages.length).toBe(1);
  expect(pageStack.pages[0].id).toBe('dashboard');
  expect(pageStack.pageVisitorHistory.length).toBe(1);
  expect(pageStack.pageVisitorHistory[0].id).toBe('dashboard');
});

it('添加详情页', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));

  expect(pageStack.activePageId).toBe('hfw_123');
  expect(pageStack.pages.length).toBe(1);
  expect(pageStack.pages[0].id).toBe('hfw_123');
  expect(pageStack.pageVisitorHistory.length).toBe(1);
  expect(pageStack.pageVisitorHistory[0].id).toBe('hfw_123');
});

it('添加多个详情页', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));

  expect(pageStack.activePageId).toBe('hfw_123');

  pageStack.addPage(parsePath('/archive/dispatch/tjfw/1234/view'));

  expect(pageStack.activePageId).toBe('tjfw_1234');
  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.pages[1].id).toBe('tjfw_1234');
  expect(pageStack.pageVisitorHistory.length).toBe(2);
  expect(pageStack.pageVisitorHistory[0].id).toBe('tjfw_1234');
});

it('添加当前页面', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));

  expect(pageStack.activePageId).toBe('hfw_123');

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));

  expect(pageStack.activePageId).toBe('hfw_123');
  expect(pageStack.pages.length).toBe(1);
  expect(pageStack.pageVisitorHistory.length).toBe(2);
});

it('添加已经显示过的页面', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));

  expect(pageStack.activePageId).toBe('hfw_123');

  pageStack.addPage(parsePath('/archive/dispatch/tjfw/1234/view'));

  expect(pageStack.activePageId).toBe('tjfw_1234');
  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.pageVisitorHistory.length).toBe(2);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view?123'));

  expect(pageStack.activePageId).toBe('hfw_123');
  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.pages[0].location.search).toBe('?123');
  expect(pageStack.pageVisitorHistory.length).toBe(3);
});

it('添加匹配不上的页面', () => {
  const pageStack = new PageStack([]);

  pageStack.addPage(parsePath('/unknow-path'));

  expect(pageStack.activePageId).toBeUndefined();
});

it('删除历史页面', () => {
  const pageStack = new PageStack(pageConfigs);
  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));
  pageStack.addPage(parsePath('/archive/dispatch/hfw/1234/view'));
  pageStack.addPage(parsePath('/archive/dispatch/hfw/1235/view'));

  pageStack.removePage('hfw_123');

  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.activePageId).toBe('hfw_1235');
  expect(pageStack.pageVisitorHistory.length).toBe(3);
});

it('删除当前页面', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));
  pageStack.addPage(parsePath('/archive/dispatch/hfw/1234/view'));
  pageStack.addPage(parsePath('/archive/dispatch/hfw/1235/view'));

  pageStack.removePage('hfw_1235');

  expect(pageStack.pages.length).toBe(2);
  expect(pageStack.activePageId).toBe('hfw_1234');
  expect(pageStack.pageVisitorHistory.length).toBe(4);

  pageStack.removePage('hfw_1234');
  expect(pageStack.pages.length).toBe(1);
  expect(pageStack.activePageId).toBe('hfw_123');
  expect(pageStack.pageVisitorHistory.length).toBe(5);
});

it('删除并替换为指定页面', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));
  pageStack.addPage(parsePath('/archive/dispatch/hfw/1234/view'));
  pageStack.addPage(parsePath('/archive/dispatch/hfw/1235/view'));

  pageStack.removePage('hfw_1235', parsePath('/'));

  expect(pageStack.pages.length).toBe(3);
  expect(pageStack.activePageId).toBe('dashboard');
  expect(pageStack.pageVisitorHistory.length).toBe(4);
});

it('删除不存在的页面', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));

  pageStack.removePage('/unknown-page');

  expect(pageStack.activePageId).toBe('hfw_123');
  expect(pageStack.pages.length).toBe(1);
});

it('更新页面标题', () => {
  const pageStack = new PageStack(pageConfigs);
  pageStack.addPage(parsePath('/archive/dispatch/hfw/123/view'));
  pageStack.addPage(parsePath('/archive/dispatch/hfw/1234/view'));

  pageStack.setPageTitle('hfw_123', '行发文详情页');

  expect(pageStack.pages[0].title).toBe('行发文详情页');

  pageStack.setPageTitle('hfw_1234', '行发文详情页2');
  expect(pageStack.activePage.title).toBe('行发文详情页2');
});

it('更新已经关闭页面的标题', () => {
  const pageStack = new PageStack(pageConfigs);

  pageStack.addPage(parsePath('/dashboard'));

  pageStack.removePage('dashboard');

  pageStack.setPageTitle('dashboard', '个人工作台');

  expect(pageStack.activePageId).toBeUndefined();
});

it('访问未知页面', () => {
  const pageStack = new PageStack(pageConfigs);
  pageStack.addPage(parsePath('/unknow-page'));

  expect(pageStack.activePageId).toBe('/unknow-page');
  expect(pageStack.activePage.title).toBe('未知页面');
});

it('替换当前页面', () => {
  const pageStack = new PageStack(pageConfigs);
  pageStack.addPage(parsePath('/dashboard'));
  pageStack.replacePage(parsePath('/archive/dispatch/hfw/123/view'));

  expect(pageStack.activePageId).toBe('hfw_123');
  expect(pageStack.activePage.title).toBe('个人控制台');
  expect(pageStack.pageVisitorHistory.length).toBe(1);
});

it('替换页不存在', () => {
  const pageStack = new PageStack([
    {
      path: '/dashboard',
    },
  ]);
  pageStack.addPage(parsePath('/dashboard'));
  pageStack.replacePage(parsePath('/archive/dispatch/hfw/123/view'));

  expect(pageStack.activePageId).toBe('/dashboard');
  expect(pageStack.activePage.title).toBe('标签1');
});

it('从访问历史缓存中获取页面标题', () => {
  const pageStack = new PageStack([
    {
      path: '/dashboard',
    },
    {
      path: '/page2',
    },
  ]);

  pageStack.addPage(parsePath('/dashboard'), '页面123');
  pageStack.addPage(parsePath('/page2'));
  pageStack.addPage(parsePath('/dashboard'));

  expect(pageStack.activePage.title).toBe('页面123');
});
