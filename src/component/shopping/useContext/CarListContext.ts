import * as React from 'react';
import { CarGoods } from '../types/Goods';
import { getCarListByLocal } from '../utils';

const carListContext = React.createContext<{
  carList: CarGoods[];
  carDispatch: (obj: { type: string; carList: CarGoods[] }) => void;
}>({
  carList: [],
  carDispatch: () => {
    return {};
  },
});
export default carListContext;
