var test = require('tape')
var dedent = require('dedent')
var concat = require('concat-stream')
var assertHtml = require('assert-html')
var documentify = require('documentify')
var posthtmlify = require('../')

test('options', function (t) {
  t.plan(4)

  t.throws(function () {
    posthtmlify({ use: 'abc' })
  }, /opts\.use must be an array of plugins/)
  t.throws(function () {
    posthtmlify({
      use: [
        null
      ]
    })
  }, /plugins must be functions/)

  t.doesNotThrow(function () {
    posthtmlify({
      use: ['posthtml-custom-elements']
    })
  }, 'can specify plugins by their module names')
  t.doesNotThrow(function () {
    posthtmlify({
      use: [require('posthtml-custom-elements')]
    })
  }, 'can specify plugin factories directly')
})

test('transforms html using plugins', function (t) {
  t.plan(5)

  var d = documentify('index.html', `
    <component>
      <text>Awesome Text</text>
    </component>
  `)
  d.transform(posthtmlify, {
    use: ['posthtml-custom-elements']
  })
  d.bundle().pipe(concat({ encoding: 'string' }, function (result) {
    assertHtml(t, result.replace(/\n +/g, ''), `
      <div class="component">
        <div class="text">Awesome Text</div>
      </div>
    `.replace(/\n +/g, ''))
  }))
})

test('custom parsers', function (t) {
  t.plan(18)

  var d = documentify('index.pug', dedent`
    doctype html
    html
      head
        meta(charset="utf8")
        title Pug Parser
      body
        h1#title Pug for PostHTML
        p= greeting
  `)
  d.transform(posthtmlify, {
    parser: require('posthtml-pug')({
      locals: { greeting: 'hi' }
    })
  })
  d.bundle().pipe(concat({ encoding: 'string' }, function (result) {
    assertHtml(t, result.replace(/\n +/g, ''), `
      <!DOCTYPE html>

      <html>
        <head>
          <meta charset="utf8">
          <title>Pug Parser</title>
        </head>
        <body>
          <h1 id="title">Pug for PostHTML</h1>
          <p>hi</p>
        </body>

      </html>
    `.replace(/\n +/g, ''))
  }))
})
