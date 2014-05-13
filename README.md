# bigpipe-godot

Easily hook a [`godot`](https://browsenpm.org/package/godot) client onto your
bigpipe instance for a simple interface to produce metrics!

```js

var path = require('path');
var Pipe = require('bigpipe');
var godot = require('bigpipe-godot');
va Memory = requir('memory-producer');

//
// Make a BigPipe instance!
//
var pipe = new Pipe(require('http').createServer(), {
  pages: path.join(__dirname, 'pages'),
  dist: path.join(__dirname, 'dist'),
  godot: {
    type: 'tcp',
    host: 'my-metrics-endpoint.com',
    port: 8556
  }
}).listen(3000).use(godot);

//
// After we use the godot plugin, we can now interact with the instance!
// We can add producers like `memory-producer` to magically produce
// memory metrics for us!
//
pipe.godot.add(new Memory({ service: 'bigpipe-godot' }));

```
