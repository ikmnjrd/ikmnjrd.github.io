const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Any custom config you want to pass to Jest
const customJestConfig = {
  testMatch: [
    '**/*.test.js',
    '**/*.test.ts',
    '**/*.test.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^~/components/(.*)$':
      '<rootDir>/src/components/$1',

    '^~/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^~/utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  // ts/tsxファイルに対してts-jestを使うよう設定
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
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
  // moduleDirectories: ['node_modules'],
}

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(
  customJestConfig
)
