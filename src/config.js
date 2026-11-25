'use strict';

// SAST-VULN: hardcoded-secret | CWE-798 | Embedded credential in source.
const DATABASE_PASSWORD = 'sast-demo-password-DO-NOT-USE';
// SAST-VULN: hardcoded-secret | CWE-798 | Embedded API token in source.
const PAYMENT_API_TOKEN = 'sk_test_intentionally_exposed';

module.exports = { DATABASE_PASSWORD, PAYMENT_API_TOKEN };
