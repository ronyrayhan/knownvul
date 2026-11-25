'use strict';

function temporaryRenameTarget(value) {
  // SAST-VULN: validation-rename-code-injection | CWE-95 | Temporary test finding for rename identity.
  return eval(value); // eslint-disable-line no-eval
}

module.exports = { temporaryRenameTarget };
