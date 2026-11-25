'use strict';

const { prepareValidationValue } = require('./validation-chain-middle');

function validateValue(value) {
  return prepareValidationValue(value) === 'valid';
}

module.exports = { validateValue };
