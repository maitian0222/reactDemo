import * as React from 'react';
import { Row, Col } from 'antd';
import { useEffect, useReducer } from 'react';
import http from '@sinoui/http';
import GoodsListContext from './GoodsListContext';
import CarListContext from './CarListContext';
import carReducer from '../reducer/carReducer';
import shopListReducer from '../reducer/shopListReducer';
import ShopList from './ShopList';
import ShopCarList from './ShopCarList';
import { getCarListByLocal } from '../utils';
import withErrorCatch from '../../hoc/withErrorCatch1';
function Main() {
  const [goodsState, dispatch] = useReducer(shopListReducer, {
    goodsList: [],
  });
  const [carState, carDispatch] = useReducer(carReducer, {
    carList: getCarListByLocal() || [],
  });
  useEffect(() => {
    http.get('/test/goodsList').then((result) => {
      dispatch({
        type: 'updateList',
        goodsList: result,
      });
    });
  }, []);
  return (
    <GoodsListContext.Provider
      value={{
        goodsList: goodsState.goodsList,
        dispatch,
      }}
    >
      <CarListContext.Provider
        value={{
          carList: carState.carList,
          carDispatch,
        }}
      >
        <Row gutter={16}>
          <Col span={14}>
            <ShopList />
          </Col>
          <Col span={10}>
            <ShopCarList />
          </Col>
        </Row>
      </CarListContext.Provider>
    </GoodsListContext.Provider>
  );
}

// export default withErrorCatch('数据加载错误！')(Main);
export default withErrorCatch(Main, '数据加载错误！');
