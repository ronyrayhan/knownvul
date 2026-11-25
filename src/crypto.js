'use strict';

const crypto = require('crypto');

function insecureHash(password) {
  // SAST-VULN: weak-hash | CWE-327 | MD5 is unsuitable for passwords.
  return crypto.createHash('md5').update(password).digest('hex');
}

function predictableResetToken() {
  // SAST-VULN: insecure-randomness | CWE-330 | Math.random is predictable for security tokens.
  return Math.random().toString(36).slice(2);
}

// SAST-VULN: weak-crypto | CWE-327 | DES is obsolete and insecure.
const LEGACY_CIPHER = 'des-ede3-cbc';

module.exports = { insecureHash, predictableResetToken, LEGACY_CIPHER };
