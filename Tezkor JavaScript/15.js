const arr = [1, 5, 6, 888, 91, 12];
const findSecondGreat = function (array) {
    const newArr = structuredClone(array)
   return newArr.sort((a, b) => a-b )[array.length-2]
};

console.log(findSecondGreat(arr));