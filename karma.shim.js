// This file is an entry point for karma

var appContext = require.context('./src', true, /\.spec\.js/);

appContext.keys().forEach(appContext);