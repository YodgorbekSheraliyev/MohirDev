//14
let arr = [1, 5, 6, 2, 3, 8];
const sort = (array) => {
  const newArr = structuredClone(array);
  return newArr.sort((a, b) => a - b);
};
console.log(sort(arr));
console.log(arr);
