const { fareCents } = require("../src/fare");

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