//9
let n = 123213;
const isPalindrome = function(num){
    const result = num.toString().split('').reverse().join('')
    if(num == Number(result)){
        return true;
    }

    return false;
}
console.log(isPalindrome(n));