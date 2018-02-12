class Foo {
  async test(arg) {
    return 2 + arg;
  }
}

class Test extends Foo {
  async test(arg) {
    return await super.test(arg) + 2;
  }
}

module.exports = Test;
