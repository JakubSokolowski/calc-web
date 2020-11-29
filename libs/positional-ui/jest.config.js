module.exports = {
    name: 'positional-ui',
    preset: '../../jest.config.js',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
    coverageDirectory: '../../coverage/libs/positional-ui',
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js']
};
