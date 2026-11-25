# Seeded SAST findings

Generated: 2026-11-25T11:58:28.745Z

Total: 16

| ID | Category | CWE | File | Line | Description |
| --- | --- | --- | --- | ---: | --- |
| SAST-0001 | hardcoded-secret | CWE-798 | src/config.js | 4 | Embedded credential in source. |
| SAST-0002 | hardcoded-secret | CWE-798 | src/config.js | 6 | Embedded API token in source. |
| SAST-0003 | insecure-randomness | CWE-330 | src/crypto.js | 13 | Math.random is predictable for security tokens. |
| SAST-0004 | weak-crypto | CWE-327 | src/crypto.js | 17 | DES is obsolete and insecure. |
| SAST-0005 | command-injection | CWE-78 | src/dangerous.js | 8 | Request input is interpolated into a shell command. |
| SAST-0006 | ssrf | CWE-918 | src/dangerous.js | 13 | Caller controls an outbound request target. |
| SAST-0007 | code-injection | CWE-95 | src/dangerous.js | 18 | eval executes caller-controlled JavaScript. |
| SAST-0008 | prototype-pollution | CWE-1321 | src/dangerous.js | 23 | Untrusted keys are copied without filtering. |
| SAST-0009 | insecure-deserialization | CWE-502 | src/dangerous.js | 28 | Function constructor executes serialized content. |
| SAST-0010 | sql-injection | CWE-89 | src/data.js | 7 | Untrusted input is concatenated into SQL. |
| SAST-0011 | nosql-injection | CWE-943 | src/data.js | 12 | Request-controlled filter is passed to the query. |
| SAST-0012 | path-traversal | CWE-22 | src/data.js | 17 | User supplied filename controls filesystem path. |
| SAST-0013 | permissive-cors | CWE-942 | src/server.js | 15 | Any origin is allowed with credentials-like access. |
| SAST-0014 | reflected-xss | CWE-79 | src/server.js | 21 | Query data is written into HTML without encoding. |
| SAST-0015 | open-redirect | CWE-601 | src/server.js | 26 | Redirect destination comes directly from the request. |
| SAST-0016 | code-injection-route | CWE-95 | src/server.js | 32 | URL value flows to unsafe dynamic execution. |
