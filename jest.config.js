const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Any custom config you want to pass to Jest
const customJestConfig = {
  testMatch: ['**/*.(test|spec).(js|ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^~/components/(.*)$': '<rootDir>/src/components/$1',
    '^~/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^~/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^~/hooks/(.*)$': '<rootDir>/src/hooks/$1',
  },
  testEnvironment: './jest-environment-jsdom.cjs',
  // ts/tsxファイルに対してts-jestを使うよう設定
  // ts-jest's tsconfig: https://kulshekhar.github.io/ts-jest/docs/getting-started/options
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        isolatedModules: false,
        useESM: true,
      },
    ],
  },
  // verbose: true,
  // rootDir: 'test',
  // modulePaths: ['<rootDir>/lib'],
  // transformIgnorePatterns: ['/next[/\\\\]dist/', '/\\.next/'],
  // modulePaths: [
  //   '<rootDir>',
  //   '^~/components/(.*)$':
  //     '<rootDir>/src/components/$1',
  // ],
  moduleDirectories: ['node_modules'],
}

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
