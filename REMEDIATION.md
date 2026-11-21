# Critical-finding remediation

The prior SCA result reported two Critical entries for minimist 1.2.5:

1. CVE-2021-44906 / GHSA-xvch-5gv4-984h — prototype pollution. The report
   listed 1.2.6 as a fixed version.
2. A Socket-specific Critical alert with no published fixed version.

This change upgrades minimist from 1.2.5 to 1.2.8. An OSV version query on
2026-11-21 returned zero advisories for minimist 1.2.8, resolving the known
CVE finding.

The Socket alert cannot be declared fixed from the original report alone
because it listed no fixed version. Re-run the SCA scan after this commit and
compare the Socket result before closing that alert.
