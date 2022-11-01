const numbers = [10, 20, 30];

let total = 0;
for (const n of numbers) {
  total += n;
}
total;

numbers.reduce((cv, n) => cv + n, 0);
