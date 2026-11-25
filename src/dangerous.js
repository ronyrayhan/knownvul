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
  const result = Number(expression);
  if (!Number.isFinite(result)) throw new TypeError('A finite number is required.');
  return result;
}

function mergePreferences(target, incoming) {
  // SAST-VULN: prototype-pollution | CWE-1321 | Untrusted keys are copied without filtering.
  return Object.assign(target, incoming);
}

function parseSession(serialized) {
  return JSON.parse(serialized);
}

// TLS certificate verification is enabled by default.
const TLS_AGENT = new https.Agent();

module.exports = { runDiagnostics, loadWebhook, runExpression, mergePreferences, parseSession, TLS_AGENT };
