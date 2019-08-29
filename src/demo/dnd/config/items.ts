import React from 'react';

import HelloBtn from '../components/Hello';
import HelloLink from '../components/HelloLink';
import HaveFunBtn from '../components/HaveFun';
import HaveFunLink from '../components/HaveFunLink';

const items = [
  {
    key: 'helloBtn',
    title: 'hello',
    component: HelloBtn,
    type: 'source',
  },
  {
    key: 'helloLink',
    title: 'hello',
    component: HelloLink,
    type: 'source',
  },
  {
    key: 'haveFunBtn',
    title: 'haveFun',
    component: HaveFunBtn,
    type: 'source',
  },
  {
    key: 'haveFunLink',
    title: 'haveFun',
    component: HaveFunLink,
    type: 'source',
  },
];

export default items;
