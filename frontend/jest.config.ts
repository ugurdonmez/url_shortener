import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.jest.json'
        }
    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    verbose: true,

};

export default config;
