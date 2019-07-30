import React, { Component } from 'react';
import { Layout, Menu, Icon, Typography } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import http from '@commons/http';
import logo from '../images/logo.png';

import { History } from 'history';
interface Resource {
  [propName: string]: string;
}
interface Props {
  collapsed: boolean;
  currentUser: {
    userId: string;
    username: string;
  };
  history: History;
}

interface State {
  menuList: Resource[];
  selectedKeys: string[];
  openKeys: string[];
}
class NavMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      menuList: [],
      selectedKeys: [],
      openKeys: [],
    };
  }

  public componentDidMount() {
    // 设置首页默认路由
    const path = location.pathname;
    http.get(`/test/menu/wang5`).then((result: { content?: Resource[] }) => {
      if (result && result.content) {
        const data: Resource[] = result.content || [];
        this.setState({
          menuList: data,
        });

        // 设置菜单默认选中项 默认为资源列表的第一项
        let selectedMenu: Resource | undefined = data[0];
        // 如果path上有路由
        if (path !== '/') {
          // 根据path匹配父级资源
          selectedMenu = data.find(
            (item: Resource) => path.indexOf(item.path) !== -1,
          );

          if (selectedMenu) {
            // 匹配到对应的父级资源
            // 如果父级资源下有子资源 再匹配子资源
            if (selectedMenu.children && selectedMenu.children.length > 0) {
              const ziMenu: Resource | undefined = selectedMenu.children.find(
                (item: Resource) => path.indexOf(item.path) !== -1,
              );
              this.setState({
                openKeys: [selectedMenu.path],
              });
              if (ziMenu) {
                this.setState({
                  selectedKeys: [ziMenu!.path],
                });
              }
            } else {
              this.setState({
                selectedKeys: [selectedMenu.path],
              });
            }
          } else {
            // 父级资源没有匹配到 则遍历所有资源的子资源
            let parentMenu: Resource | undefined;
            let ziMenu: Resource | undefined;
            for (const menu of data) {
              ziMenu =
                menu.children &&
                menu!.children.find(
                  (item: Resource) => path.indexOf(item.path) !== -1,
                );
              if (ziMenu) {
                parentMenu = menu;
                break;
              }
            }

            if (parentMenu) {
              this.setState({
                openKeys: [parentMenu.path],
              });
              if (ziMenu) {
                this.setState({
                  selectedKeys: [ziMenu.path],
                });
              }
            }
          }
        }
      }
    });
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.collapsed) {
      this.setState({
        selectedKeys: [],
        openKeys: [],
      });
    }
  }

  public onChangeSelectMenu = (path: string) => {
    this.setState({
      selectedKeys: [path],
    });
  };

  // 点击含有子菜单的菜单节点
  public onChangeSubMenu = (path: string) => {
    if (this.state.openKeys.toString().indexOf(path) !== -1) {
      this.setState({
        openKeys: [],
      });
    } else {
      this.setState({
        openKeys: [path],
      });
    }
  };
  public render() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    // 导航菜单折叠或取消折叠时 动态设置属性
    const menuProps = this.props.collapsed
      ? {}
      : {
          selectedKeys: this.state.selectedKeys,
          openKeys: this.state.openKeys,
        };
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        width={240}
        theme="dark"
      >
        <div className="nav-header">
          <img src={logo} width="48" />
          <div className="logo-title" style={{ color: '#fff' }}>
            <Typography.Title
              level={4}
              style={{ marginBottom: '0', letterSpacing: '8px', color: '#fff' }}
            >
              demo
            </Typography.Title>
            <p>react demo list</p>
          </div>
        </div>
        <Menu mode="inline" theme="dark" {...menuProps}>
          {this.state.menuList.map((item: Resource) =>
            !item.children || item.children.length === 0 ? (
              <Menu.Item
                key={item.path}
                onClick={() => this.onChangeSelectMenu(item.path)}
              >
                <Link to={item.path}>
                  {item.icon && <Icon type={item.icon} />}
                  <span>{item.menuName}</span>
                </Link>
              </Menu.Item>
            ) : (
              <SubMenu
                key={item.path}
                onTitleClick={() => this.onChangeSubMenu(item.path)}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.menuName}</span>
                  </span>
                }
              >
                {item.children.map((item: Resource) => (
                  <Menu.Item
                    key={item.path}
                    onClick={() => this.onChangeSelectMenu(item.path)}
                  >
                    <Link to={item.path}>{item.menuName}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ),
          )}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(NavMenu);
