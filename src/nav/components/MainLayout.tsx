import * as React from 'react';
import { Suspense } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import NavMenu from '../containers/NavMenu';
import HeaderContainer from '../containers/HeaderContainer';
import NavTabs from '../../navTabs';
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
              <NavTabs />
              <div
                style={{
                  background: '#ffffff',
                  height: '100%',
                  overflowY: 'auto',
                }}
              >
                {this.props.children}
              </div>
            </div>
          </Content>
        </Layout>
      </Suspense>
    );
  }
}
