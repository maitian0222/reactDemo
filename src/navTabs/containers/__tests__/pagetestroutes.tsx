import React from 'react';
import { RouteComponentProps } from 'react-router';

const TestPage = (props: RouteComponentProps<{}>) => (
  <div>{props.match.url}</div>
);

const Page2 = () => <div>page2</div>;
const Page3 = () => <div>page3</div>;
const Page4 = () => <div>page4</div>;

const routes = [
  {
    path: '/',
    exact: true,
    pageId: 'dashboard',
    component: TestPage,
  },
  {
    path: '/dashboard',
    exact: true,
    pageId: 'dashboard',
    component: TestPage,
  },
  {
    path: '/page1',
    exact: true,
    pageId: 'page1',
    component: TestPage,
  },
  {
    path: '/page1',
    exact: true,
    pageId: 'page1',
    component: TestPage,
  },
  {
    path: '/page2',
    exact: true,
    pageId: 'page2',
    render: (props) => <Page2 {...props} />,
  },
  {
    path: '/page3',
    exact: true,
    pageId: 'page3',
    children: () => <Page3 />,
  },
  {
    path: '/page4',
    exact: true,
    pageId: 'page4',
    children: <Page4 />,
  },
  {
    path: '/norenderpage',
  },
];

export { TestPage, Page2, Page3, Page4 };

export default routes;
