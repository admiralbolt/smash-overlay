var default_data = require('../src/default_data.js');

module.exports = function (io) {
  // This variable is our entire persistence layer... Basically.
  var data = default_data;

  var overlay_info = io.of('/overlay_info');

  overlay_info.on('connection', function(socket) {
    // Log the new connection
    console.log('overlay_info user connected: ' + socket.handshake.address + ' -> ' + socket.request.headers.referer);
    console.log(JSON.stringify(data));

    // Initialize defaults
    socket.emit('update_overlay', data);

    socket.on('disconnect', function() {
      console.log('overlay_info user disconnected: ' + socket.handshake.address);
    });

    socket.on('update_overlay', function (msg) {
      data = msg;
      console.log('update overlay_info: ' + JSON.stringify(data));
      overlay_info.emit('update_overlay', data);
    });

  });
}
