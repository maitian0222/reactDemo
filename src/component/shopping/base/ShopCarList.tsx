import * as React from 'react';
import { List, Typography } from 'antd';
import CarItem from './CarItem';
import Goods, { CarGoods } from '../types/Goods';
interface Props {
  goodsList: Goods[];
  dispatch: (obj: { type: string; goodsList: Goods[] }) => void;
  carList: CarGoods[];
  carDispatch: (obj: { type: string; carList: CarGoods[] }) => void;
}
export default function CarList(props: Props) {
  const { carList } = props;
  return (
    <>
      <Typography.Title>购物车</Typography.Title>
      <List
        bordered
        dataSource={carList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <CarItem {...props} goods={item} />
          </List.Item>
        )}
      />
    </>
  );
}
