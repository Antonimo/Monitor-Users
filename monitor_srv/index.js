const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: '*:*'});

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var uuid = require('node-uuid');


/**
 * DB Setup
 */

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject5';

// Global database client instance
var db;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("MongoClient: Connected successfully to server.");
  db = client.db(dbName);
});



/**
 * HTTP Server Setup
 */

server.listen(3001, () => console.log('listening on port 3001'));

console.log( __dirname );

app.get('/um.js', function (req, res) {
  res.sendFile(__dirname + '/um.js');
});

app.get('/mon_client.js', function (req, res) {
  res.sendFile(__dirname + '/mon_client.js');
});


io.on('connection', function (socket) {
  
  socket.emit('setup', { uuid: uuid.v4() });
  
  // Store page views
  socket.on('page_view', function (data) {
    
    db.collection('page_views').insert(data);

  });

  // Store user trackign data
  socket.on('td', function (data) {

    db.collection('td').insert(data.td);

  });

});