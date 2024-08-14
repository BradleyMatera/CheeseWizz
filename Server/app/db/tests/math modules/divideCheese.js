// The divideCheese function divides one number by another,
// representing blocks of cheese being divided among people.
const divideCheese = (a, b) => {
  // We check if the divisor (b) is zero because dividing by zero doesn’t work.
  if (b === 0) {
    // If b is zero, we stop everything and throw an error.
    throw new Error("Cannot divide cheese by zero.");
  }
  // Otherwise, we log the division and return the result.
  console.log(`Dividing ${a} blocks of cheese by ${b} people.`);
  return a / b; // This gives us how much cheese each person gets.
};

module.exports = divideCheese;