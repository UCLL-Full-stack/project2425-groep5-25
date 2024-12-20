module.exports = {
    testEnvironment: 'jsdom',
    verbose: false,
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@services/(.*)$': '<rootDir>/services/$1',
        '^@types$': '<rootDir>/types/index.ts',
        '^@styles/(.*)$': '<rootDir>/styles/$1',
        '^@hooks/(.*)$': '<rootDir>/hooks/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
    },
};
