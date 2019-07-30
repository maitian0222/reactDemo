import FetchesContext from './FetchesContext';
import React, { useContext, useEffect, useState } from 'react';
import http from '@sinoui/http';
import { requestGoodsList, receiveGoodsList } from './action';
export default function GoodsList() {
  //获取上下文
  const ctx = useContext(FetchesContext);
  console.log(ctx);
  //一个判断是否重新获取的state变量
  const [reFetch, setReFetch] = useState(false);

  //具有异步调用副作用的useEffect
  useEffect(() => {
    //首先分发一个开始异步获取数据的action
    ctx.dispatch(requestGoodsList());
    http.get(`/test/goodsList`).then((result) => {
      // 获取到数据后分发一个action，通知reducer更新状态
      ctx.dispatch(
        receiveGoodsList({
          goodsList: result,
        }),
      );
    });
    //第二个参数reFetch指的是只有当reFetch变量值改变才重新渲染
  }, [reFetch]);

  return (
    <ul>
      {ctx.fetchesState.goodsList.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
