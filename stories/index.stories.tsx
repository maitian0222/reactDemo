import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TestStorybook from '../src/TestStorybook.tsx';
import Calendar from '../src/Calendar1/Calendar.tsx';
import { Button, Welcome } from '@storybook/react/demo';
import Simple from '../src/demo/draggable-tags/01Simple';
import CrossAreaDrag from '../src/demo/draggable-tags/CrossAreaDrag';
import SimpleDnd from '../src/demo/reactDnd/simple/App';
storiesOf('TestStorybook', module)
  .add('TestStorybook', () => <TestStorybook />)
  .add('TestStorybook', () => <Calendar />);
storiesOf('Welcome', module).add('to Storybook', () => <Welcome />);

storiesOf('Button', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
storiesOf('react-draggable-tags', module)
  .add('基础拖拽', () => <Simple />)
  .add('两个区域拖拽', () => <CrossAreaDrag />);
storiesOf('react-dnd', module).add('基础拖拽', () => <SimpleDnd />);
