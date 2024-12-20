module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest for .js and .jsx files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // Ensure Jest recognizes .ts, .tsx, .js, .jsx files
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/components/$1', // Map @components to src/components
        '^@services/(.*)$': '<rootDir>/services/$1', // Map @services to src/services
        '^@types$': '<rootDir>/types/index.ts', // Map @types to src/types/index.ts
        '^@styles/(.*)$': '<rootDir>/styles/$1', // Map @styles to src/styles
    },
};
