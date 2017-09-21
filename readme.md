# posthtmlify

[posthtml][] transform for [documentify][].

## Install

```bash
npm install posthtmlify
```

## Usage

### `documentify` cli:

```bash
documentify input.html -t posthtml > output.html
```

With options:

```bash
documentify input.html -t [ posthtml -p posthtml-custom-elements ] > output.html
```

Passing options to posthtml plugins:

```bash
documentify input.html -t [ posthtml -p [ posthtml-include --root "${PWD}" ] ] > output.html
```

[posthtml]: https://github.com/posthtml/posthtml
[documentify]: https://github.com/stackcss/documentify
