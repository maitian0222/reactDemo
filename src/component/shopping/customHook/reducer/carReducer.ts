import update from 'immutability-helper';
import { CarGoods } from '../../types/Goods';
export default function carReducer(state, action) {
  switch (action.type) {
    case 'initList':
      return {
        ...state,
        carList: action.carList,
      };
    case 'increaseItemNum':
      return changeItemNum(state, action.id, 'increase');
    case 'decreaseItemNum':
      return changeItemNum(state, action.id, 'decrease');
    case 'removeItem':
      return removeItem(state, action.id);
    default:
      return state;
  }
}

function changeItemNum(state, id: string, type: string) {
  const { carList } = state;
  const index = carList.findIndex((item: CarGoods) => item.id === id);

  const updatedList = update(carList, {
    [index]: {
      ['num']: {
        $set: type === 'increase' ? ++carList[index].num : --carList[index].num,
      },
      ['total']: {
        $set:
          type === 'increase' ? --carList[index].total : ++carList[index].total,
      },
    },
  });

  return {
    ...state,
    carList: updatedList,
  };
}

function removeItem(state, id) {
  const { carList } = state;
  const index = carList.findIndex((item: CarGoods) => item.id === id);

  const updatedList = update(carList, {
    $splice: [[index, 1]],
  });

  return {
    ...state,
    carList: updatedList,
  };
}
