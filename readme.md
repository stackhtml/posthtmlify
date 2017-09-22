# posthtmlify

[posthtml][] transform for [documentify][].

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/posthtmlify.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/posthtmlify
[travis-image]: https://img.shields.io/travis/goto-bus-stop/posthtmlify.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/posthtmlify
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```bash
npm install posthtmlify
```

## Usage

### `package.json`

```json
{
  "documentify": {
    "transform": [
      ["posthtmlify", {
        "use": [
          "posthtml-custom-elements"
        ]
      }]
    ]
  }
}
```

### Node API

```js
var documentify = require('documentify')
var posthtmlify = require('posthtmlify')

var d = documentify('./index.html').transform(posthtmlify, {
  use: ['posthtml-custom-elements']
})
```

### `documentify` cli:

```bash
documentify input.html -t posthtmlify > output.html
```

With options:

```bash
documentify input.html -t [ posthtmlify --use posthtml-custom-elements ] > output.html
```

Passing options to posthtml plugins:

```bash
documentify input.html -t [ posthtmlify --use [ posthtml-include --root "${PWD}" ] ] > output.html
```

## License

[MIT](LICENSE.md)

[posthtml]: https://github.com/posthtml/posthtml
[documentify]: https://github.com/stackcss/documentify
