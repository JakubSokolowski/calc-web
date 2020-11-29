module.exports = {
    name: 'common-ui',
    preset: '../../jest.config.js',
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
    coverageDirectory: '../../coverage/libs/common-ui',
    setupFilesAfterEnv: ['<rootDir>/src/jest.setup.js']
};
