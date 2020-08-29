/* eslint-disable @typescript-eslint/no-var-requires */
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');
const webpack = require('webpack');

module.exports = (config, context) => {
    nrwlConfig(config);

    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    );

    config.module.rules.push(
        {
            test: /node_modules\/vfile\/core\.js/,
            use: [{
                loader: 'imports-loader',
                options: {
                    type: 'commonjs',
                    imports: ['single process/browser process'],
                },
            }],
        },
    );

    return {
        ...config
    };
};
