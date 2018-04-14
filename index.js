let express = require('express');
let app = express();
app.get('/api', (req, res) => {
	res.json({ message: 'Welcome to the Server' });
});

app.listen(3000, ()=>{
	console.log('API listening on port 3000');
});
