import update from 'immutability-helper';

export default function restListReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false,
        dataList: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
        dataList: [],
      };
    case 'removeItem':
      return removeItem(state, action);
    case 'updateItem':
      return updateItem(state, action);
    case 'addItem':
      return addItem(state, action);
    case 'filterList':
      return filterList(state, action);
    default:
      return state;
  }
}

// 删除数据
function removeItem(state, action) {
  const { dataList } = state;
  const index = getItemIndex(dataList, action.payload);
  const updatedList = update(dataList, {
    $splice: [[index, 1]],
  });
  return {
    ...state,
    dataList: updatedList,
  };
}

// 更新数据
function updateItem(state, action) {
  const { dataList } = state;
  const index = getItemIndex(dataList, action.payload.id);
  const updatedList = update(dataList, {
    $splice: [[index, 1, action.payload]],
  });
  return {
    ...state,
    dataList: updatedList,
  };
}

// 新增数据
function addItem(state, action) {
  const { dataList } = state;
  const updatedList = update(dataList, {
    $unshift: [action.payload],
  });
  return {
    ...state,
    dataList: updatedList,
  };
}

function filterList(state, action) {
  const updatedList = state.dataList.filter(
    (item) => item.name.indexOf(action.payload) !== -1,
  );
  return {
    ...state,
    dataList: updatedList,
  };
}

function getItemIndex(dataList, id) {
  return dataList.findIndex((item) => item.id === id);
}
