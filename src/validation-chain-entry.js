'use strict';
// Medium validation change: retain the middle-to-entry call edge.

const { prepareValidationValue } = require('./validation-chain-middle');

function validateValue(value) {
  return prepareValidationValue(value) === 'valid';
}

module.exports = { validateValue };
