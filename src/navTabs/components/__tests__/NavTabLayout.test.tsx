import React from 'react';
import NavTabLayout from '../NavTabLayout';
import defaultTheme from 'sinoui-components/styles/defaultTheme';
import { create } from 'react-test-renderer';

it('selected nav tab layout', () => {
  const renderer = create(
    <NavTabLayout theme={defaultTheme} selected zIndex={1} />,
  );

  const tree = renderer.toTree();

  expect(tree).toMatchSnapshot();
});

it('unselected nav tab layout', () => {
  const renderer = create(
    <NavTabLayout theme={defaultTheme} selected={false} zIndex={1} />,
  );

  const tree = renderer.toTree();

  expect(tree).toMatchSnapshot();
});
