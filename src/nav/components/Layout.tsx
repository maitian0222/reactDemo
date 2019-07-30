import * as React from 'react';
import Login from '@auth/user';
import MainLayout from './MainLayout';
import http from '@sinoui/http';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
export interface LayoutPageProps {
  currentUser: {
    [propName: string]: string;
  };
  history: History;
  isLoggined: boolean;
  onLogout: () => void;
  onRequestFresh: (item1: object, item2?: string) => void;
}

export interface LayoutPageState {
  refreshing: boolean;
}

class LayoutPage extends React.Component<LayoutPageProps, LayoutPageState> {
  constructor(props: LayoutPageProps) {
    super(props);
  }

  public componentDidMount() {}
  public renderChildren() {
    return <MainLayout />;
  }

  public render() {
    return this.renderChildren();
  }
}

export default withRouter(LayoutPage);
