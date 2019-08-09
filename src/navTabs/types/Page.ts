import { Location } from 'history';
import PageConfig from './PageConfig';
import { match } from 'react-router';

export default interface Page {
  /**
   * 页面唯一标识
   */
  id: string;
  key: string;
  /**
   * 页面url
   */
  location: Location;
  /**
   * 页面标题
   */
  title: string;
  pageConfig: PageConfig;
  match: match<{ [x: string]: string }>;
  /**
   * 打开时间
   */
  viewTime?: number;
  cachable?: boolean;
  hidden?: boolean;
}
