var default_data = require('../src/default_dubs.js');

module.exports = function(io) {
  // This variable is our entire persistence layer... Basically.
  var data = default_data;

  var dubs_overlay = io.of('/dubs_overlay');

  dubs_overlay.on('connection', function(socket) {
    // Log the new connection
    console.log('dubs_overlay user connected: ' + socket.handshake.address + ' -> ' + socket.request.headers.referer);
    console.log(JSON.stringify(data));

    // Initialize defaults
    socket.emit('update_overlay', data);

    socket.on('disconnect', function() {
      console.log('dubs_overlay user disconnected: ' + socket.handshake.address);
    });

    socket.on('update_overlay', function (msg) {
      data = msg;
      console.log('update dubs_overlay: ' + JSON.stringify(data));
      dubs_overlay.emit('update_overlay', data);
    });

  });
}
