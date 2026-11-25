'use strict';
// Medium validation change: leaf normalization remains side-effect free.

function normalizeValidationValue(value) {
  return String(value).trim().replace(/\s+/g, ' ');
}

module.exports = { normalizeValidationValue };
