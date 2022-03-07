/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
    collectCoverageFrom: [
        '**/*.{ts,}',
        '!**/*.module.ts',
        '!**/*.interface.ts',
        '!**/*.constants.ts',
        '!**/*.dto.ts',
        '!**/*.schema.ts',
        '!**/*.builder.ts',
        '!**/*.model.ts',
        '!**/*.int.spec.ts',
        '!main.ts',
        '!**/*.repository.ts',
        '!**/*.configuration.ts',
        '!**/*.exception.ts',
        '!**/index.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageDirectory: '../coverage',
    coverageProvider: 'v8',
    coverageReporters: ['lcov', 'text'],
    rootDir: 'src',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts', '!**/*.int.spec.ts'],
    transform: {
        '^.+\\.(t)s$': 'ts-jest',
    },
};
