import * as React from 'react';
import { lazy } from 'react';
import * as Loadable from 'react-loadable';
import Loading from './Loading';

import BaseTheme from '../component/context/BaseTheme';
import DynamicTheme from '../component/context/DynamicTheme';
import ThemeHoc from '../component/context/ThemeHoc';
// const BaseTheme = Loadable({
//   loader: () => import('../component/context/BaseTheme'),
//   loading: Loading,
//   delay: 200,
// });

// const DynamicTheme = Loadable({
//   loader: () => import('../component/context/DynamicTheme'),
//   loading: Loading,
// });

// const ThemeHoc = Loadable({
//   loader: () => import('../component/context/ThemeHoc'),
//   loading: Loading,
// });

const DynamicThemeFunction = lazy(() =>
  import('../component/context/DynamicThemeFunction'),
);

// import DynamicThemeFunction from '../component/context/DynamicThemeFunction';
import ThemeGouzi from '../component/context/ThemeGouzi';
import BaseExample from '../component/hoc/BaseExample';
import Counter from '../component/hook/Counter';
import RootComponent from '../component/hook/UseReduceExample';
import RootContext from '../component/hook/RootContext';
import UseMemo from '../component/hook/UseMemo';
import UseRef from '../component/hook/TestuseRef';
import DemoUseCallBack from '../component/hook/DemoUseCallBack';
import Example from '../component/hook/customHook/buttonClick/Example';
import ChatRecipientPicker from '../component/hook/customHook/ChatRecipientPicker';
import ShoppingDemo from '../component/shopping/base/Main';
import ShoppingContextDemo from '../component/shopping/useContext/Main';
import ShoopingCustomHook from '../component/shopping/customHook/Main';
import WorkCalendar from '../Calendar1/Calendar';
import StudentList from '../component/user/StudentList';
import PopoverDemo from 'src/demo/popover/PopoverDemo';

const routes = [
  {
    path: '/context/base',
    component: BaseTheme,
    title: '简单获取主题',
  },
  {
    path: '/context/dynamic',
    component: DynamicTheme,
    title: '动态主题',
  },
  {
    path: '/context/withTheme',
    component: ThemeHoc,
    title: '使用高阶组件传递theme',
  },
  {
    path: '/context/func',
    component: DynamicThemeFunction,
    title: '通过Context向下传递一个函数',
  },
  {
    path: '/context/gouzi',
    component: ThemeGouzi,
    title: '声明周期中访问Context',
  },
  {
    path: '/high/base',
    component: BaseExample,
    title: '简单的高阶组件',
  },
  {
    path: '/hook/Counter',
    component: Counter,
    title: 'Counter',
  },
  {
    path: '/hook/reducer',
    component: RootComponent,
    title: 'RootComponent',
  },
  {
    path: '/hook/useContext',
    component: RootContext,
    title: 'useContext',
  },
  {
    path: '/hook/useMemo',
    component: UseMemo,
    title: 'UseMemo',
  },
  {
    path: '/hook/useRef',
    component: UseRef,
    title: 'useRef',
  },
  {
    path: '/hook/custom',
    component: ChatRecipientPicker,
    title: 'UseMemo',
  },
  {
    path: '/hook/callback',
    component: DemoUseCallBack,
    title: 'useCallback',
  },
  {
    path: '/demo/hookShopping',
    component: ShoppingDemo,
    title: '使用hook 实现基础版购物车',
  },
  {
    path: '/demo/reducerShopping',
    component: ShoppingContextDemo,
    title: '使用hook useResucer  useContext 实现购物车',
  },
  {
    path: '/demo/customCarList',
    component: ShoopingCustomHook,
    title: '使用自定义hook实现购物车',
  },
  {
    path: '/demo/calendar',
    component: WorkCalendar,
    title: '工作日历',
  },
  {
    path: '/demo/test',
    component: Example,
    title: 'ceshi',
  },
  {
    path: '/user/student',
    component: StudentList,
    title: '学生列表',
  },
  {
    path: '/demo/popover',
    component: PopoverDemo,
    title: 'popover',
  },
];

export default routes;
