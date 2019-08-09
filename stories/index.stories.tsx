import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TestStorybook from '../src/TestStorybook.tsx';
import Calendar from '../src/Calendar1/Calendar.tsx';
import { Button, Welcome } from '@storybook/react/demo';

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
