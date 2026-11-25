# SAST Vulnerability Lab

Validation branch marker: used only for incremental scan scope testing.

An intentionally vulnerable, **localhost-only** Node.js application for validating static application security testing rules. It is not designed for deployment or exposure to a network.

## Coverage

The lab seeds examples of hard-coded secrets, SQL/NoSQL/OS command injection, cross-site scripting, path traversal, SSRF, insecure deserialization, unsafe dynamic execution, weak cryptography, insecure randomness, open redirects, prototype pollution, disabled TLS verification, and overly permissive CORS.

Every deliberately vulnerable line has a `SAST-VULN:` annotation. The findings generator treats those annotations as the source of truth and writes an exact file-and-line inventory.

## Run

```powershell
npm run findings
npm start
```

The server refuses non-loopback bind addresses and listens on `127.0.0.1:3000` by default. Do not place it behind a proxy or publish it.

## Verify the inventory

```powershell
npm run verify:findings
```

This fails if `reports/sast-findings.json` and `reports/sast-findings.md` do not exactly match the annotated vulnerable source lines. Re-run `npm run findings` whenever a seeded finding moves.
