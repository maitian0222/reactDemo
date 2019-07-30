import * as React from 'react';
import { Row, Col } from 'antd';
import { useEffect, useReducer } from 'react';
import http from '@sinoui/http';
import carReducer from '../reducer/carReducer';
import shopListReducer from '../reducer/shopListReducer';
import ShopList from './ShopList';
import ShopCarList from './ShopCarList';

export default function Main() {
  const [goodsState, dispatch] = useReducer(shopListReducer, {
    goodsList: [],
  });
  const [carState, carDispatch] = useReducer(carReducer, {
    carList: [],
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
    <Row gutter={16}>
      <Col span={14}>
        <ShopList
          goodsList={goodsState.goodsList}
          dispatch={dispatch}
          carList={carState.carList}
          carDispatch={carDispatch}
        />
      </Col>
      <Col span={10}>
        <ShopCarList
          goodsList={goodsState.goodsList}
          dispatch={dispatch}
          carList={carState.carList}
          carDispatch={carDispatch}
        />
      </Col>
    </Row>
  );
}
