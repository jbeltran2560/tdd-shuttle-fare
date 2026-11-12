const { fareCents } = require("../src/fare");
const { weeklyTotal } = require("../src/fare");
test("short trip: adult pays the base fare", () => {
  // Arrange
  const distanceKm = 3;
  // Act
  const result = fareCents(distanceKm, "adult");
  // Assert
  expect(result).toBe(200);
});

test("Exactly 5 km for an adult costs 200", () => {
  // Arrange
  const distanceKM = 5;
  //Act
  const result = fareCents(distanceKM, "adult");
  //Assert
  expect(result).toBe(200);
});
test("8 km for an adult costs 350", () => {
  // Arrange
  const distanceKM = 8;
  //Act
  const result = fareCents(distanceKM, "adult");
  //Assert
  expect(result).toBe(350);
});
test("8 km for a student costs 175", () => {
  // Arrange
  const distanceKM = 8;
  //Act
  const result = fareCents(distanceKM, "student");
  //Assert
  expect(result).toBe(175);
});
test("20 km for a child costs 0", () => {
  // Arrange
  const distanceKM = 20;
  //Act
  const result = fareCents(distanceKM, "child");
  //Assert
  expect(result).toBe(0);
});
test("A distance of −1 raises an error", () => {
  expect(() => fareCents(-1, "adult")).toThrow(RangeError);
});
test("An unknown rider type such as \"pilot\" raises an error", () => {
  expect(() => fareCents(3, "pilot")).toThrow("unknown rider type");
});
test("part of a km is charged as a full km", () => {
  expect(fareCents(5.5, "adult")).toBe(250);
});
test("peak hours add a 100-cent surcharge", () => {
  expect(fareCents(3, "adult", true)).toBe(300);
});
test("students pay half of the peak surcharge too", () => {
  expect(fareCents(3, "student", true)).toBe(150);
});
test.each([
  [0, "adult", 200],
  [5, "adult", 200],
  [5.1, "adult", 250],
  [6, "adult", 250],
  [10, "student", 225],
  [10, "senior", 225],
  [100, "child", 0],
  [4.9, "adult", 200],
  [5.01, "student", 125],
  [100, "senior", 2475]
])("%p km, %s pays %p cents", (distanceKm, rider, expected) => {
  expect(fareCents(distanceKm, rider)).toBe(expected); 
});
test("An empty week costs 0", () => {
  const sum = 0;
  const days = 7;
  const result = weeklyTotal(sum, days);
  expect(result).toBe(0);
});
test("A week under the cap costs the sum", () => {
    expect(weeklyTotal(10,7)).toBe(70);
});
test("A week of exactly 1500 costs 1500", () => {
    expect(weeklyTotal(250,6)).toBe(1500);
});
test("A week over the cap costs 1500", () => {
    expect(weeklyTotal(215,7)).toBe(1500);
});