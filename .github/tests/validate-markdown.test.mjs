import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, mkdirSync, readFileSync, renameSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import yamlParse from 'markdownlint-cli2/parsers/yaml';

const script = fileURLToPath(new URL('../scripts/validate-markdown.mjs', import.meta.url));
const gitignore = readFileSync(new URL('../../.gitignore', import.meta.url), 'utf8');
const communityFiles = {
  '.github/CONTRIBUTING.md': '# Contributing\n',
  '.github/pull_request_template.md': 'Describe the community outcome.\n',
};

/** Isolate fixture Git state without changing the real repository environment. */
function fixtureEnvironment(directory) {
  return {
    ...Object.fromEntries(Object.entries(process.env).filter(([name]) => !/^GIT_/i.test(name))),
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: join(directory, '.git', 'fixture-global-config'),
  };
}

/** Keep anonymous fixture Git operations isolated from personal hooks. */
function fixtureGit(directory, args, input) {
  const result = spawnSync('git', [
    '-c', `core.hooksPath=${join(directory, '.git', 'fixture-hooks')}`,
    '-C', directory, ...args,
  ], { encoding: 'utf8', input, env: fixtureEnvironment(directory) });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout;
}

/** Create a disposable Git root with the same authored-input contract. */
function createFixture(context, files) {
  const directory = mkdtempSync(join(tmpdir(), 'community-markdown-'));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  mkdirSync(join(directory, '.git'));
  writeFileSync(join(directory, '.git', 'fixture-global-config'), '');
  fixtureGit(directory, ['init', '--quiet', '--template=']);
  fixtureGit(directory, ['config', 'core.excludesfile', join(directory, '.git', 'fixture-excludes')]);
  for (const [name, content] of Object.entries({
    '.gitignore': gitignore,
    '.git/fixture-excludes': '',
    ...files,
  })) {
    const path = join(directory, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
  return directory;
}

/** Run the real validator against disposable, anonymous Markdown files. */
function runValidator(directory) {
  return spawnSync(process.execPath, [script, directory], {
    encoding: 'utf8',
    env: fixtureEnvironment(directory),
  });
}

/** Validate a disposable root using the same contract as repository CI. */
function validateFixture(context, files) {
  const directory = createFixture(context, files);
  return runValidator(directory);
}

test('checks both inherited community paths and the repository README', (context) => {
  const result = validateFixture(context, {
    ...communityFiles,
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
      ...communityFiles,
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
    ...communityFiles,
    '.github/CONTRIBUTING.md': '# Contributing\n\n# Another title\n',
  });
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /MD025/);
});

test('accepts source-shaped announcement and result-scoped blocks as Markdown', (context) => {
  const sections = ['Breaking', 'Removed', 'New', 'Changed', 'Fixed'].map((classifier) =>
    `## ${classifier}: Example result\n\nReaders inspect the affected setting and verify the documented result. No additional action applies to unaffected uses.\n\n<details>\n<summary>Technical details</summary>\n\nAnonymous validation evidence.\n\n</details>\n\n<details>\n<summary>Related references</summary>\n\nOptional supporting context.\n\n</details>\n`);
  const result = validateFixture(context, {
    ...communityFiles,
    '.github/pull_request_template.md':
      `Readers receive complete adoption instructions for the affected uses.\n\n<!-- ANNOUNCEMENT STOP -->\n\n${sections.join('\n')}`,
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 2 Markdown files; result: passed/);
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
    ...communityFiles,
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
    ...communityFiles,
    '.github/CONTRIBUTING.md': '# Contributing\n',
    'node_modules/dependency/README.md': '# Dependency\n\n### Invalid heading\n',
    '.git/README.md': '# Git metadata\n\n### Invalid heading\n',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 2 Markdown files; result: passed/);
});

test('ignores untracked editor history using the repository ignore rules', (context) => {
  const result = validateFixture(context, {
    ...communityFiles,
    '.history/README_old.md': '# Old snapshot\n\n### Invalid heading\n',
    '.idea/notes.md': '# Editor notes\n\n### Invalid heading\n',
    '.vscode/notes.md': '# Editor notes\n\n### Invalid heading\n',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 2 Markdown files; result: passed/);
});

test('still validates deliberately tracked Markdown under an ignored directory', (context) => {
  const directory = createFixture(context, {
    ...communityFiles,
    '.history/tracked.md': '# Authored Markdown\n\n### Invalid heading\n',
  });
  fixtureGit(directory, ['add', '--force', '--', '.history/tracked.md']);
  const result = runValidator(directory);
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /MD001/);
});

test('validates the .markdown extension instead of silently skipping it', (context) => {
  const result = validateFixture(context, {
    ...communityFiles,
    'README.markdown': '# Markdown document\n\n### Invalid heading\n',
  });
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /MD001/);
});

for (const name of Object.keys(communityFiles)) {
  test(`rejects missing required ${name} even when other Markdown remains`, (context) => {
    const files = { ...communityFiles, 'README.md': '# Community defaults\n' };
    delete files[name];
    const result = validateFixture(context, files);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Required community file/);
    assert.ok(result.stderr.includes(name.split('/').at(-1)));
  });
}

test('rejects Git symlink entries even when Windows materializes them as regular path text', (context) => {
  const directory = createFixture(context, {
    ...communityFiles,
    'guide.md': 'target.txt\n',
    'target.txt': '# Invalid target\n\n### Skipped heading level\n',
  });
  const object = fixtureGit(directory, ['hash-object', '-w', '--stdin'], 'target.txt\n').trim();
  fixtureGit(directory, ['update-index', '--add', '--cacheinfo', `120000,${object},guide.md`]);
  const result = runValidator(directory);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /symlink|symbolic link/i);
  assert.match(result.stderr, /guide\.md/);
});

test('rejects a non-Git root rather than silently changing the input contract', (context) => {
  const directory = mkdtempSync(join(tmpdir(), 'community-markdown-'));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(communityFiles)) {
    const path = join(directory, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
  const result = runValidator(directory);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Git file discovery failed/);
});

test('rejects a repository subdirectory instead of validating only a partial checkout', (context) => {
  const directory = createFixture(context, {
    ...communityFiles,
    'nested/.github/CONTRIBUTING.md': '# Nested contribution fixture\n',
    'nested/.github/pull_request_template.md': 'Nested template fixture.\n',
  });
  const result = runValidator(join(directory, 'nested'));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /repository root/);
});

test('rejects Markdown reached through a parent link outside the repository', (context) => {
  const directory = createFixture(context, communityFiles);
  fixtureGit(directory, ['add', '--', '.github']);
  const outside = mkdtempSync(join(tmpdir(), 'anonymous-outside-sources-'));
  context.after(() => rmSync(outside, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(communityFiles)) {
    writeFileSync(join(outside, name.split('/').at(-1)), content);
  }
  renameSync(join(directory, '.github'), join(directory, 'original-sources'));
  symlinkSync(outside, join(directory, '.github'), process.platform === 'win32' ? 'junction' : 'dir');
  const result = runValidator(directory);
  assert.notEqual(result.status, 0, result.stdout);
  assert.match(result.stderr, /outside the repository root/);
});

test('preserves Markdown parent aliases whose targets stay inside the repository', (context) => {
  const directory = createFixture(context, communityFiles);
  fixtureGit(directory, ['add', '--', '.github']);
  const target = join(directory, 'central-sources');
  renameSync(join(directory, '.github'), target);
  symlinkSync(target, join(directory, '.github'), process.platform === 'win32' ? 'junction' : 'dir');
  const result = runValidator(directory);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Checked 4 Markdown files; result: passed/);
});

test('fixture Git and validator subprocesses cannot use the caller index', (context) => {
  const caller = mkdtempSync(join(tmpdir(), 'anonymous-caller-'));
  context.after(() => rmSync(caller, { recursive: true, force: true }));
  const environment = {
    ...Object.fromEntries(Object.entries(process.env).filter(([name]) => !/^GIT_/i.test(name))),
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: join(caller, 'empty-global-config'),
  };
  writeFileSync(environment.GIT_CONFIG_GLOBAL, '');
  for (const args of [['init', '--quiet', '--template='], ['add', '--', 'sentinel.txt']]) {
    writeFileSync(join(caller, 'sentinel.txt'), 'Anonymous caller data.\n');
    const result = spawnSync('git', [
      '-c', `core.hooksPath=${join(caller, '.git', 'fixture-hooks')}`,
      '-C', caller, ...args,
    ], { encoding: 'utf8', env: environment });
    assert.equal(result.status, 0, result.stderr);
  }
  const index = join(caller, '.git', 'index');
  const originalIndex = readFileSync(index);
  const previousIndex = process.env.GIT_INDEX_FILE;
  try {
    process.env.GIT_INDEX_FILE = index;
    const directory = createFixture(context, { ...communityFiles, 'guide.md': 'target.txt\n' });
    const object = fixtureGit(directory, ['hash-object', '-w', '--stdin'], 'target.txt\n').trim();
    fixtureGit(directory, ['update-index', '--add', '--cacheinfo', `120000,${object},guide.md`]);
    const result = runValidator(directory);
    assert.deepEqual(readFileSync(index), originalIndex, 'Disposable fixtures must not change the caller index.');
    assert.equal(result.status, 1, result.stderr);
    assert.match(result.stderr, /symlink/i);
  } finally {
    if (previousIndex === undefined) {
      delete process.env.GIT_INDEX_FILE;
    } else {
      process.env.GIT_INDEX_FILE = previousIndex;
    }
  }
});

test('disposable Git initialization copies no user or default templates', (context) => {
  const template = mkdtempSync(join(tmpdir(), 'anonymous-git-template-'));
  context.after(() => rmSync(template, { recursive: true, force: true }));
  mkdirSync(join(template, 'info'));
  writeFileSync(join(template, 'info', 'exclude'), '*.md\n');
  const previousTemplate = process.env.GIT_TEMPLATE_DIR;
  try {
    process.env.GIT_TEMPLATE_DIR = template;
    const directory = createFixture(context, communityFiles);
    const result = runValidator(directory);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(existsSync(join(directory, '.git', 'info', 'exclude')), false);
    assert.match(result.stdout, /Checked 2 Markdown files; result: passed/);
  } finally {
    if (previousTemplate === undefined) {
      delete process.env.GIT_TEMPLATE_DIR;
    } else {
      process.env.GIT_TEMPLATE_DIR = previousTemplate;
    }
  }
});

test('rejects a nonexistent root instead of reporting a successful scan', (context) => {
  const directory = mkdtempSync(join(tmpdir(), 'community-markdown-'));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const result = runValidator(join(directory, 'missing'));
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /ENOENT|not a directory/);
});

for (const expectedHead of ['not-a-pr-head', '']) {
  test(`candidate identity rejects ${expectedHead ? 'mismatched' : 'absent'} PR head metadata`, () => {
    const workflow = yamlParse(readFileSync(
      new URL('../workflows/Validate-Community-Files.yml', import.meta.url), 'utf8'));
    const step = workflow.jobs.validate.steps.find((candidate) =>
      typeof candidate.run === 'string' && candidate.run.includes('git rev-parse HEAD'));
    assert.ok(step, 'The workflow must verify the checked-out candidate.');
    const result = spawnSync('pwsh', ['-NoProfile', '-NonInteractive', '-Command', step.run], {
      cwd: fileURLToPath(new URL('../../', import.meta.url)),
      encoding: 'utf8',
      env: { ...process.env, PR_HEAD_SHA: expectedHead },
    });
    assert.ifError(result.error);
    assert.notEqual(result.status, 0, result.stdout);
    assert.match(result.stderr, /Checked-out commit does not match the PR head/);
    assert.equal(step.env?.PR_HEAD_SHA, '${{ github.event.pull_request.head.sha }}');
  });
}
