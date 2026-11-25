'use strict';

function normalizeValidationValue(value) {
  return String(value).trim().replace(/\s+/g, ' ');
}

module.exports = { normalizeValidationValue };
