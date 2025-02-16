import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Ignore transformation of node_modules except for lucide-react
  transformIgnorePatterns: [
    'node_modules/(?!lucide-react)', // Allows Jest to transform `lucide-react`
  ],
  maxWorkers: 2, // Limits parallel workers (reduce memory spikes)
  testTimeout: 10000, // Increases timeout to avoid crashes
  clearMocks: true, // Ensures mocks are cleared between tests
  restoreMocks: true,
  resetMocks: true,
  collectCoverage: true,

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/lib/',
    '/services/',
  ],

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
