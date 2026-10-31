import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lint, readConfig } from 'markdownlint-cli2/markdownlint/promise';
import yamlParse from 'markdownlint-cli2/parsers/yaml';

/** Find authored Markdown without traversing dependency or Git metadata trees. */
function findMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return ['.git', 'node_modules'].includes(entry.name) ? [] : findMarkdownFiles(path);
    }
    return entry.isFile() && extname(entry.name).toLowerCase() === '.md' ? [path] : [];
  });
}

// Optional first argument selects an isolated root; the shared rules stay fixed.
const directory = resolve(process.argv[2] ?? process.cwd());
const configurationPath = fileURLToPath(new URL('../linters/.markdown-lint.yml', import.meta.url));
const configuration = await readConfig(configurationPath, [yamlParse]);
const files = findMarkdownFiles(directory);
if (files.length === 0) {
  throw new Error(`No Markdown files were checked in ${JSON.stringify(directory)}. Check the validation root.`);
}
for (const file of files) {
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
