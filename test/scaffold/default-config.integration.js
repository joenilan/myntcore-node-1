'use strict';

var path = require('path');
var should = require('chai').should();
var sinon = require('sinon');
var proxyquire = require('proxyquire');

describe('#defaultConfig', function() {
  var expectedExecPath = path.resolve(__dirname, '../../bin/myntd');

  it('will return expected configuration', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'myntd',
        'web'
      ],
      servicesConfig: {
        myntd: {
          spawn: {
            datadir: process.env.HOME + '/.myntcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.myntcore/myntcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig();
    info.path.should.equal(home + '/.myntcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal(['myntd', 'web']);
    var myntd = info.config.servicesConfig.myntd;
    should.exist(myntd);
    myntd.spawn.datadir.should.equal(home + '/.myntcore/data');
    myntd.spawn.exec.should.equal(expectedExecPath);
  });
  it('will include additional services', function() {
    var config = JSON.stringify({
      network: 'livenet',
      port: 3001,
      services: [
        'myntd',
        'web',
        'insight-api-mynt',
        'insight-ui-mynt'
      ],
      servicesConfig: {
        myntd: {
          spawn: {
            datadir: process.env.HOME + '/.myntcore/data',
            exec: expectedExecPath
          }
        }
      }
    }, null, 2);
    var defaultConfig = proxyquire('../../lib/scaffold/default-config', {
      fs: {
        existsSync: sinon.stub().returns(false),
        writeFileSync: function(path, data) {
          path.should.equal(process.env.HOME + '/.myntcore/myntcore-node.json');
          data.should.equal(config);
        },
        readFileSync: function() {
          return config;
        }
      },
      mkdirp: {
        sync: sinon.stub()
      }
    });
    var home = process.env.HOME;
    var info = defaultConfig({
      additionalServices: ['insight-api-mynt', 'insight-ui-mynt']
    });
    info.path.should.equal(home + '/.myntcore');
    info.config.network.should.equal('livenet');
    info.config.port.should.equal(3001);
    info.config.services.should.deep.equal([
      'myntd',
      'web',
      'insight-api-mynt',
      'insight-ui-mynt'
    ]);
    var myntd = info.config.servicesConfig.myntd;
    should.exist(myntd);
    myntd.spawn.datadir.should.equal(home + '/.myntcore/data');
    myntd.spawn.exec.should.equal(expectedExecPath);
  });
});
