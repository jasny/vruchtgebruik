import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleFileExtensions: ['ts', 'html', 'js'],
  // Treat TypeScript files as ESM so Angular ESM packages work in Jest 30
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$'
      }
    ]
  },
  transformIgnorePatterns: [
    // Allow transforming ESM packages under node_modules that ship modern syntax
    '/node_modules/(?!(?:.*\\.mjs$))'
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'jest']
  },
  testPathIgnorePatterns: ['<rootDir>/dist/']
};
export default config;
