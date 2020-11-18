module.exports = {
    name: 'positional-calculator',
    preset: '../../jest.config.js',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
    coverageDirectory: '../../coverage/libs/positional-calculator',
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js']
};
