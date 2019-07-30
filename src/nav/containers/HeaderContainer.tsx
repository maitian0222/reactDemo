import React from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '@auth/user';
import { ActionCreators as messageActionCreators } from '@message/message';
import http from '@sinoui/http';
import {
  Layout,
  Modal,
  Icon,
  Menu,
  Dropdown,
  Avatar,
  Divider,
  Badge,
  Popover,
  Row,
  Col,
  Tooltip,
  Empty,
} from 'antd';
const { Header } = Layout;

class AppHeader extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <Header style={{ background: '#fff', padding: '0 20px' }} />
      </React.Fragment>
    );
  }
}

export default AppHeader;
