
function operate(a, b, callback) {
    return callback(a, b);
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return b === 0 ? "Cannot divide by zero!" : a / b;
}
console.log("Multiplication:", operate(6, 2, multiply)); // Output: 12
console.log("Division:", operate(6, 2, divide)); // Output: 3
