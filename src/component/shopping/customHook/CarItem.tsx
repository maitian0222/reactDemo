import * as React from 'react';
import { Input, Button } from 'antd';
import { CarGoods, CarState } from '../types/Goods';
interface Props {
  goods: CarGoods;
  carState: CarState;
}
const InputGroup = Input.Group;
export default function CarItem(props: Props) {
  const { goods, carState } = props;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '180px' }}>
        {goods.name} 库存：{goods.total}
      </div>
      <InputGroup compact>
        <Button
          disabled={goods.total <= 0}
          onClick={() => carState.increaseItemNum(goods.id)}
        >
          +
        </Button>
        <Input value={goods.num} style={{ width: '50px' }} />
        <Button
          disabled={goods.num <= 0}
          onClick={() => carState.decreaseItemNum(goods.id)}
        >
          -
        </Button>
      </InputGroup>
      <Button type="danger" onClick={() => carState.removeItem(goods.id)}>
        移除
      </Button>
    </div>
  );
}
