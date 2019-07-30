import React, { useReducer } from 'react';
import fetchReducer from './fetchReducer';
import UseContexZi from './UseContexZi';
//创建并export上下文
import FetchesContext from './FetchesContext';
function RootComponent() {
  // 第二个参数为state的初始状态
  const [fetchesState, fetchDispatch] = useReducer(fetchReducer, {
    isFetching: false,
    goodsList: [],
  });
  return (
    // 将dispatch方法和状态都作为context传递给子组件
    <FetchesContext.Provider value={{ fetchesState, dispatch: fetchDispatch }}>
      <UseContexZi />
    </FetchesContext.Provider>
  );
}
export default RootComponent;
