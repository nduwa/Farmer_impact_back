// randomUtils.js
export function generateRandomDigits(length) {
    let min = Math.pow(10, length - 1);
    let max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1));
}
