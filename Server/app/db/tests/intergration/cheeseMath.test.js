// Importing each function to test individually.
const addCheese = require('./addCheese');
const subtractCheese = require('./subtractCheese');
const multiplyCheese = require('./multiplyCheese');
const divideCheese = require('./divideCheese');
const cheeseSqrt = require('./cheeseSqrt');
const maxCheese = require('./maxCheese');

// Test for the addition function.
describe('Cheese Addition Function', () => {
  test('Adds 3 slices of cheese + 2 slices of cheese to equal 5 slices of cheese', () => {
    expect(addCheese(3, 2)).toBe(5);
  });
});

// Test for the subtraction function.
describe('Cheese Subtraction Function', () => {
  test('Subtracts 5 slices of cheese - 2 slices of cheese to equal 3 slices of cheese', () => {
    expect(subtractCheese(5, 2)).toBe(3);
  });
});

// Test for the multiplication function.
describe('Cheese Multiplication Function', () => {
  test('Multiplies 4 blocks of cheese * 3 slices per block to equal 12 slices of cheese', () => {
    expect(multiplyCheese(4, 3)).toBe(12);
  });
});

// Test for the division function.
describe('Cheese Division Function', () => {
  test('Divides 10 blocks of cheese by 2 people to equal 5 blocks per person', () => {
    expect(divideCheese(10, 2)).toBe(5);
  });
});

// Test for the square root function.
describe('Cheese Square Root Function', () => {
  test('Returns the square root of 16 slices of cheese to equal 4 slices', () => {
    expect(cheeseSqrt(16)).toBe(4);
  });
});

// Test for the maximum function.
describe('Cheese Maximum Function', () => {
  test('Returns the maximum of 10 and 20 blocks of cheese to equal 20 blocks', () => {
    expect(maxCheese(10, 20)).toBe(20);
  });
});