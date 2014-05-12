var godot = require('godot');
var debug = require('debug')('bigpipe:godot');

exports.name = 'godot';

exports.server = function (pipe, options) {
  var opts = options('godot') || {};
  debug('initializing godot client')

  if (!opts.host || !opts.port) {
    return pipe.emit('error', new Error('godot plugin requires a host and port'));
  }

  //
  // Attach a reference we can access
  //
  var godot = pipe.godot = godot.createClient({
    host: opts.host,
    port: opts.port,
    reconnect: opts.reconnect || {}
  });

  //
  // Proxy relevant events and such
  //
  godot.on('error', pipe.emit.bind(pipe, 'error'));
  godot.on('connect', pipe.emit.bind(pipe, 'godot:connect'));

  godot.connect();
};
