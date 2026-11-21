# Known-vulnerable Node.js SCA fixture

This repository is a non-production dependency-scanning fixture. It
intentionally contains old dependency versions in package-lock.json. It has no
HTTP listener, no credentials, no exploit payload, and must not be deployed.

## Expected SCA baseline

| Package | Pinned version | OSV advisory count checked 2026-11-21 | Vulnerability types |
|---|---:|---:|---|
| lodash | 4.17.20 | 4 | Regular-expression denial of service, command injection, code injection, prototype pollution. |
| minimist | 1.2.8 | 0 | Remediated: no OSV advisories found in the 2026-11-21 check. |

**Expected direct advisory baseline: exactly 4 OSV advisories.**

The precise GHSA IDs, CVE aliases, and vulnerability types are in
expected-sca-findings.json.

## SCA QA instructions

1. Scan the repository or upload it as an SCA ZIP fixture.
2. Confirm lodash 4.17.20 and minimist 1.2.8 are identified from package-lock.json.
3. Require the four IDs in expected-sca-findings.json. A scanner may report a
   CVE alias instead of its GHSA ID; treat aliases as the same finding.
4. If the total differs from four, compare package, version, and ID before
   recording a miss or extra finding. A feed may deduplicate related advisories.
5. Record finding sources, feed status, scan ID, and any miss.
