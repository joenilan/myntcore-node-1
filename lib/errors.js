'use strict';

var createError = require('errno').create;

var MyntcoreNodeError = createError('MyntcoreNodeError');

var RPCError = createError('RPCError', MyntoreNodeError);

module.exports = {
  Error: MyntoreNodeError,
  RPCError: RPCError
};
