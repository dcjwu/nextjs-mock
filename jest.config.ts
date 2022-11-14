import type { JestConfigWithTsJest } from "ts-jest"

const jestConfig: JestConfigWithTsJest = {
   preset: "ts-jest",
   testEnvironment: "node",
   globals: { "ts-jest": { isolatedModules: true } },
   verbose: true,
   collectCoverage: true,
   collectCoverageFrom: ["<rootDir>/src/**"],
   coveragePathIgnorePatterns: [
      "<rootDir>/src/components",
      "<rootDir>/src/context",
      "<rootDir>/src/interfaces",
      "<rootDir>/src/layouts",
      "<rootDir>/src/lib",
      "<rootDir>/src/middlewares",
      "<rootDir>/src/services/aws",
      "<rootDir>/src/services/prisma",
      "<rootDir>/src/services/uuid",
      "<rootDir>/src/types",
      "index.ts"],
   moduleNameMapper: {
      "^@utils/(.*)$": "<rootDir>/src/utils/$1",
      "^@services/(.*)$": "<rootDir>/src/services/$1"
   }
}

export default jestConfig
