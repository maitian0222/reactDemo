const REQUEST_GOODSLIST = 'REQUEST_GOODSLIST';
const RECEIVE_GOODSLIST = 'RECEIVE_GOODSLIST';

// 开始请求
const requestGoodsList = () => ({
  type: REQUEST_GOODSLIST,
});

// 接收到数据
const receiveGoodsList = (json: { [propName: string]: string }) => ({
  type: RECEIVE_GOODSLIST,
  goodsList: json.goodsList,
  receivedAt: Date.now(),
});

export {
  RECEIVE_GOODSLIST,
  REQUEST_GOODSLIST,
  receiveGoodsList,
  requestGoodsList,
};
