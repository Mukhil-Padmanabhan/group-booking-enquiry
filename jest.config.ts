import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['/node_modules/(?!(your-esm-package)/)'],
  testPathIgnorePatterns: ['<rootDir>/e2e/', '<rootDir>/__e2e__/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  // transform: {
  //   '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  // }
};

export default createJestConfig(customJestConfig);
