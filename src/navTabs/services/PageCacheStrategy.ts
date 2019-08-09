import Page from '../types/Page';
import CacheLevel from '../types/CacheLevel';
import PageStack from './PageStack';

const FIX_HIGH_PAGES_COUNT = 3;
const MAX_PAGES = 10;

export function getNormalCacheLevelPages(pages: ReadonlyArray<Page>) {
  return pages.filter(
    (page) =>
      page.pageConfig.cacheLevel === CacheLevel.NORMAL ||
      typeof page.pageConfig.cacheLevel === 'undefined',
  );
}

export function getPagesByCacheLevel(
  pages: ReadonlyArray<Page>,
  cacheLevel: CacheLevel,
) {
  return pages
    .filter(
      (page) =>
        page.pageConfig.cacheLevel === cacheLevel ||
        (cacheLevel === CacheLevel.NORMAL &&
          typeof page.pageConfig.cacheLevel === 'undefined'),
    )
    .sort((page1, page2) => page2.viewTime - page1.viewTime);
}

export default class PageCacheStrategy {
  constructor(private pageStack: PageStack) {
    if (pageStack.activePage) {
      pageStack.activePage.viewTime = new Date().valueOf();
    }
  }

  public getCachablePages() {
    const allHighPages = getPagesByCacheLevel(
      this.pageStack.pages,
      CacheLevel.HIGH,
    );

    const highPages = allHighPages.slice(0, FIX_HIGH_PAGES_COUNT);

    const normalPages = [
      ...allHighPages.slice(3),
      ...getNormalCacheLevelPages(this.pageStack.pages),
    ].sort((page1, page2) => page2.viewTime - page1.viewTime);

    const cachablePages = [...highPages, ...normalPages].slice(0, MAX_PAGES);

    if (cachablePages.indexOf(this.pageStack.activePage) === -1) {
      cachablePages.length < MAX_PAGES ? cachablePages.push(this.pageStack.activePage) :
      cachablePages.splice(
        cachablePages.length - 1,
        1,
        this.pageStack.activePage,
      );
    }

    this.pageStack.pages.forEach((page) => {
      page.cachable = cachablePages.indexOf(page) !== -1;
      page.hidden = page.id !== this.pageStack.activePageId;
    });

    return this.pageStack.pages.filter((page) => page.cachable);
  }
}
