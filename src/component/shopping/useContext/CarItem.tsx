import * as React from 'react';
import { useContext } from 'react';
import { Input, Button } from 'antd';
import update from 'immutability-helper';
import Goods, { CarGoods } from '../types/Goods';
import GoodsListContext from './GoodsListContext';
import CarListContext from './CarListContext';
interface Props {
  goods: CarGoods;
}
const InputGroup = Input.Group;
export default function CarItem(props: Props) {
  const { goods } = props;
  const { goodsList, dispatch } = useContext(GoodsListContext);
  const { carList, carDispatch } = useContext(CarListContext);

  // 从购物车中移除某个商品
  const removeItem = () => {
    const carGoodsIndex = carList.findIndex(
      (item: CarGoods) => item.id === goods.id,
    );
    const updatedList = update(carList, {
      $splice: [[carGoodsIndex, 1]],
    });
    carDispatch({
      type: 'updateCarList',
      carList: updatedList,
    });
    updateShopList('remove');
  };

  // 更新商品列表
  const updateShopList = (type: string) => {
    const shopGoodsIndex = goodsList.findIndex(
      (item: Goods) => item.id === goods.id,
    );

    let updatedTotal = goodsList[shopGoodsIndex].total;
    switch (type) {
      case 'remove':
        updatedTotal = updatedTotal + goods.num;
        break;
      case 'add':
        updatedTotal = --updatedTotal;
        break;
      case 'sub':
        updatedTotal = ++updatedTotal;
        break;
      default:
        break;
    }
    const updatedList = update(goodsList, {
      [shopGoodsIndex]: {
        ['total']: {
          $set: updatedTotal,
        },
      },
    });
    dispatch({
      type: 'updateList',
      goodsList: updatedList,
    });
  };

  // 点击+ -按钮更改购物车商品数量
  const changeCarItemNum = (type: string) => {
    const carGoodsIndex = carList.findIndex(
      (item: CarGoods) => item.id === goods.id,
    );
    const updatedList = update(carList, {
      [carGoodsIndex]: {
        ['num']: {
          $set:
            type === 'add'
              ? ++carList[carGoodsIndex].num
              : --carList[carGoodsIndex].num,
        },
        ['total']: {
          $set:
            type === 'add'
              ? --carList[carGoodsIndex].total
              : ++carList[carGoodsIndex].total,
        },
      },
    });
    carDispatch({
      type: 'updateCarList',
      carList: updatedList,
    });
    updateShopList(type);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '180px' }}>
        {goods.name} 库存：{goods.total}
      </div>
      <InputGroup compact>
        <Button
          onClick={() => changeCarItemNum('add')}
          disabled={goods.total <= 0}
        >
          +
        </Button>
        <Input value={goods.num} style={{ width: '50px' }} />
        <Button
          onClick={() => changeCarItemNum('sub')}
          disabled={goods.num <= 0}
        >
          -
        </Button>
      </InputGroup>
      <Button type="danger" onClick={removeItem}>
        移除
      </Button>
    </div>
  );
}
