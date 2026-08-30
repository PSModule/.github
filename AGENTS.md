# AGENTS

Read the newest guidance in this order:

1. [README.md](README.md) — what this repository provides and how its defaults are enforced.
2. [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) — how a change is made and reviewed.
3. [`PSModule/Process-PSModule`](https://github.com/PSModule/Process-PSModule) — PSModule process and standards. Use a local clone at `~/.psmodule/process-psmodule`.
4. [`MSXOrg/docs`](https://github.com/MSXOrg/docs) — inherited MSX standards. Read `~/.msxorg/docs/src/docs/index.md`.

Context clones must be clean and synchronized with their remote default branch before use. Use Git commands only:

```sh
git clone <url> <clone>
git -C <clone> switch <default-branch>
git -C <clone> fetch origin --prune
git -C <clone> merge --ff-only origin/<default-branch>
git -C <clone> status --short
git -C <clone> rev-parse HEAD
git -C <clone> rev-parse origin/<default-branch>
git -C <clone> config --local user.name "<name>"
git -C <clone> config --local user.email "<email>"
```

Use the clone only when `status --short` is empty and both commit IDs match. Do not use a dirty, ahead, diverged, wrong-branch, or stale clone, and do not rely on global Git identity.
