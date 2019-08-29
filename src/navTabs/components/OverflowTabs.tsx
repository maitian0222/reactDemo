import React from 'react';
import { Popover, Icon, List } from 'antd';
import Page from '../types/Page';
const styles = require('../style.css');
export interface Props {
  items: ReadonlyArray<Page>;
  onClick?: (pageId: string) => void;
  onRequestCloseTab?: (pageId: string) => void;
  activePageId: string;
  onRequestCloseAllTab?: () => void;
}

export interface State {
  open: boolean;
}

export default class OverflowTabsContainer extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const {
      items,
      onClick,
      onRequestCloseTab,
      activePageId,
      onRequestCloseAllTab,
    } = this.props;

    const clientWidth = document.body.clientWidth;
    const tabWidth = clientWidth - 240 - 40 - 40;
    const tabsNum = Math.floor(tabWidth / 100);

    const overflowTabs =
      items && items.length > tabsNum
        ? items.slice(tabsNum, items.length - 1)
        : [];

    return (
      <Popover
        placement="bottomRight"
        title={
          <div
            onClick={() => {
              onRequestCloseAllTab();
            }}
          >
            全部关闭
            <Icon type="close-circle" className={styles['all-close-icon']} />
          </div>
        }
        content={
          <List
            size="small"
            bordered
            dataSource={overflowTabs}
            renderItem={(tab) => (
              <List.Item
                onClick={() => onClick(tab.id)}
                style={activePageId === tab.id ? { background: 'pink' } : {}}
                className={styles['display-flex']}
              >
                <div className={styles['text-ellipsis']}>{tab.title}</div>
                <Icon
                  type="close"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onRequestCloseTab(tab.id);
                  }}
                  className={styles['popover-tab-close-icon']}
                />
              </List.Item>
            )}
            style={{ borderRadius: '0', margin: '-12px -16px' }}
          />
        }
        trigger="click"
        style={{ padding: 0 }}
      >
        <a style={{ display: 'flex', alignItems: 'center', width: '20px' }}>
          <Icon type="menu" />
        </a>
      </Popover>
    );
  }
}
