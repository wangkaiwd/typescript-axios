/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["lib/**/*.ts"],
  watchPathIgnorePatterns: ["/node_modules/", "/build/"],
};
