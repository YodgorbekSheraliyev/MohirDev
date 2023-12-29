//7

let num = 6;

function isPerfectNum(num){
    let arr = []
    for(let i=1; i< num; i++){
     if(num%i == 0){
        arr.push(i);
     }
    }
    let sum = 0;
    arr.forEach(e => sum+=e)
    if(num == sum ){
        return true
    }else {
        return false
    }
}
console.log(isPerfectNum(num));