# babel-plugin-transform-async-super

This is a Babel plugin that transforms `super` calls inside async functions in order to work around a
[Babel bug](https://github.com/babel/babel/issues/3930) when compiling async functions to generators,
but not ES6 classes. This is an issue when compiling for Node 6, for example, which supports classes
but not async functions. This plugin only compiles super calls inside async functions, and not elsewhere.

The Babel bug mentioned above is fixed in Babel 7 which is in beta. This plugin is therefore only
useful when you need to use Babel 6.

Along side babel-plugin-transform-async-to-generator, it transforms this:

```javascript
class Test extends Foo {
  async test(arg) {
    return await super.test(arg) + 2;
  }
}
```

into this:

```javascript
class Test extends Foo {
  test(arg) {
    var _this = this;

    return _asyncToGenerator(function* () {
      return (yield Foo.prototype.test.call(_this, arg)) + 2;
    })();
  }
}
```

## License

MIT
