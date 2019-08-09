import React from 'react';
import { Tag, Icon } from 'antd';
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
    // <div
    //   style={{
    //     backgroundColor: selected ? 'red' : 'transparent',
    //   }}
    //   onClick={() => onClick(pageId)}
    // >
    //   <span title={title}>{title}</span>
    //   {closable !== false && (
    //     <span
    //       className="sinoui-nav-tab-close_icon"
    //       onClick={(e) => {
    //         e.stopPropagation();
    //         e.preventDefault();
    //         onRequestClose(pageId);
    //       }}
    //     >
    //       -
    //     </span>
    //   )}
    // </div>
    <Tag
      onClick={() => onClick(pageId)}
      closable={closable}
      checked={selected}
      onClose={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onRequestClose(pageId);
      }}
      title={title}
      style={
        selected
          ? {
              backgroundColor: '#1890ff',
              color: '#fff',
            }
          : {}
      }
    >
      {title}
    </Tag>
  );
}

export default NavTab;
