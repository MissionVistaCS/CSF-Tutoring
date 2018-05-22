const express = require('express'),
    routescan = require('express-routescan'),
    PropertiesReader = require('properties-reader'),
    format = require('string-format'),
    path = require('path'),
    AWS = require('aws-sdk');

/**
 * START GLOBALS
 */
global._base = __dirname + '/';
global._keys = PropertiesReader(_base + 'resources/keys.properties');
global._db = PropertiesReader(_base + 'resources/db.properties');
global._strings = PropertiesReader(_base + 'resources/strings.properties');

console.info = function (message) {
    console.log('[INFO] ' + message);
};

console.debug = function (message) {
    if (_isDev) console.log('[DEBUG] ' + message);
};

console.critical = function (message) {
    console.log('[!!! CRITICAL !!!] ' + message);
};

format.extend(String.prototype, {});
String.prototype.replaceAll = function (a, b) {
    return this.split(a).join(b);
};

global.RuntimeError = require(_base + 'domain/RuntimeError');
global.CriticalError = require(_base + 'domain/CriticalError');
global.UserError = require(_base + 'domain/UserError');
global.PermissionError = require(_base + 'domain/PermissionError');
global.BaseResponse = require(_base + 'domain/BaseResponse');

/**
 * START EXPRESS/DATABASE CONFIGURATION
 */
const app = express();

global._env = app.get('env');
global._isDev = _env === 'development';
global._isProd = _env === 'production';

console.info('Running in ' + _env + ' environment.');

/**
 * require database.js, upload to server, find error
 */
const setUpDatabase = require(_base + 'services/SetUpDatabase');

setUpDatabase();

/**
 * Middleware for auth, cookies, bodies
 */
const setUpPassport = require(_base + 'services/SetUpPassport');
const setUpMiddleware = require(_base + 'services/SetUpMiddleware');

setUpPassport();
setUpMiddleware(app);

/*
 * Setup AWS-sdk
*/
AWS.config.update({ //TODO: insert your AWS keys below.
    accessKeyId: _keys.get('aws.accessKeyId'),
    secretAccessKey: _keys.get('aws.secretAccessKey'),
    region: _keys.get('aws.region')
});

/**
 * Custom middleware/routes
 */
const security = require(_base + 'middleware/Security');
const errors = require(_base + 'middleware/Errors');
const baseResponse = require(_base + 'middleware/BaseResponse');

app.use(security.jsonVuln); //TODO: Fix security.stripRequest. It converts string arrays to a concatenation of strings.
app.use(express.static(_base + 'public'));
app.use(baseResponse);
routescan(app, {
    ignoreInvalid: true
});

app.use('/dist', express.static('dist'));
app.use('/src/assets', express.static('src/assets'));
app.use((req, res) => res.sendFile(path.join(_base, '/index.html')));

app.use(errors.notFound, errors.handler);

module.exports = app;
