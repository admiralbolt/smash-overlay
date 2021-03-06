// If a dev flag is passed use the dev config.
const config_path = (process.argv.length >= 3 && process.argv[2].includes('dev')) ? './webpack.config.dev.js' : './webpack.config.js';

var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var webpack = require('webpack');
var config = require(config_path);

var app = express();
var compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./sockets')(io);

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), '127.0.0.1', function() {
  console.log(server.address());
});
