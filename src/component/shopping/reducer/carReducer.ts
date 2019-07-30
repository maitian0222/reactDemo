import { updateLocalCarList } from '../utils';
export default function carReducer(state, action) {
  switch (action.type) {
    case 'updateCarList':
      updateLocalCarList(action.carList);
      return {
        ...state,
        carList: action.carList,
      };
    default:
      return state;
  }
}
