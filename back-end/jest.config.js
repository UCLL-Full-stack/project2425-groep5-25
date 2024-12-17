/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            isolatedModules: true,
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
