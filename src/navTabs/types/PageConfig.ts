import { RouteProps } from 'react-router';
import CacheLevel from './CacheLevel';
import { Location } from 'history';

/**
 * 页面配置接口
 */
export default interface PageConfig extends RouteProps {
  /**
   * 页面标题
   */
  title?: string;
  /**
   * 页面名称，需要具有唯一性。页面提示语使用`pageName`找到页面级别的埋点。
   */
  pageName?: string;
  /**
   * 页面唯一标识。默认为`location.pathname`。
   */
  // tslint:disable-next-line:no-any
  pageId?: string | ((match: any, location: Location) => string);
  /**
   * 页面key
   *
   * @memberof PageConfig
   */
  // tslint:disable-next-line:no-any
  pageKey?: string | ((match: any, location: Location) => string);
  /**
   * 缓存级别。默认为`CacheLevel.NORMAL`。
   */
  cacheLevel?: CacheLevel;
}
