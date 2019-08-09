import { Observable, Subject } from 'rxjs';
import PageStatusType from '../types/PageStatusType';
import PageButtonType from '../types/PageButtonType';

/**
 * 页面状态
 *
 * @export
 * @class PageStatus
 */
export default class PageStatus {
  private currentPage$: Subject<PageStatusType>;
  public currentPageId: string;
  private pageStatus: {
    [pageId: string]: PageStatusType;
  } = {};

  public static instance = new PageStatus();

  private constructor() {
    this.currentPage$ = new Subject();
  }

  public getCurrentPageStatus(): Observable<PageStatusType> {
    return this.currentPage$.asObservable();
  }

  public changeCurrentPage(pageId: string) {
    const pageStatus = this.pageStatus[pageId] || { pageId, buttons: [] };

    this.currentPageId = pageId;
    this.pageStatus[pageId] = pageStatus;
    this.currentPage$.next(pageStatus);
  }

  public addPageButton(pageId: string, pageButton: PageButtonType) {
    const pageStatus = this.pageStatus[pageId] || { pageId, buttons: [] };
    const newPageStatus = {
      ...pageStatus,
      buttons: pageStatus.buttons
        ? pageStatus.buttons.concat(pageButton)
        : [pageButton],
    };

    this.pageStatus[pageId] = newPageStatus;

    if (pageId === this.currentPageId) {
      this.currentPage$.next(newPageStatus);
    }

    return () => this.removePageButton(pageId, pageButton);
  }

  public removePageButton(pageId: string, pageButton: PageButtonType) {
    const pageStatus = this.pageStatus[pageId];

    if (!pageStatus || !pageStatus.buttons) {
      return;
    }

    const idx = pageStatus.buttons.indexOf(pageButton);

    if (idx === -1) {
      return;
    }

    const newPageStatus = {
      ...pageStatus,
      buttons: [
        ...pageStatus.buttons.slice(0, idx),
        ...pageStatus.buttons.slice(idx + 1),
      ],
    };

    this.pageStatus[pageId] = newPageStatus;

    if (this.currentPageId === pageId) {
      this.currentPage$.next(newPageStatus);
    }
  }

  public removePageStatus(pageId: string) {
    delete this.pageStatus[pageId];
  }
}
