import Goods from '../types/Goods';
import update from 'immutability-helper';
export default function reducer(state, action) {
  switch (action.type) {
    case 'updateList':
      return {
        ...state,
        goodsList: action.goodsList,
      };
    default:
      return state;
  }
}
