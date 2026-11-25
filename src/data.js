'use strict';
// Large validation change marker.

const path = require('path');

function findUserByName(db, username) {
  // SAST-VULN: sql-injection | CWE-89 | Untrusted input is concatenated into SQL.
  return db.query("SELECT * FROM users WHERE username = '" + username + "'");
}

function findDocument(collection, filter) {
  // SAST-VULN: nosql-injection | CWE-943 | Request-controlled filter is passed to the query.
  return collection.find(filter);
}

function userUploadPath(uploadRoot, filename) {
  // SAST-VULN: path-traversal | CWE-22 | User supplied filename controls filesystem path.
  return path.join(uploadRoot, filename);
}

module.exports = { findUserByName, findDocument, userUploadPath };
