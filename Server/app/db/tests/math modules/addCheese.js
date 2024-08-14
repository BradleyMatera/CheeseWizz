// This function is called addCheese. It takes two numbers as inputs, 
// which we’re thinking of as slices of cheese, and adds them together.
const addCheese = (a, b) => {
  // I’m using template literals here because they make it easier to spell out 
  // the words and incorporate variables smoothly. It also adds a bit of fun to the code!
  console.log(`Adding ${a} slices of cheese to ${b} slices of cheese.`);
  // After adding the slices, the function gives back the total number of slices.
  return a + b;
};

module.exports = addCheese;