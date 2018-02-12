function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Foo {
  test(arg) {
    return _asyncToGenerator(function* () {
      return 2 + arg;
    })();
  }
}

class Test extends Foo {
  test(arg) {
    var _this = this;

    return _asyncToGenerator(function* () {
      return (yield Foo.prototype.test.call(_this, arg)) + 2;
    })();
  }
}

module.exports = Test;