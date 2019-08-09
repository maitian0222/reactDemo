import React from 'react';
import { History, parsePath } from 'history';
import PageConfig from '../types/PageConfig';
import Page from '../types/Page';
import PageStack, { EVENT_NAME, eventEmitter } from '../services/PageStack';
import PageContext from './PageContext';

export interface Props {
  /**
   * 路由配置
   */
  routes: PageConfig[];
  /**
   * 历史
   */
  history: History;
  /**
   * 默认路径
   */
  defaultPath?: string;
  /**
   * 默认页标题
   */
  defaultPageTitle?: string;
  children?: React.ReactNode;
}

interface State {
  activePageId: string;
  pages: ReadonlyArray<Page>;
}

/**
 * # 页面上下文环境提供器
 *
 * ## 与history集成
 *
 * PageProvider会监听history的动作，并同步到PageStack。
 */
export default class PageProvider extends React.Component<Props, State> {
  public static defaultProps: Partial<Props> = {
    defaultPageTitle: '默认页签',
    defaultPath: '/demo/calendar',
  };

  private pageStack: PageStack;

  constructor(props: Props) {
    super(props);

    this.pageStack = this.createPageStack();

    this.state = {
      activePageId: this.pageStack.activePageId,
      pages: this.pageStack.pages,
    };
  }

  public get history() {
    const history: History = this.props.history;
    return history;
  }

  public componentDidMount() {
    const history = this.history;

    history.listen((location, action) => {
      if (action === 'REPLACE') {
        this.pageStack.replacePage(location);
      } else if (action === 'POP') {
        if (this.pageStack.pages.length === 1) {
          this.pageStack.addPage(location);
        } else {
          this.pageStack.removePage(this.pageStack.activePageId, location);
        }
      } else {
        this.pageStack.addPage(location);
      }
    });
  }

  public componentWillUnmount() {
    eventEmitter.removeListener(EVENT_NAME, this.syncStateFromPageStack);
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.routes !== this.props.routes) {
      this.pageStack.updatePageConfigs(this.props.routes);
      if (!this.pageStack.activePage) {
        this.pageStack.addPage(
          parsePath(this.props.defaultPath),
          this.props.defaultPageTitle,
        );
        this.pageStack.addPage(this.history.location);
      }
    }
  }

  /**
   * 创建页面堆栈
   */
  public createPageStack() {
    const pageStack = new PageStack(this.props.routes);

    // 默认页
    pageStack.addPage(
      parsePath(this.props.defaultPath),
      this.props.defaultPageTitle,
    );

    const history = this.history;
    pageStack.addPage(history.location);

    eventEmitter.addListener(EVENT_NAME, this.syncStateFromPageStack);

    return pageStack;
  }

  private syncStateAFId: number;
  public syncStateFromPageStack = () => {
    cancelAnimationFrame(this.syncStateAFId);
    this.syncStateAFId = requestAnimationFrame(() => {
      if (
        this.state.activePageId !== this.pageStack.activePageId ||
        this.state.pages !== this.pageStack.pages
      ) {
        this.setState({
          activePageId: this.pageStack.activePageId,
          pages: this.pageStack.pages,
        });
      }
    });
  };

  public render() {
    return (
      <PageContext.Provider
        value={{ pageStack: this.pageStack, history: this.history }}
      >
        <>{this.props.children}</>
      </PageContext.Provider>
    );
  }
}
