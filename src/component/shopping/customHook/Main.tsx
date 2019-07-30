import * as React from 'react';
import ShopCarList from './ShopCarList';
import withErrorCatch from '../../hoc/withErrorCatch1';
function Main() {
  return <ShopCarList />;
}

export default withErrorCatch(Main, '数据加载错误！');
