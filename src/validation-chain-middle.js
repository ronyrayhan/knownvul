'use strict';
// Medium validation change: retain the leaf-to-middle call edge.

const { normalizeValidationValue } = require('./validation-chain-leaf');

function prepareValidationValue(value) {
  return normalizeValidationValue(value).toLowerCase();
}

module.exports = { prepareValidationValue };
