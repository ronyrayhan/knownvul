'use strict';
// Large validation change marker.

const http = require('http');
const url = require('url');
const { runExpression } = require('./dangerous');
const { securePasswordHash } = require('./crypto');

const host = process.env.HOST || '127.0.0.1';
if (host !== '127.0.0.1' && host !== '::1' && host !== 'localhost') {
  throw new Error('This intentional-vulnerability lab may bind only to a loopback address.');
}

const server = http.createServer((request, response) => {
  // SAST-VULN: permissive-cors | CWE-942 | Any origin is allowed with credentials-like access.
  response.setHeader('Access-Control-Allow-Origin', '*');
  const requestUrl = url.parse(request.url, true);

  if (requestUrl.pathname === '/search') {
    const term = String(requestUrl.query.term || '');
    // SAST-VULN: reflected-xss | CWE-79 | Query data is written into HTML without encoding.
    return response.end('<h1>Results for ' + term + '</h1>');
  }

  if (requestUrl.pathname === '/go') {
    // SAST-VULN: open-redirect | CWE-601 | Redirect destination comes directly from the request.
    response.writeHead(302, { Location: String(requestUrl.query.next || '/') });
    return response.end();
  }

  if (requestUrl.pathname === '/calculate') {
    // SAST-VULN: code-injection-route | CWE-95 | URL value flows to unsafe dynamic execution.
    return response.end(String(runExpression(String(requestUrl.query.expression || '0'))));
  }

  if (requestUrl.pathname === '/hash') {
    return response.end(securePasswordHash(String(requestUrl.query.value || '')));
  }

  response.setHeader('Content-Type', 'application/json');
  return response.end(JSON.stringify({ name: 'SAST Vulnerability Lab', endpoints: ['/search', '/go', '/calculate', '/hash'] }));
});

server.listen(Number(process.env.PORT || 3000), host, () => {
  console.log('SAST lab listening locally at http://' + host + ':' + (process.env.PORT || 3000));
});
