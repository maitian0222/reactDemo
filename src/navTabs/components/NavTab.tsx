import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';
const styles = require('../style.css');
function NavTab({
  zIndex,
  selected,
  title,
  pageId,
  onRequestClose,
  onClick,
  closable,
}: {
  zIndex: number;
  selected: boolean;
  title: string;
  pageId: string;
  onRequestClose: (pageId?: string) => void;
  onClick: (pageId?: string) => void;
  closable: boolean;
}) {
  return (
    <div
      className={classNames(styles.tab, {
        [styles['tab-selected']]: selected,
      })}
      onClick={() => onClick(pageId)}
      title={title}
    >
      <div className={styles['tab-text']}>{title}</div>
      {closable !== false && (
        <Icon
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRequestClose(pageId);
          }}
          type="close"
          className={styles['tab-close-icon']}
        />
      )}
    </div>
    // <Tag
    //   onClick={() => onClick(pageId)}
    //   closable={closable}
    //   checked={selected}
    //   onClose={(e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     onRequestClose(pageId);
    //   }}
    //   title={title}
    //   style={
    //     selected
    //       ? {
    //           backgroundColor: '#1890ff',
    //           color: '#fff',
    //         }
    //       : {}
    //   }
    // >
    //   {title}
    // </Tag>
  );
}

export default NavTab;
