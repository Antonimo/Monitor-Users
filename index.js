const app = require('express')();
const server = require('http').Server(app);

server.listen(3000, () => console.log('listening on port 3000'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

