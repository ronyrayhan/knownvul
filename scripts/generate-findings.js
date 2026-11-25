'use strict';
// Validation branch marker: report generator behavior is unchanged.

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const sourceRoot = path.join(root, 'src');
const reportDir = path.join(root, 'reports');
const jsonPath = path.join(reportDir, 'sast-findings.json');
const markdownPath = path.join(reportDir, 'sast-findings.md');
const marker = /^\s*\/\/\s*SAST-VULN:\s*([^|]+)\|\s*([^|]+)\|\s*(.+)\s*$/;

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(file) : entry.name.endsWith('.js') ? [file] : [];
  });
}

const findings = sourceFiles(sourceRoot).flatMap((file) => {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  return lines.flatMap((line, index) => {
    const match = line.match(marker);
    if (!match) return [];
    const codeOffset = lines.slice(index + 1).findIndex((candidate) => candidate.trim() && !candidate.trim().startsWith('//'));
    if (codeOffset < 0) throw new Error(`No vulnerable statement after ${path.relative(root, file)}:${index + 1}`);
    return [{ category: match[1].trim(), cwe: match[2].trim(), description: match[3].trim(), file: path.relative(root, file).replaceAll('\\', '/'), line: index + codeOffset + 2 }];
  });
}).sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
  .map((finding, index) => ({ ...finding, id: `SAST-${String(index + 1).padStart(4, '0')}` }));

const report = { generatedAt: new Date().toISOString(), findingCount: findings.length, findings };
const json = JSON.stringify(report, null, 2) + '\n';
const markdown = ['# Seeded SAST findings', '', `Generated: ${report.generatedAt}`, '', `Total: ${report.findingCount}`, '', '| ID | Category | CWE | File | Line | Description |', '| --- | --- | --- | --- | ---: | --- |', ...findings.map((f) => `| ${f.id} | ${f.category} | ${f.cwe} | ${f.file} | ${f.line} | ${f.description} |`), ''].join('\n');

if (process.argv.includes('--check')) {
  if (!fs.existsSync(jsonPath) || !fs.existsSync(markdownPath)) throw new Error('Findings reports are missing; run npm run findings.');
  const existing = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const comparable = (value) => JSON.stringify({ findingCount: value.findingCount, findings: value.findings });
  if (comparable(existing) !== comparable(report)) throw new Error('Findings report is stale; run npm run findings.');
  console.log(`Verified ${findings.length} vulnerability locations.`);
} else {
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(jsonPath, json);
  fs.writeFileSync(markdownPath, markdown);
  console.log(`Logged ${findings.length} vulnerability locations to reports/.`);
}
