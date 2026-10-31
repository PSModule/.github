import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/validate-markdown.mjs', import.meta.url));

/** Run the real validator against disposable, anonymous Markdown files. */
function validateFixture(context, files) {
  const directory = mkdtempSync(join(tmpdir(), 'community-markdown-'));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(files)) {
    const path = join(directory, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
  return spawnSync(process.execPath, [script, directory], { encoding: 'utf8' });
}

test('checks both inherited community paths and the repository README', (context) => {
  const result = validateFixture(context, {
    'README.md': '# Community defaults\n',
    '.github/CONTRIBUTING.md': '# Contributing\n\nFollow the shared workflow.\n',
    '.github/pull_request_template.md':
      '<!-- Describe the outcome. -->\n\n---\n\n<details>\n<summary>Technical details</summary>\n\nImplementation evidence.\n\n</details>\n',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 3 Markdown files; result: passed/);
  assert.match(result.stdout, /\.github[/\\]+CONTRIBUTING\.md/);
  assert.match(result.stdout, /\.github[/\\]+pull_request_template\.md/);
});

for (const name of ['.github/pull_request_template.md', '.github/CONTRIBUTING.md']) {
  test(`rejects malformed Markdown in ${name}`, (context) => {
    const result = validateFixture(context, {
      'README.md': '# Community defaults\n',
      [name]: '# Community file\n\n### Skipped heading level\n',
    });
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /MD001/);
    assert.match(result.stderr, /heading-increment/);
  });
}

test('rejects duplicate document titles', (context) => {
  const result = validateFixture(context, {
    '.github/CONTRIBUTING.md': '# Contributing\n\n# Another title\n',
  });
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /MD025/);
});

test('accepts source-shaped announcement and result-scoped blocks as Markdown', (context) => {
  const sections = ['Breaking', 'Removed', 'New', 'Changed', 'Fixed'].map((classifier) =>
    `## ${classifier}: Example result\n\nReaders inspect the affected setting and verify the documented result. No additional action applies to unaffected uses.\n\n<details>\n<summary>Technical details</summary>\n\nAnonymous validation evidence.\n\n</details>\n\n<details>\n<summary>Related references</summary>\n\nOptional supporting context.\n\n</details>\n`);
  const result = validateFixture(context, {
    '.github/pull_request_template.md':
      `Readers receive complete adoption instructions for the affected uses.\n\n<!-- ANNOUNCEMENT STOP -->\n\n${sections.join('\n')}`,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 1 Markdown files; result: passed/);
});

test('rejects a scan with no Markdown files', (context) => {
  const result = validateFixture(context, { 'unrelated.txt': 'Not Markdown.\n' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /No Markdown files were checked/);
  const path = result.stderr.match(/No Markdown files were checked in (".*")\. Check the validation root/);
  assert.ok(path, result.stderr);
  assert.equal(typeof JSON.parse(path[1]), 'string');
});

test('rejects blank inherited files even when other files are valid', (context) => {
  const result = validateFixture(context, {
    'README.md': '# Community defaults\n',
    '.github/CONTRIBUTING.md': ' \n\t\n',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Empty Markdown file/);
  assert.match(result.stderr, /CONTRIBUTING\.md/);
  const path = result.stderr.match(/Empty Markdown file: (".*")\. Restore its content/);
  assert.ok(path, result.stderr);
  assert.ok(JSON.parse(path[1]).endsWith('CONTRIBUTING.md'));
});

test('ignores dependency and Git metadata trees, not hidden community files', (context) => {
  const result = validateFixture(context, {
    '.github/CONTRIBUTING.md': '# Contributing\n',
    'node_modules/dependency/README.md': '# Dependency\n\n### Invalid heading\n',
    '.git/README.md': '# Git metadata\n\n### Invalid heading\n',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 1 Markdown files; result: passed/);
});

test('rejects a nonexistent root instead of reporting a successful scan', (context) => {
  const directory = mkdtempSync(join(tmpdir(), 'community-markdown-'));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const result = spawnSync(process.execPath, [script, join(directory, 'missing')], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /ENOENT|not a directory/);
});
