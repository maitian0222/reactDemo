export default interface Goods {
  id: string;
  name: string;
  total: number;
  url: string;
  description: string;
}

interface CarGoods {
  id: string;
  name: string;
  num: number;
  url: string;
  description: string;
  total: number;
}

interface CarState {
  carList: CarGoods[];
  removeItem: (id: string) => void;
  increaseItemNum: (id: string) => void;
  decreaseItemNum: (id: string) => void;
}
export { CarGoods, CarState };
