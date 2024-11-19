
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combined = [...array1, ...array2];
console.log(combined); // Output: [1, 2, 3, 4, 5, 6]

function multiply(...args) {
    return args.reduce((product, num) => product * num, 1);
}
console.log(multiply(2, 3, 4)); // Output: 24
