# Incremental scan validation checklist

Branch: `codex/incremental-scan-validation`  
Commit author: `ronyrayhan <ronyrayhan@users.noreply.github.com>`

Legend: `[x]` passed, `[~]` partial or behavior mismatch, `[ ]` not run.

## 1. Mode selection

- [x] No baseline runs full (`100bf3d3`; reason: `no_baseline`).
- [x] Small valid-baseline change runs incremental (`b783a8a5`).
- [x] Explicit full request with a baseline runs full (`f25ed0cc`; reason: `requested_full`).
- [x] Responses state the selected mode and fallback reason.

## 2. Full-scan fallbacks

- [x] First/no-baseline fallback: `no_baseline`.
- [~] Default threshold fallback could not be triggered: diagnostics set `max_changed_share=0.1`, `max_scope_share=0.4`, and `min_files_for_share=50`; a 13/13-file diff remained incremental because this repository is below the 50-file floor (`25a3cd78`).
- [x] Changed scan configuration (`min_tier`) falls back to full (`2b19c25e`; reason: `scan_config_changed`).
- [ ] Scanner/engine-version-change fallback cannot be simulated through this endpoint.
- [x] Unknown base SHA falls back safely to full (`4cf73e25`; reason: `base_unavailable`).

## 3. Rescan scope

- [x] Caller depth is two: one changed leaf rescanned itself plus `validation-chain-middle.js` and `validation-chain-entry.js` (`b783a8a5`).
- [x] Unrelated files were not rescanned in the small-change test; the CORS finding was carried forward instead.
- [x] The response lists every rescanned file and why.

## 4. Edge cases

- [~] Deleted-file finding returned in `resolved_findings` with the same fingerprint and status `fixed` (`51aefc3a`). The deleted test target had no callers, so deleted-code caller rescan was not exercised.
- [x] Renamed-file identity persisted: same fingerprint, `existing` status, no resolved/new pair (`ffe08a3c`).
- [ ] Multi-repository isolation is not testable through this one-repository endpoint.
- [~] `package.json` was identified as a changed manifest (`25a3cd78`), but SCA was not run because this is the code-review endpoint.

## 5. Merge and finding identity

- [x] Unrescanned CORS finding carried forward as `existing` in incremental scans.
- [x] Rename preserved the finding fingerprint.
- [~] Deletion uses status `fixed` inside `resolved_findings`, rather than literal status `resolved`.
- [~] A full → incremental → incremental → full chain was exercised across baseline and comparison scans, but not as one uninterrupted identical-baseline series.

## 6. Accuracy versus full scan

- [x] Incremental and full scans on the same commit produced the same finding fingerprint (`b783a8a5` vs `f25ed0cc`).
- [x] A changed leaf flowed into unchanged callers and those callers were rescanned.
- [x] No finding difference was observed in the same-commit comparison.

## 7. ZIP uploads

- [x] Skipped by request.

## 8. Bad input and access

- [x] Missing API key rejected with `401`.
- [~] Wrong API key rejected with `403`, not the expected `401`.
- [x] Malformed `previous_findings` rejected clearly with `422`.
- [x] Empty `previous_findings` completed as a zero-file incremental no-op (`b7ada979`).
