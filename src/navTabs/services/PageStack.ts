import { matchPath } from 'react-router';
import Page from '../types/Page';
import PageConfig from '../types/PageConfig';
import { Location, parsePath } from 'history';
import update from 'immutability-helper';
import { EventEmitter } from 'events';
import PageStatus from './PageStatus';
const storage = localStorage;

export const eventEmitter = new EventEmitter();

export const EVENT_NAME = 'PAGE_STACK_CHANGE_EVENT';

/**
 * 页面堆栈
 */
export default class PageStack {
  public static instance: PageStack;
  /**
   * 当前页id
   */
  private _activePageId: string;
  /**
   * 受控的页面
   */
  private _pages: ReadonlyArray<Page>;
  /**
   * 页面访问历史
   */
  public pageVisitorHistory: Page[];

  constructor(private pageConfigs: PageConfig[]) {
    this._pages = JSON.parse(storage.getItem('navtabs')) || [];
    this.pageVisitorHistory = [];
    PageStack.instance = this;
  }

  public updatePageConfigs(pageConfigs: PageConfig[]) {
    this.pageConfigs = pageConfigs;
  }

  /**
   * 当前页
   */
  public get activePage() {
    return this.pages.find((page) => page.id === this.activePageId);
  }

  public get activePageId() {
    return this._activePageId;
  }

  public set activePageId(activePageId: string) {
    this._activePageId = activePageId;
    eventEmitter.emit(EVENT_NAME);
    PageStatus.instance.changeCurrentPage(activePageId);
  }

  public get pages() {
    return this._pages;
  }

  public set pages(pages: ReadonlyArray<Page>) {
    this._pages = pages;

    eventEmitter.emit(EVENT_NAME);
  }

  public getPageById(pageId: string) {
    return this.pages.find((page) => page.id === pageId);
  }

  /**
   * 添加页面
   *
   * @param location 页面url
   * @param title 页面标题
   */
  public addPage(location: Location, title?: string) {
    const newPage = this.createPage(location, title);
    if (!newPage) {
      return;
    }

    this.addPageInfo(newPage);
  }

  /**
   * 添加页面
   *
   * @param newPage 页面
   */
  public addPageInfo(newPage: Page) {
    this.activePageId = newPage.id;

    const pageIdx = this.pages.findIndex((item) => item.id === newPage.id);
    this.pages =
      pageIdx === -1
        ? update(this.pages, { $push: [newPage] })
        : update(this.pages, { $splice: [[pageIdx, 1, newPage]] });

    storage.setItem('navtabs', JSON.stringify(this.pages));

    this.pageVisitorHistory.unshift(newPage);
  }

  /**
   * 删除页面
   *
   * @param {string} id 页面id
   * @memberof PageStack
   */
  public removePage(id: string, newLoaction?: Location) {
    const pageIndex = this.pages.findIndex((page) => page.id === id);
    if (pageIndex === -1) {
      return;
    }
    this.pages = update(this.pages, { $splice: [[pageIndex, 1]] });

    storage.setItem('navtabs', JSON.stringify(this.pages));

    PageStatus.instance.removePageStatus(id);

    if (
      newLoaction &&
      !!this.getPageAndMatch(newLoaction.pathname).matchResult
    ) {
      this.addPage(newLoaction);
    } else if (this.activePageId === id) {
      const prevPage = this.getPrevControlledPage();
      if (prevPage) {
        this.addPageInfo(prevPage);
      } else {
        this.activePageId = undefined;
      }
    }
  }

  /**
   * 设置页面标题
   *
   * @param {string} pageId 页面id
   * @param {string} title 页面标题
   * @returns
   * @memberof PageStack
   */
  public setPageTitle(pageId: string, title: string) {
    const pageIndex = this.pages.findIndex((item) => item.id === pageId);
    if (pageIndex === -1) {
      return;
    }

    const newPage = { ...this.pages[pageIndex], title };

    this.pages = update(this.pages, { $splice: [[pageIndex, 1, newPage]] });

    const pageVisitor = this.getVisitorPage(newPage.id);
    pageVisitor.title = title;
  }

  /**
   * 替换页面
   *
   * @param {Location} location 页面url
   * @param {string} [title] 页面标题
   * @returns
   * @memberof PageStack
   */
  public replacePage(location: Location, title?: string) {
    let newPage = this.createPage(location, title || this.activePage.title);

    if (!newPage) {
      return;
    }

    newPage = {
      ...this.activePage,
      ...newPage,
    };

    const pageIdx = this.pages.findIndex(
      (page) => page.id === this.activePageId,
    );

    this.activePageId = newPage.id;
    this.pages = update(this.pages, { $splice: [[pageIdx, 1, newPage]] });

    this.pageVisitorHistory[0] = newPage;
  }

  /**
   * 获取上一个受控的页面
   *
   * @returns
   * @memberof PageStack
   */
  public getPrevControlledPage() {
    return this.pageVisitorHistory.find((page) =>
      this.pageInControlled(page.id),
    );
  }

  /**
   * 判断页面是否处于受控之中
   *
   * @param {string} pageId 页面唯一标识
   * @returns
   * @memberof PageStack
   */
  public pageInControlled(pageId: string) {
    return this.pages.some((page) => page.id === pageId);
  }

  public getPageByUrl(url: string) {
    const location = parsePath(url);
    const { matchResult, pageConfig } = this.getPageAndMatch(location.pathname);

    if (!matchResult) {
      return null;
    }

    const pageId = this.getPageId(pageConfig, matchResult, location);

    return this.pages.find((page) => page.id === pageId);
  }

  /**
   * 创建新页面
   *
   * @param {Location} location 页面url
   * @param {string} [title] 页面的标题
   * @returns {(Page | null)}
   * @memberof PageStack
   */
  public createPage(location: Location, title?: string): Page | null {
    const { matchResult, pageConfig } = this.getPageAndMatch(location.pathname);

    if (!matchResult) {
      return null;
    }

    const pageId =
      (location.state && location.state.pageId) ||
      this.getPageId(pageConfig, matchResult, location);

    const pageKey =
      (location.state && location.state.pageId) ||
      this.getPageKey(pageConfig, matchResult, location);

    return {
      location,
      id: pageId,
      key: pageKey,
      title: title || this.getPageTitle(pageConfig, pageId),
      pageConfig,
      match: matchResult,
    };
  }

  /**
   * 获取页面标题
   *
   * @param pageConfig 页面配置
   * @param pageId 页面id
   */
  public getPageTitle(pageConfig: PageConfig, pageId: string) {
    if (pageConfig.title) {
      return pageConfig.title;
    }
    const visitorPage = this.getVisitorPage(pageId);
    if (visitorPage) {
      return visitorPage.title;
    }
    return `标签${this.pageVisitorHistory.length + 1}`;
  }

  /**
   * 获取页面id
   *
   * @param {PageConfig} pageConfig 页面配置
   * @param {Match} matchResult 匹配结果
   * @returns
   * @memberof PageStack
   */
  public getPageId(
    pageConfig: PageConfig,
    matchResult: Match,
    location: Location,
  ) {
    if (typeof pageConfig.pageId === 'string') {
      return pageConfig.pageId;
    } else if (typeof pageConfig.pageId === 'function') {
      return pageConfig.pageId(matchResult, location);
    } else {
      return matchResult.url;
    }
  }

  /**
   * 获取页面key
   *
   * @param {PageConfig} pageConfig 页面配置
   * @param {Match} matchResult 匹配结果
   * @returns
   * @memberof PageStack
   */
  public getPageKey(
    pageConfig: PageConfig,
    matchResult: Match,
    location: Location,
  ) {
    if (typeof pageConfig.pageKey === 'function') {
      return pageConfig.pageKey(matchResult, location);
    } else if (pageConfig.pageKey) {
      return pageConfig.pageKey;
    } else {
      return this.getPageId(pageConfig, matchResult, location);
    }
  }

  /**
   * 删除所有页面，但是保留第一个页面
   */
  public removeAllPagesButNotFirstPage() {
    this.activePageId = this.pages[0].id;
    this.pages = this.pages.slice(0, 1);

    storage.setItem('navtabs', JSON.stringify(this.pages));
  }

  /**
   * 获取历史堆栈中的页面
   *
   * @param pageId 页面唯一标识
   */
  private getVisitorPage(pageId: string) {
    const len = this.pageVisitorHistory.length;
    for (let i = 0; i < len; i++) {
      const visitorPage = this.pageVisitorHistory[i];
      if (visitorPage.id === pageId) {
        return visitorPage;
      }
    }
  }

  /**
   * 获取匹配上的文件配置和匹配的解析结果
   *
   * @private
   * @param {string} url 页面url
   * @returns
   * @memberof PageStack
   */
  private getPageAndMatch(url: string) {
    let matchResult: Match = null;
    let pageConfig = null;

    const len = this.pageConfigs.length;
    for (let i = 0; i < len; i++) {
      const item = this.pageConfigs[i];
      matchResult = matchPath(url, item);
      if (!!matchResult) {
        pageConfig = item;
        break;
      }
    }

    return {
      matchResult,
      pageConfig,
    };
  }
}
