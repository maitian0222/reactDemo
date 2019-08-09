import React from 'react';
import Divider from '../Divider';
import defaultTheme from 'sinoui-components/styles/defaultTheme';
import { create } from 'react-test-renderer';

it('render divider', () => {
  const renderer = create(<Divider theme={defaultTheme} />);

  const tree = renderer.toTree();

  expect(tree).toMatchSnapshot();
});
