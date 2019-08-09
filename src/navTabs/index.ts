import Loadable from 'react-loadable';
import Title from './containers/Title';
import PageStack from './services/PageStack';
import PageProvider from './containers/PageProvider';
import PageContext from './containers/PageContext';
import withPageContext from './utils/withPageContext';
import withOnePageContext from './utils/withOnePageContext';
import PageVisible from './containers/PageVisible';
import CacheLevel from './types/CacheLevel';
import PageContextType from './types/PageContextType';
import PageButton from './containers/PageButton';
import Page from './types/Page';

const PageContextConsumer = PageContext.Consumer;

const NavTabs = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'NavTabs' */ './containers/NavTabsContainer'),
  loading: () => null,
});

const DualScreenTabs = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'DualScreenTabs' */ './containers/DualScreenTabs'),
  loading: () => null,
});

const PageContainer = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'PageContainer' */ './containers/PageContainer'),
  loading: () => null,
});

export {
  Title,
  PageStack,
  PageContainer,
  PageProvider,
  PageContextConsumer,
  withPageContext,
  withOnePageContext,
  PageVisible,
  CacheLevel,
  PageContextType,
  PageButton,
  DualScreenTabs,
  Page,
};

export default NavTabs;
