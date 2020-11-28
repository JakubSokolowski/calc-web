module.exports = {
    name: 'float-converter',
    preset: '../../jest.config.js',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js'],
    coverageDirectory: '../../coverage/libs/float-converter'
};
