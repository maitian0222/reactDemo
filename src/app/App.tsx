import * as React from 'react';
import { Provider } from 'react-redux';
import 'moment/locale/zh-cn';
import store from './store';
import LayoutContainer from '../nav/components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { PageProvider, PageContainer } from '../navTabs';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';
import routes from './routes';
export default function App() {
  return (
    <Provider store={store}>
      <PageProvider history={history} routes={routes}>
        <ConnectedRouter history={history}>
          <LayoutContainer>
            <PageContainer />
          </LayoutContainer>
        </ConnectedRouter>
      </PageProvider>
    </Provider>
  );
}
