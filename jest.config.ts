import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
   preset: "ts-jest",
   testEnvironment: "node",
   globals: { "ts-jest": { isolatedModules: true } },
   collectCoverage: true,
   collectCoverageFrom: ["<rootDir>/src/**"],
   coveragePathIgnorePatterns: [
      "<rootDir>/src/components",
      "<rootDir>/src/interfaces",
      "<rootDir>/src/middlewares",
      "<rootDir>/src/services",
      "index.ts"],
   moduleNameMapper: { "^@utils/(.*)$": "<rootDir>/src/utils/$1" }
}

export default jestConfig
