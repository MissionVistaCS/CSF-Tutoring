const express = require('express'),
      path = require('path'),
      routescan = require('express-routescan');
const app = express();

app.set('port', 3000 || process.ENV.PORT);  // did something wrong and stupid here

app.use('/dist', express.static('dist'));
app.use('/src/assets', express.static('src/assets'));

// Globals 
global._base = __dirname + '/';



app.use((req, res) => res.sendFile(path.join(_base, '/index.html')));

app.get('/api', (req, res) => {
	res.json({ message: 'Welcome to the Server' });
});

app.listen(app.get('port'), () => console.log('API listening on port', app.get('port')));
