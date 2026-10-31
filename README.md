# PSModule community defaults

`PSModule/.github` is GitHub's special public organization-defaults repository.
GitHub uses its community files when a PSModule repository does not define its
own corresponding file.

## Validate changes

Use Git and the Node.js LTS version in `.node-version`, install the locked
tooling, and run the same validation command used by the PR check:

```powershell
npm ci --ignore-scripts
npm run validate
```

The local pre-commit hook invokes `npm run validate` too. After installing
the pre-commit runner, use `pre-commit install` to enable it in your checkout
and `pre-commit run --all-files` to check all files before committing.

`npm test` runs isolated valid and malformed Git fixtures. `npm run lint:markdown`
checks tracked `.md` and `.markdown` files and untracked files not ignored by Git,
including hidden community directories, with MSX's [shared Markdown rules][shared-markdown-rules].
Ignored editor history, dependency trees, and Git metadata do not affect the
scan. Deliberately tracked Markdown under an ignored directory is still checked;
`node_modules` stays excluded.

Both `.github/pull_request_template.md` and `.github/CONTRIBUTING.md` must be
present as regular, nonempty validation inputs. Missing or renamed required
files, Markdown symlinks, empty scans, blank files, lint findings, and tool
errors fail. Symlinks are rejected rather than followed, including Git symlinks
materialized as path-text files on Windows. An intentional deletion or rename
requires an explicit change to this contract, not a skipped check. An isolated
root passed to the helper must be a Git repository root with the same two-file contract.

The rule file is an unchanged snapshot of the linked merged revision. Refresh
it from its owning source rather than adding repository-specific rule overrides.
The check measures Markdown syntax/style, not PR-authoring completeness, source
correspondence, release decisions, or fallback propagation. Repositories with
local community files keep their own files.

Normal PR events targeting `main`, including drafts, run the named
`Community file validation` job against the actual head. GitHub does not start
`pull_request` workflows for PRs with merge conflicts; resolve the conflicts
and obtain a fresh current-head result before readiness. There is no path or
draft filter, manual-dispatch substitute, elevated trigger, write token, or
publisher. Making this result mandatory requires separately authorized branch governance to
require that exact check name and its GitHub Actions integration. Do not rename
the check independently of its protection rule.

[shared-markdown-rules]: https://github.com/MSXOrg/docs/blob/36da9154aa55d2052345fb2f28b812b29daf8bc9/.github/linters/.markdown-lint.yml
