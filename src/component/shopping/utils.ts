function getCarListByLocal() {
  return JSON.parse(localStorage.getItem('carList'));
}

function updateLocalCarList(list) {
  localStorage.setItem('carList', JSON.stringify(list));
}

export { getCarListByLocal, updateLocalCarList };
