// The multiplyCheese function multiplies two numbers,
// imagining one as blocks of cheese and the other as slices per block.
const multiplyCheese = (a, b) => {
  // We log the multiplication to visualize the total amount of cheese.
  console.log(`Multiplying ${a} blocks of cheese by ${b} slices per block.`);
  // The function returns the total number of slices.
  return a * b;
};

module.exports = multiplyCheese;