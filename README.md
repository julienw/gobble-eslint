# gobble-eslint

Check JavaScript files with eslint and gobble

## Installation

First, you need to have gobble installed - see the [gobble readme](https://github.com/gobblejs/gobble) for details. This plugin requires gobble 0.8 or higher. Then,

```bash
npm i -D gobble-eslint
```

## Usage

```js
var gobble = require( 'gobble' );
module.exports = gobble( 'src/js' ).observe( 'eslint', {
  // if `true`, errors will not cause the whole build to fail
  reportOnly: false,

  // you can supply your own reporter - it should take an array
  // of { filename, messages } objects
  reporter: myCustomReporter,

  // all other options are eslint options
  rules: {
    /* eslint rules */
  }
});
```

In this example, whenever files in `src/js` change, they will be linted.

If no eslint options are supplied with the second argument, gobble-eslint will use the nearest `.eslintrc` file instead (this is recommended). See the [eslint](http://eslint.org/) website for documentation on the options you can specify.

To skip linting when a particular condition is not met, use `.observeIf()`:

```js
module.exports = gobble( 'src/js' )
  .observeIf( gobble.env() !== 'production', 'eslint', {...});
```

Use the `growl` option to send a notification when the linting is done:

```js
```

See [the node-growl documentation](https://github.com/tj/node-growl) to know the
requirements for this node module.

## License

MIT. Copyright 2014 Rich Harris
