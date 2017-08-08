const webpack = require('webpack');
const { resolve, join } = require('path');

module.exports = function karmaConfig(config) {
    config.set({
        frameworks: ['mocha', 'sinon', 'chai'],
        plugins: [
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-sinon'),
            require('karma-phantomjs-launcher'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-coverage'),
            require('karma-sourcemap-loader'),
            require('karma-mocha-reporter'),
            require('istanbul-instrumenter-loader'),
            require('karma-remap-coverage'),
            require('karma-spec-reporter')
        ],
        reporters: ['spec', 'coverage', 'remap-coverage'],

        files: [
            // Grab all files in the app folder that contain .spec.
            { pattern: 'karma.shim.js', watched: false }
        ],
        customLaunchers: {
            'PhantomJS_custom': {
                base: 'PhantomJS',
                options: {
                    windowName: 'my-window',
                    settings: {
                        webSecurityEnabled: false
                    },
                },
                flags: ['--load-images=true'],
                debug: false
            }
        },
        preprocessors: {
            'karma.shim.js': ['webpack', 'sourcemap', 'coverage']
        },

        browsers: [
            'PhantomJS'
            // 'Chrome'
            // 'PhantomJS_custom'
        ],

        singleRun: true,
        colors: true,
        concurrency: Infinity,
        // enable / disable watching file and executing tests whenever any file changes
        // autoWatch: false,
        /*
           * level of logging
           * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
           */
        logLevel: config.LOG_INFO,
        // Configure code coverage reporter
        coverageReporter: {
            type: 'in-memory'
        },
        remapCoverageReporter: {
            'text-summary': null,
            'html': './coverage/html',
        },
        // Webpack don't spam the console when running in karma!
        webpackMiddleware: { stats: 'errors-only' },

        webpack: require('./webpack/webpack.test.config'),
        // ,

        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: 'errors-only'
        }
    });
};
