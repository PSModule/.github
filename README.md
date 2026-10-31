# PSModule community defaults

`PSModule/.github` is GitHub's special public organization-defaults repository.
GitHub uses its community files when a PSModule repository does not define its
own corresponding file.

Ordinary PSModule repositories inherit these defaults. Keep a local community
file only when repository-specific content is needed; inheritance does not
require module-local template or `CONTRIBUTING.md` copies.

## Validate central sources

This validator protects the current source files in `PSModule/.github` only.
Its remaining required contribution source is not an ordinary-repository baseline.
PR-template files are not required, generated, or distributed by validation;
their intentional absence is valid.

Use Git, PowerShell 7 (`pwsh`), and the Node.js LTS version in `.node-version`.
Install the locked tooling and run the same validation command used by the PR check:

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
Git-reported deletions of optional Markdown are excluded even before staging.
Deleting the required contribution source or every Markdown input still fails.

Fixture subprocesses discard inherited Git repository variables and use empty
global configuration with template copying disabled. This keeps a pre-commit
hook's real index and contributor configuration outside the disposable roots;
the subsequent real-repository lint retains its caller environment.

In this special defaults repository, `.github/CONTRIBUTING.md` remains a
required regular, nonempty source. Missing or renamed contribution sources,
Markdown symlinks, empty scans, blank files, lint findings, and tool errors fail.
Symlinks are rejected rather than followed, including Git links materialized as
path-text files on Windows. Isolated test roots contain ordinary authored
Markdown and the contribution source without copying a PR template.

Resolved Markdown inputs must stay inside this central repository. Parent
directory aliases to outside targets fail before their content is read.

The rule file is an unchanged snapshot of the linked merged revision. Refresh
it from its owning source rather than adding repository-specific rule overrides.
The check measures Markdown syntax/style, not PR-authoring completeness, source
correspondence, release decisions, or template distribution. Repositories with
local community files keep their own files.

Normal PR events targeting `main`, including drafts, run the named
`Community file validation` job against the actual head. The checkout must match
the PR-head metadata; absent or mismatched identity fails instead of accepting
a default checkout. GitHub does not start
`pull_request` workflows for PRs with merge conflicts; resolve the conflicts
and obtain a fresh current-head result before readiness. There is no path or
draft filter, manual-dispatch substitute, elevated trigger, write token, or
publisher. Making this result mandatory requires separately authorized branch governance to
require that exact check name and its GitHub Actions integration. Do not rename
the check independently of its protection rule.

[shared-markdown-rules]: https://github.com/MSXOrg/docs/blob/36da9154aa55d2052345fb2f28b812b29daf8bc9/.github/linters/.markdown-lint.yml
