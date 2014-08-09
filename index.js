var godot = require('godot');
var debug = require('debug')('bigpipe:godot');

exports.name = 'godot';

exports.server = function (pipe, options) {
  var opts = options('godot') || {};
  debug('initializing godot client')

  if (!opts.host || !opts.port) {
    debug('Godot plugin not initialized since no host and port are found');
    return;
  }

  //
  // Attach a reference we can access
  //
  pipe.godot = godot.createClient({
    type: opts.type || 'tcp',
    host: opts.host,
    port: opts.port,
    reconnect: opts.reconnect || {}
  });

  //
  // Proxy relevant events and such
  //
  pipe.godot.on('error', pipe.emit.bind(pipe, 'error'));
  pipe.godot.on('connect', pipe.emit.bind(pipe, 'godot:connect'));

  pipe.godot.connect();
};
