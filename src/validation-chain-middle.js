'use strict';

const { normalizeValidationValue } = require('./validation-chain-leaf');

function prepareValidationValue(value) {
  return normalizeValidationValue(value).toLowerCase();
}

module.exports = { prepareValidationValue };
