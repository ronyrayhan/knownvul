'use strict';

const childProcess = require('child_process');
const https = require('https');

function runDiagnostics(host, done) {
  // SAST-VULN: command-injection | CWE-78 | Request input is interpolated into a shell command.
  return childProcess.exec('ping -n 1 ' + host, done);
}

function loadWebhook(url, callback) {
  // SAST-VULN: ssrf | CWE-918 | Caller controls an outbound request target.
  return https.get(url, callback);
}

function runExpression(expression) {
  // SAST-VULN: code-injection | CWE-95 | eval executes caller-controlled JavaScript.
  return eval(expression); // eslint-disable-line no-eval
}

function mergePreferences(target, incoming) {
  // SAST-VULN: prototype-pollution | CWE-1321 | Untrusted keys are copied without filtering.
  return Object.assign(target, incoming);
}

function parseSession(serialized) {
  // SAST-VULN: insecure-deserialization | CWE-502 | Function constructor executes serialized content.
  return new Function('return (' + serialized + ')')();
}

// SAST-VULN: tls-verification-disabled | CWE-295 | Certificate verification is disabled.
const INSECURE_TLS_AGENT = new https.Agent({ rejectUnauthorized: false });

module.exports = { runDiagnostics, loadWebhook, runExpression, mergePreferences, parseSession, INSECURE_TLS_AGENT };
