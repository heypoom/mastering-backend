module.exports = wallaby => ({
  files: [
    'src/**/*.js',
    'src/**/*.ts',
    'test/utils/*',
    'tsconfig.json',
    '__mocks__/**/*',
    '@types/**/*',
  ],

  tests: ['test/**/*.js', 'test/**/*.ts', '!test/utils/*'],

  env: {
    type: 'node',
    runner: 'node',
  },

  testFramework: 'jest',

  compilers: {
    '**/*.ts?(x)': wallaby.compilers.typeScript({module: 'commonjs'}),
  },
})
