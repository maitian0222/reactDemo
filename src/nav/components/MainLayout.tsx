import * as React from 'react';
import { Suspense } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavMenu from '../containers/NavMenu';
import HeaderContainer from '../containers/HeaderContainer';

import routes from '../../app/routes';
import styles from '../Layout.css';
const { Header, Content } = Layout;

export default class MainLayout extends React.PureComponent {
  constructor(props: {}) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  public changeMenuCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  public render() {
    return (
      <Router>
        <Suspense fallback={<div>loading</div>}>
          <Layout>
            <NavMenu collapsed={this.state.collapsed} />
            <Content>
              <HeaderContainer
                collapsed={this.state.collapsed}
                changeMenuCollapsed={this.changeMenuCollapsed}
                currentUser={this.props.currentUser}
              />
              <div className={styles.appContent}>
                <div
                  style={{
                    background: '#ffffff',
                    height: '100%',
                    overflowY: 'auto',
                  }}
                >
                  <Switch>
                    <Route path="/" exact component={() => <div />} />
                    {routes.map((item, index) => (
                      <Route
                        key={index}
                        path={item.path}
                        component={item.component}
                      />
                    ))}
                    {/*path为空用来匹配任意路由 */}
                    <Route
                      component={() => (
                        <div
                          style={{
                            display: 'flex',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          请等待, 页面正在建设中...
                        </div>
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </Content>
          </Layout>
        </Suspense>
      </Router>
    );
  }
}
