var assert = require('assert')
var through = require('through2')
var posthtml = require('posthtml')

module.exports = function (opts) {
  var data = ''
  opts = opts || {}

  if (typeof opts.parser === 'string') {
    opts.parser = require(opts.parser)
  }
  if (typeof opts.render === 'string') {
    opts.render = require(opts.render)
  }
  if (opts.use == null) {
    opts.use = []
  }

  assert(opts.parser == null || typeof opts.parser === 'function', 'posthtmlify: opts.parser must be undefined or a function')
  assert(opts.render == null || typeof opts.render === 'function', 'posthtmlify: opts.render must be undefined or a function')
  assert(Array.isArray(opts.use), 'posthtmlify: opts.use must be an array of plugins')

  var plugins = []
  for (var i = 0; i < opts.use.length; i++) {
    var p = opts.use[i]
    var factory = p
    var popts = {}
    if (Array.isArray(p)) {
      factory = p[0]
      popts = p[1]
    }
    if (typeof factory === 'string') {
      factory = require(factory)
    }
    assert.equal(typeof factory, 'function', 'posthtmlify: plugins must be functions')
    plugins.push(factory(popts))
  }

  var processor = posthtml(plugins)

  return through(onwrite, onend)

  function onwrite (chunk, enc, next) {
    data += chunk
    next()
  }

  function onend (next) {
    processor.process(data, opts).then(function (result) {
      next(null, result.html)
    }, next)
  }
}
