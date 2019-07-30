import * as React from 'react';
import { Button, Popover, Icon } from 'antd';
import PopoverCustom from './component/Popover';

export default function PopoverDemo() {
  return (
    <div>
      <PopoverCustom title="title" content="content">
        <button style={{ position: 'relative' }}>点击弹出popover</button>
        <Button type="primary">antd button</Button>
      </PopoverCustom>

      <Popover title="弹出的标题" content="弹出的内容">
        <Button type="primary">点击弹出popover1</Button>
        <Button type="primary">点击弹出popover2</Button>
        <Button type="primary">点击弹出popover3</Button>
        <Button type="primary">点击弹出popover4</Button>
      </Popover>
    </div>
  );
}
