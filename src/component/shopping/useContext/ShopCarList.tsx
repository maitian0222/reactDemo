import * as React from 'react';
import { useContext } from 'react';
import { List, Typography } from 'antd';
import CarItem from './CarItem';
import { CarGoods } from '../types/Goods';
import CarListContext from './CarListContext';
export default function CarList() {
  const { carList } = useContext(CarListContext);
  return (
    <>
      <Typography.Title>购物车</Typography.Title>
      <List
        bordered
        dataSource={carList}
        renderItem={(item: CarGoods) => (
          <List.Item key={item.id}>
            <CarItem goods={item} />
          </List.Item>
        )}
      />
    </>
  );
}
