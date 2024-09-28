module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(test).ts'],
    collectCoverage: true,
    coverageDirectory: './coverage',
    coverageReporters: ['lcov'],
    reporters: [
        'default',
        [
          'jest-junit',
          {
            outputDirectory: './',
            outputName: 'jest-results.xml',
          },
        ],
    ],
};
