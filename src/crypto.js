'use strict';
// Large validation change marker.

const crypto = require('crypto');

function securePasswordHash(password) {
  const salt = crypto.randomBytes(16);
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt.toString('hex')}:${derivedKey.toString('hex')}`;
}

function predictableResetToken() {
  // SAST-VULN: insecure-randomness | CWE-330 | Math.random is predictable for security tokens.
  return Math.random().toString(36).slice(2);
}

// SAST-VULN: weak-crypto | CWE-327 | DES is obsolete and insecure.
const LEGACY_CIPHER = 'des-ede3-cbc';

module.exports = { securePasswordHash, predictableResetToken, LEGACY_CIPHER };
