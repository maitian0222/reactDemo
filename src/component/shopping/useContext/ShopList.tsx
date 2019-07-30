import * as React from 'react';
import { useContext } from 'react';
import { List, Button, Typography } from 'antd';
import update from 'immutability-helper';
import Goods, { CarGoods } from '../types/Goods';
import GoodsListContext from './GoodsListContext';
import CarListContext from './CarListContext';

export default function ShopList() {
  const { goodsList, dispatch } = useContext(GoodsListContext);
  const { carList, carDispatch } = useContext(CarListContext);

  // 把商品加入到购物车
  const addCar = (id: string) => {
    const currentGoodsIndex = goodsList.findIndex(
      (item: Goods) => item.id === id,
    );
    const currentGoods = goodsList[currentGoodsIndex];
    const updatedShopList = update(goodsList, {
      [currentGoodsIndex]: {
        ['total']: {
          $set: currentGoods.total - 1,
        },
      },
    });

    dispatch({
      type: 'updateList',
      goodsList: updatedShopList,
    });
    updateCarList(id, currentGoods);
  };

  // 更新商品列表
  const updateCarList = (id: string, currentGoods: Goods) => {
    const carGoodsIndex = carList.findIndex((item: CarGoods) => item.id === id);

    let updatedCarList = [];
    if (carGoodsIndex === -1) {
      updatedCarList = update(carList, {
        $unshift: [
          {
            ...currentGoods,
            num: 1,
            total: currentGoods.total - 1,
          },
        ],
      });
    } else {
      updatedCarList = update(carList, {
        [carGoodsIndex]: {
          ['num']: {
            $set: carList[carGoodsIndex].num + 1,
          },
          ['total']: {
            $set: carList[carGoodsIndex].total - 1,
          },
        },
      });
    }

    carDispatch({
      type: 'updateCarList',
      carList: updatedCarList,
    });
  };
  return (
    <>
      <Typography.Title>商品列表</Typography.Title>
      <List
        bordered
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={goodsList}
        renderItem={(item: Goods) => (
          <List.Item
            key={item.id}
            extra={<img width={160} alt="logo" src={item.url} />}
          >
            <List.Item.Meta title={item.name} description={item.description} />
            <div>库存: {item.total}</div>
            <Button
              type="primary"
              onClick={() => addCar(item.id)}
              disabled={item.total <= 0}
            >
              加入购物车
            </Button>
          </List.Item>
        )}
      />
    </>
  );
}
