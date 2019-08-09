import React from 'react';
import NavContent from '../NavContent';
import defaultTheme from 'sinoui-components/styles/defaultTheme';
import { create } from 'react-test-renderer';

it('selected nav tab', () => {
  const renderer = create(<NavContent theme={defaultTheme} selected />);

  const tree = renderer.toTree();

  expect(tree).toMatchSnapshot();
});

it('unselected nav tab', () => {
  const renderer = create(<NavContent theme={defaultTheme} selected={false} />);

  const tree = renderer.toTree();

  expect(tree).toMatchSnapshot();
});
