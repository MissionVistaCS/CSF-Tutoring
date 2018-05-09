const express = require('express'),
      path = require('path'),
      routescan = require('express-routescan'),
      PropertiesReader = require('properties-reader');
const app = express();

app.set('port', 3000 || process.ENV.PORT);  // did something wrong and stupid here

app.use('/dist', express.static('dist'));
app.use('/src/assets', express.static('src/assets'));

// Globals 
global._base = __dirname + '/';
glboal._db = PropertiesReader('./resources/db.properties');
global._env = app.get('env');
global._isDev = _env === 'development';
global._isProd = _env === 'production';

console.info = function(message) {
	console.log('[INFO]', message);
};

console.debug = function(message) {
	console.log('[DEBUG]', message);
};

console.critical = function(message) {
	console.log('[!!!!! CRITICAL !!!!!]', message);
};

const setUpDatabase = reuqire(_base + 'services/SetupDatabase');

setUpDatabase();


routescan(app, {
	ignoreInvalid: true
});

app.use((req, res) => res.sendFile(path.join(_base, '/index.html')));

app.get('/api', (req, res) => {
	res.json({ message: 'Welcome to the Server' });
});

app.listen(app.get('port'), () => console.log('API listening on port', app.get('port')));
