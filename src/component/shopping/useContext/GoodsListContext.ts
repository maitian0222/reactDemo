import * as React from 'react';
import Goods from '../types/Goods';
const goodsListContext = React.createContext<{
  goodsList: Goods[];
  dispatch: (obj: { type: string; goodsList: Goods[] }) => void;
}>({
  goodsList: [],
  dispatch: () => {
    return {};
  },
});
export default goodsListContext;
