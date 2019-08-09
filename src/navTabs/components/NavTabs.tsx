import React from 'react';

import NavTab from './NavTab';
import Page from '../types/Page';
import NavButtons from './NavButtons';

import styles from '../style.css';
interface Props {
  items: ReadonlyArray<Page>;
  activePageId: string;
  onRequestCloseTab?: (pageId: string) => void;
  onClick?: (pageId: string) => void;
  onRequestCloseAllTab?: () => void;
}

export default function NavTabs({
  items = [],
  activePageId,
  onRequestCloseTab,
  onClick,
  onRequestCloseAllTab,
}: Props) {
  const len = items.length + 1;

  const clientWidth = document.body.clientWidth;
  const tabWidth = clientWidth - 240 - 40 - 40;
  const showTabsLen = Math.floor(tabWidth / 100);

  let adjustItems;

  const selectTab = items.slice(items.length - 1);
  const exceptLastItems = items.slice(0, items.length - 1);

  adjustItems = [
    ...exceptLastItems.slice(0, showTabsLen - 1),
    ...selectTab,
    ...exceptLastItems.slice(showTabsLen - 1),
  ];

  const newItems = items && items.length > showTabsLen ? adjustItems : items;

  return (
    <div className={styles['navTabsLayout']}>
      <div className={styles['navTabsInner']}>
        <div style={{ display: 'flex' }}>
          {newItems.map((tab, index) => (
            <NavTab
              closable={index !== 0}
              key={tab.id}
              zIndex={activePageId === tab.id ? 100 : len - (index + 1)}
              title={tab.title}
              selected={activePageId === tab.id}
              pageId={tab.id}
              onRequestClose={onRequestCloseTab}
              onClick={onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
