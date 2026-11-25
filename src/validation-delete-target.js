'use strict';

function temporaryDeleteTarget(value) {
  // SAST-VULN: validation-delete-code-injection | CWE-95 | Temporary test finding for deletion handling.
  return eval(value); // eslint-disable-line no-eval
}

module.exports = { temporaryDeleteTarget };
