//10

let n = 515;

function sumOfNums(n){
    let sum = 0
    const a = n.toString().split('')
    a.forEach(e => sum +=Number(e));
    return sum

}
console.log(sumOfNums(n));