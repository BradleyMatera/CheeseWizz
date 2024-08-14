// The maxCheese function compares two numbers,
// which we're thinking of as blocks of cheese, to find the larger one.
const maxCheese = (a, b) => {
  // We log the comparison to see which block has more cheese.
  console.log(`Comparing ${a} and ${b} blocks of cheese to find the maximum.`);
  // The function returns the larger of the two numbers.
  return Math.max(a, b);
};

module.exports = maxCheese;