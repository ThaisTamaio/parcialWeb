function calculateSum(arr) {
    let sum = 0;
    for (let i = 0; i <= arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

let count = 0;

function increment() {
let count = 1;
count++;
}
increment();
console.log(count); // Output: 0