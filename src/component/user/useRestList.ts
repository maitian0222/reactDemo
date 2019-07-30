import * as React from 'react';
import { useState, useEffect, useReducer } from 'react';
import http from '@sinoui/http';
import restListReducer from './reducer';

// 实现列表数据加载
export default function useRestList(url: string) {
  const [restListState, dispatch] = useReducer(restListReducer, {
    error: false,
    loading: false,
    dataList: [],
  });

  useEffect(() => {
    doFetch();
  }, [url]);

  const doFetch = async () => {
    dispatch({
      type: 'FETCH_INIT',
    });
    try {
      const result = await http.get(url);
      if (result.code === 0) {
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data,
        });
      } else {
        dispatch({
          type: 'FETCH_FAILURE',
        });
      }
    } catch (e) {
      dispatch({
        type: 'FETCH_FAILURE',
      });
      throw e;
    }
  };

  const removeItem = (id: number) => {
    dispatch({
      type: 'removeItem',
      payload: id,
    });
  };

  const addItem = (item) => {
    dispatch({
      type: 'addItem',
      payload: item,
    });
  };
  const updateItem = (item) => {
    dispatch({
      type: 'updateItem',
      payload: item,
    });
  };

  const filterList = (userName: string) => {
    if (userName) {
      dispatch({
        type: 'filterList',
        payload: userName,
      });
    } else {
      doFetch();
    }
  };

  return {
    ...restListState,
    removeItem,
    addItem,
    updateItem,
    filterList,
  };
}
