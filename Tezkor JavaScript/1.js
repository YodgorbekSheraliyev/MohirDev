//1
let a, b, c;
(a = 1), (b = 0), (c = 2);
if (a <= 0 || b <= 0 || c <= 0) {
  console.log(0);
} else {
  console.log(`(${a}${b}${c})`);
}