'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export myntcore-lib', function() {
    var myntcore = require('../');
    should.exist(myntcore.lib);
    should.exist(myntcore.lib.Transaction);
    should.exist(myntcore.lib.Block);
  });
});
