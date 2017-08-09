// This file is an entry point for karma
require('babel-polyfill');
var testContext = require.context('./src', true, /\.spec\.js/);

testContext.keys().forEach(testContext);
