//11
const arr = [1,2,3,4,5];
const arr1 = [...structuredClone(arr).reverse()]
arr1.push(6)
console.log(arr);