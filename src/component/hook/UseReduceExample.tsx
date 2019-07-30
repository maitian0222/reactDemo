import React, { useReducer } from 'react';
import { Button } from 'antd';
import fetchReducer from './fetchReducer';
import { RECEIVE_GOODSLIST } from './action';

// 创建并export上下文
export const FetchesContext = React.createContext(null);

export default function RootComponent() {
  //第二个参数为state的初始状态
  const [fetchesState, fetchDispatch] = useReducer(fetchReducer, {
    isFetching: false,
    goodsList: [],
  });
  return (
    <div>
      <Button
        onClick={() => {
          fetchDispatch({
            type: RECEIVE_GOODSLIST,
            goodsList: [
              {
                id: '1',
                name: '蜂蜜',
              },
              {
                id: '2',
                name: '牛奶',
              },
            ],
          });
        }}
      >
        增加数据
      </Button>
      <ul>
        {fetchesState.goodsList.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
