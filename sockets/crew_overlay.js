var default_data = require('../src/default_crew.js');

module.exports = function(io) {
  // This variable is our entire persistence layer... Basically.
  var data = default_data;

  var crew_overlay = io.of('/crew_overlay');

  crew_overlay.on('connection', function(socket) {
    // Log the new connection
    console.log('crew_overlay user connected: ' + socket.handshake.address + ' -> ' + socket.request.headers.referer);
    console.log(JSON.stringify(data));

    // Initialize defaults
    socket.emit('update_overlay', data);

    socket.on('disconnect', function() {
      console.log('crew_overlay user disconnected: ' + socket.handshake.address);
    });

    socket.on('update_overlay', function (msg) {
      data = msg;
      console.log('update crew_overlay: ' + JSON.stringify(data));
      crew_overlay.emit('update_overlay', data);
    });

  });
}
