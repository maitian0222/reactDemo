import * as React from 'react';
import { useContext } from 'react';
import { List, Typography } from 'antd';
import CarItem from './CarItem';
import { CarGoods } from '../types/Goods';
import useCarList from './useCarList';
export default function CarList() {
  const carState = useCarList();
  return (
    <>
      <Typography.Title>购物车</Typography.Title>
      <List
        bordered
        dataSource={carState.carList}
        renderItem={(item: CarGoods) => (
          <List.Item key={item.id}>
            <CarItem goods={item} carState={carState} />
          </List.Item>
        )}
      />
    </>
  );
}
