//13
let a = 11;
let arr = [1, 2, 3, 4, 5, 6];

function logNumbers(num, array) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    for (let j = 1; j < array.length; j++) {
      const element2 = array[j];
      if(i !== j && (element+ element2) == num){
        return [element, element2]
      }
    }
  }
  return 'Mos sonlar yo\'q'
}
console.log(logNumbers(a, arr));
