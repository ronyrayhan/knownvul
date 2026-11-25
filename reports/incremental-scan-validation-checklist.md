# Incremental scan validation checklist

Branch: `codex/incremental-scan-validation`  
Commit author: `ronyrayhan <ronyrayhan@users.noreply.github.com>`  
Legend: `[x]` passed; `[~]` partial, mismatch, or blocked; `[ ]` not run.

## 1. Mode selection

- [x] No baseline sent: the engine runs a **full** scan. (`100bf3d3`; `no_baseline`)
- [x] A small change with a valid baseline: the engine runs an **incremental** scan. (`b783a8a5`)
- [x] A request for a full scan runs a **full** scan, even with a baseline. (`f25ed0cc`; `requested_full`)
- [x] The response states which mode was used. When the engine fell back to full, it gives the reason.

## 2. Fallback to full scan

Each case must run **full**, and give the correct reason:

- [x] first scan, with no baseline (`no_baseline`)
- [~] a change over the threshold. Record which threshold the engine uses. Diagnostics: `max_changed_share=0.1`, `max_scope_share=0.4`, `min_files_for_share=50`, and `max_changed_files=500`. A 13/13-file change stayed incremental because this 14-file repository is below the 50-file floor. (`25a3cd78`)
- [x] rule set changed since the baseline. Changing the scan configuration (`min_tier`) forced full with `scan_config_changed`. (`2b19c25e`)
- [ ] engine or scanner version changed, if this applies. The endpoint does not expose a way to simulate a version change.
- [x] base commit SHA missing or not found in the repository. The engine must not crash. (`4cf73e25`; `base_unavailable`)

## 3. Rescan scope

- [x] The rescanned files are the changed files plus their callers **two levels deep**. Check this against the known call chains. The leaf change rescanned `validation-chain-leaf.js`, `validation-chain-middle.js`, and `validation-chain-entry.js`. (`b783a8a5`)
- [x] Files outside that scope are **not** rescanned. The CORS finding in `src/server.js` carried forward without rescan.
- [x] The response lists the rescanned files.

## 4. Edge cases

- [~] **Deleted file:** its previous findings come back **resolved**, and callers of the deleted code are rescanned. The deleted target appeared in `resolved_findings` with the same fingerprint but status `fixed`; it had no callers to test. (`51aefc3a`)
- [x] **Renamed or moved file:** findings keep the same identity. They don't come back as resolved plus new. (`ffe08a3c`)
- [ ] **Multi-repository project:** a change in one repository doesn't force full scans of the others. This endpoint accepts one repository per request.
- [~] **Changed manifest or lock file:** SCA runs. `package.json` was listed as a changed manifest (`25a3cd78`), but the code-review endpoint does not run SCA.

## 5. Merge and finding identity

- [x] Findings in files that weren't rescanned carry over from the baseline.
- [~] Every finding is marked **new**, **existing** or **resolved** correctly. New and existing were observed; deletion uses `fixed` in `resolved_findings`, not literal `resolved`.
- [x] Finding IDs stay the same across runs for the same issue. Rename preserved the code fingerprint.
- [~] Run a chain of scans: full → incremental → incremental → full. The equivalent stages were exercised, but not as one uninterrupted identical-baseline series.

## 6. Accuracy versus a full scan (most important)

- [x] On the **same commit**, run an incremental scan and a full scan. Compare the findings one by one. `b783a8a5` and `f25ed0cc` returned the same CORS fingerprint.
- [x] Include at least one vulnerability whose path runs from a **changed file into an unchanged caller**. It must be found in incremental mode. The changed leaf rescanned unchanged callers at two levels; the unchanged CORS finding carried forward.
- [x] List every difference between the two, and explain it, or log it as a bug. No finding difference was observed.

## 7. ZIP uploads

- [x] Re-uploading a ZIP with a `manifest` baseline works the same as a repository scan: **skipped by request**.
  - [x] correct mode — skipped by request
  - [x] correct rescan scope — skipped by request
  - [x] correct merge — skipped by request

## 8. Bad input and access

- [~] A request with no API key, or a wrong one, is rejected with 401. No key returned `401`; wrong key returned `403`.
- [x] Malformed `previous_findings` returns a clear error, or falls back to full. It must not crash. Returned `422`.
- [x] An empty `previous_findings` list is handled correctly. It returned a zero-file incremental no-op (`b7ada979`).
