/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testPathIgnorePatterns: ["./node_modules/", './src/style.scss']
};
