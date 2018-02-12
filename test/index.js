const pluginPath = require.resolve('../');
const {spawnSync} = require('child_process');
const assert = require('assert');
const fs = require('fs');

describe('babel-plugin-transform-async-super', function () {
  before(function () {
    var res = spawnSync(__dirname + '/../node_modules/.bin/babel', [
      __dirname + '/fixtures',
      '-d',
      __dirname + '/compiled',
      '--plugins=' + pluginPath + ',babel-plugin-transform-async-to-generator'
    ]);

    let stderr = res.stderr.toString();
    if (stderr) {
      throw new Error(stderr);
    }
  });

  it('should transform super calls to prototype lookups', function () {
    let s = fs.readFileSync(__dirname + '/compiled/test.js', 'utf8');
    assert(s.includes('Foo.prototype.test.call'));
  });

  it('should run', function () {
    var Test = require('./compiled/test');
    let t = new Test;
    return t.test(4).then(function (res) {
      assert.equal(res, 8);
    });
  });
});
