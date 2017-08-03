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
        reporters: ['spec'],

        files: [
            // Grab all files in the app folder that contain .spec.
            {
                pattern: 'karma.shim.js',
                watched: false
            }
        ],

        preprocessors: {
            'karma.shim.js': ['webpack', 'sourcemap']
        },

        browsers: [
            'PhantomJS'
            // 'Chrome'
        ],

        singleRun: true,
        colors: true,
        concurrency: Infinity,
        logLevel: config.LOG_INFO,
        // Configure code coverage reporter
        coverageReporter: {
            dir: 'coverage/',
            reporters: [{
                type: 'text-summary'
            },
            {
                type: 'html'
            }
            ]
        },

        webpack: require('./webpack.test.config'),
        // ,

        // Hide webpack build information from output
        webpackMiddleware: {
            noInfo: 'errors-only'
        }
    });
};