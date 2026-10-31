import { spawnSync } from 'node:child_process';
import { lstatSync, readFileSync, realpathSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lint, readConfig } from 'markdownlint-cli2/markdownlint/promise';
import yamlParse from 'markdownlint-cli2/parsers/yaml';

/** Read repository file metadata without invoking a shell. */
function readGitOutput(directory, args) {
  const result = spawnSync('git', ['-C', directory, ...args], { encoding: 'utf8' });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Git file discovery failed in ${JSON.stringify(directory)}: ${JSON.stringify(result.stderr.trim())}`);
  }
  return result.stdout;
}

/** Select tracked and nonignored Markdown, retaining Git symlink metadata. */
function findMarkdownFiles(directory) {
  const files = readGitOutput(directory, [
    'ls-files', '--cached', '--others', '--exclude-standard', '--deduplicate', '-z',
  ]).split('\0')
    .filter((name) => /\.(?:md|markdown)$/i.test(name) && !name.split('/').includes('node_modules'))
    .map((name) => join(directory, ...name.split('/')))
    .sort();
  // Git symlinks can be ordinary path-text files in Windows checkouts.
  const symlinks = new Set(readGitOutput(directory, ['ls-files', '--stage', '-z'])
    .split('\0')
    .filter((record) => record.startsWith('120000 '))
    .map((record) => join(directory, ...record.slice(record.indexOf('\t') + 1).split('/'))));
  return { files, symlinks };
}

// Optional first argument selects an isolated root; the shared rules stay fixed.
const directory = resolve(process.argv[2] ?? process.cwd());
if (!lstatSync(directory).isDirectory()) {
  throw new Error(`Validation root is not a directory: ${JSON.stringify(directory)}`);
}
const repositoryRoot = readGitOutput(directory, ['rev-parse', '--show-toplevel']).replace(/\r?\n$/, '');
const resolvedRepositoryRoot = realpathSync(directory);
if (resolvedRepositoryRoot !== realpathSync(repositoryRoot)) {
  throw new Error(`Validation must run from the repository root: ${JSON.stringify(repositoryRoot)}`);
}
const configurationPath = fileURLToPath(new URL('../linters/.markdown-lint.yml', import.meta.url));
const configuration = await readConfig(configurationPath, [yamlParse]);
const { files, symlinks } = findMarkdownFiles(directory);
if (files.length === 0) {
  throw new Error(`No Markdown files were checked in ${JSON.stringify(directory)}. Check the validation root.`);
}
for (const name of ['pull_request_template.md', 'CONTRIBUTING.md']) {
  const file = join(directory, '.github', name);
  if (!files.includes(file)) {
    throw new Error(`Required community file is missing from the validation input: ${JSON.stringify(file)}. Restore the file or explicitly change the contract.`);
  }
}
for (const file of files) {
  const metadata = lstatSync(file);
  if (metadata.isSymbolicLink() || symlinks.has(file)) {
    throw new Error(`Markdown symlinks are not allowed: ${JSON.stringify(file)}. Use a regular file instead.`);
  }
  if (!metadata.isFile()) {
    throw new Error(`Markdown input must be a regular file: ${JSON.stringify(file)}`);
  }
  const resolvedLocation = relative(resolvedRepositoryRoot, realpathSync(file));
  if (resolvedLocation === '..' || resolvedLocation.startsWith(`..${sep}`) || isAbsolute(resolvedLocation)) {
    throw new Error(`Markdown input resolves outside the repository root: ${JSON.stringify(file)}. Use a repository-local source.`);
  }
  if (readFileSync(file, 'utf8').trim().length === 0) {
    throw new Error(`Empty Markdown file: ${JSON.stringify(file)}. Restore its content before validation.`);
  }
}

const results = await lint({ files, config: configuration });
const checkedFiles = Object.keys(results);
if (checkedFiles.length !== files.length) {
  throw new Error(`Markdown lint checked ${checkedFiles.length} of ${files.length} selected files.`);
}
for (const file of checkedFiles) {
  console.log(JSON.stringify(relative(directory, file)));
}
const hasErrors = Object.values(results).some((errors) => errors.length > 0);
if (hasErrors) {
  console.error(JSON.stringify(results, null, 2));
}
console.log(`Checked ${checkedFiles.length} Markdown files; result: ${hasErrors ? 'failed' : 'passed'}.`);
process.exitCode = hasErrors ? 1 : 0;
