// eslint-disable-next-line @typescript-eslint/no-var-requires
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config, context) => {
    nrwlConfig(config);

    return {
        ...config
    };
};
