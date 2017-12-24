var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');
var hbs = require('hbs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./sockets')(io);

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
