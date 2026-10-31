# PSModule community defaults

`PSModule/.github` is GitHub's special public organization-defaults repository.
GitHub uses its community files when a PSModule repository does not define its
own corresponding file.

## Validate changes

Use the Node.js LTS version in `.node-version`, install the locked tooling, and
run the same validation command used by the PR check:

```powershell
npm ci --ignore-scripts
npm run validate
```

The local pre-commit hook invokes `npm run validate` too. After installing
the pre-commit runner, use `pre-commit install` to enable it in your checkout
and `pre-commit run --all-files` to check all files before committing.

`npm test` runs isolated valid and malformed fixtures. `npm run lint:markdown`
checks every authored Markdown file, including hidden community directories,
with MSX's [shared Markdown rules][shared-markdown-rules]. Empty scans, blank
files, lint findings, and tool errors fail. Dependency and Git metadata trees
are excluded.

The rule file is an unchanged snapshot of the linked merged revision. Refresh
it from its owning source rather than adding repository-specific rule overrides.
The check measures Markdown syntax/style, not PR-authoring completeness, source
correspondence, release decisions, or fallback propagation. Repositories with
local community files keep their own files.

Every PR targeting `main`, including drafts, runs the named
`Community file validation` job against its actual head. There is no path or
draft filter, manual-dispatch substitute, write token, or publisher. Making
this result mandatory requires separately authorized branch governance to
require that exact check name and its GitHub Actions integration. Do not rename
the check independently of its protection rule.

[shared-markdown-rules]: https://github.com/MSXOrg/docs/blob/36da9154aa55d2052345fb2f28b812b29daf8bc9/.github/linters/.markdown-lint.yml
