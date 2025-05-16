export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  moduleFileExtensions: ['ts', 'js'],
  transformIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  modulePathIgnorePatterns: ['/dist/'],
};
