const express = require('express'),
      path = require('path'),
      routescan = require('express-routescan'),
      PropertiesReader = require('properties-reader'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      fs = require('fs'),
      passport = require('passport');
const app = express();

app.set('port', 3000 || process.ENV.PORT);  // did something wrong and stupid here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: '54brtbnytuioy98rt%^BR*%Eryuhifgdghuif984t7io38gjiof😁',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false, maxAge: Number(10000000000) }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/dist', express.static('dist'));
app.use('/src/assets', express.static('src/assets'));

// Globals 
global._base = __dirname + '/';
global._db = PropertiesReader('./resources/db.properties');
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

const setUpDatabase = require(_base + 'services/SetupDatabase');

setUpDatabase();


routescan(app, {
	ignoreInvalid: true
});

app.use((req, res) => res.sendFile(path.join(_base, '/index.html')));

app.get('/api', (req, res) => {
	res.json({ message: 'Welcome to the Server' });
});

app.listen(app.get('port'), () => console.log('API listening on port', app.get('port')));
