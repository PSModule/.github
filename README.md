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

[shared-markdown-rules]: https://github.com/MSXOrg/docs/blob/36da9154aa55d2052345fb2f28b812b29daf8bc9/.github/linters/.markdown-lint.yml
