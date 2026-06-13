/** @type {import('jest').Config} */
module.exports = {
  testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  testEnvironment: './jest-environment-jsdom.cjs',
  // Resolve packages (preact, preact/compat, preact/jsx-runtime, ...) using
  // their CommonJS entry points rather than the browser ESM build, which the
  // CommonJS Jest transform cannot parse.
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
  moduleNameMapper: {
    // Preact aliases (replaces React)
    '^react$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^react-dom$': 'preact/compat',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
    // Local Next.js shims
    '^next/link$': '<rootDir>/build/shims/next-link.tsx',
    '^next/router$': '<rootDir>/build/shims/next-router.ts',
    '^next/head$': '<rootDir>/build/shims/next-head.tsx',
    '^next/app$': '<rootDir>/build/shims/next-app.ts',
    // CSS Modules / CSS imports are not relevant in unit tests
    '\\.css$': '<rootDir>/__tests__/styleMock.cjs',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          jsx: 'react-jsx',
          jsxImportSource: 'preact',
          module: 'commonjs',
          esModuleInterop: true,
          verbatimModuleSyntax: false,
        },
      },
    ],
  },
  moduleDirectories: ['node_modules'],
}
