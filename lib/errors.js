'use strict';

var createError = require('errno').create;

var MyntcoreNodeError = createError('MyntcoreNodeError');

var RPCError = createError('RPCError', MyntcoreNodeError);

module.exports = {
  Error: MyntcoreNodeError,
  RPCError: RPCError
};
