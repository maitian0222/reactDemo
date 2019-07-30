import * as React from 'react';
import { useReducer, useEffect } from 'react';
import http from '@sinoui/http';
import carReducer from './reducer/carReducer';
import { CarGoods } from '../types/Goods';
export default function useCarList() {
  const [carState, dispatch] = useReducer(carReducer, {
    carList: [],
  });

  useEffect(() => {
    http.get('/test/goodsList').then((result: CarGoods[]) => {
      dispatch({
        type: 'initList',
        carList: result.map((item) => ({
          ...item,
          num: 1,
        })),
      });
    });
  }, []);

  const increaseItemNum = (id: string) => {
    dispatch({
      type: 'increaseItemNum',
      id,
    });
  };

  const decreaseItemNum = (id: string) => {
    dispatch({
      type: 'decreaseItemNum',
      id,
    });
  };

  const removeItem = (id: string) => {
    dispatch({
      type: 'removeItem',
      id,
    });
  };

  return {
    carList: carState.carList,
    increaseItemNum,
    decreaseItemNum,
    removeItem,
  };
}
