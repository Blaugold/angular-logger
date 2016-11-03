const path = require('path')

module.exports = function (karma) {
    karma.set({
        basePath: __dirname,

        frameworks: ['jasmine'],

        files: [{pattern: 'tests.bundle.ts', watched: false}],

        preprocessors: {
            'tests.bundle.ts': ['webpack']
        },

        reporters: ['mocha', 'karma-remap-istanbul'],

        remapIstanbulReporter: {
            reports: {
                lcovonly: 'coverage/lcov.info',
                html: 'coverage'
            }
        },

        browsers: ['Chrome'],

        port: 9018,
        runnerPort: 9101,
        colors: true,
        logLevel: karma.LOG_INFO,
        autoWatch: true,
        singleRun: false,

        webpackServer: {noInfo: true},
        webpack: {
            devtool: 'inline-source-map',

            resolve: {
                extensions: ['.ts', '.js']
            },

            module: {
                loaders: [
                    {
                        test: /\.ts?$/,
                        exclude: /node_modules/,
                        loader: 'awesome-typescript'
                    },
                    {
                        enforce: 'post',
                        test: /\.(js|ts)$/,
                        loader: 'istanbul-instrumenter',
                        include: path.resolve(__dirname, 'src'),
                        exclude: [
                            /\.(e2e|spec|bundle)\.ts$/,
                            /node_modules/
                        ]
                    }
                ]
            }
        }
    })
}