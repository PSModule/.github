# .github

This is the special `.github` repository for the [PSModule](https://github.com/PSModule)
organization. GitHub gives this repository organization-wide powers: content placed here
can apply to every repository in the organization, so it is far more than just a profile.

> [!IMPORTANT]
> This repository must stay **public**. The public organization profile and default
> community health files are not served from a private `.github` repository. Do not
> commit member-only or sensitive content here.

## What it can be used for

### Public organization profile

A `profile/README.md` is rendered on the organization's public **Overview** page and is
visible to everyone. Use it for an "About" section, links to key repositories, and
guidance on how to get involved.

**Read more:** [Customizing your organization's profile](https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/customizing-your-organizations-profile)

### Default community health files

Files here act as **organization-wide defaults**. Any repository in the organization that
does not provide its own copy inherits the version stored here, so these files can be
maintained in one place. Supported files include:

| File | Purpose |
| ---- | ------- |
| `CODE_OF_CONDUCT.md` | Standards for how to engage in the community |
| `CONTRIBUTING.md` | How people should contribute |
| `SECURITY.md` | How to report a security vulnerability |
| `SUPPORT.md` | Where to get help |
| `GOVERNANCE.md` | How the project is governed |
| `FUNDING.yml` | Sponsor button shown on repositories |
| `ISSUE_TEMPLATE/` + `config.yml` | Issue templates and the template chooser |
| `PULL_REQUEST_TEMPLATE` / `pull_request_template.md` | Pull request template |
| `DISCUSSION_TEMPLATE/` | Discussion category forms |

A repository's own file always wins; otherwise GitHub falls back to this repository,
looking in the `.github` folder, then the repository root, then `docs/`.
Repository-local files remain the enforceable PSModule surface for people, agents, and
automation; these defaults are a convenience, not a replacement. A repository that
defines any of its own issue templates overrides the default `ISSUE_TEMPLATE/` folder
entirely.

> [!NOTE]
> You cannot set a default `LICENSE` here — license files must live in each repository so
> they are included in clones, packages, and downloads. Any label referenced by a default
> issue template must also exist in the repositories where the template is used.

**Read more:** [Creating a default community health file](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)

### Organization workflow (starter) templates

A `workflow-templates/` folder lets you publish GitHub Actions starter workflows that
members can pick from the **Actions** tab when creating a new workflow. Each template is
a `<name>.yml` file plus a matching `<name>.properties.json` metadata file (and an
optional SVG icon). Use the `$default-branch` placeholder to reference a repository's
default branch.

**Read more:** [Creating workflow templates for your organization](https://docs.github.com/en/actions/sharing-automations/creating-workflow-templates-for-your-organization)

### GitHub Copilot customization

The `.github` folder is the conventional home for the files that tailor how GitHub
Copilot works **within this repository**:

- `.github/copilot-instructions.md` — repository-wide custom instructions.
- `.github/instructions/*.instructions.md` — path-specific instructions, scoped with an
  `applyTo` glob.
- `AGENTS.md` (or a root `CLAUDE.md` / `GEMINI.md`) — agent instructions read by AI
  coding agents.
- `.github/workflows/copilot-setup-steps.yml` — preinstalls tools and dependencies for
  the Copilot coding agent's environment.

These files are **repository-scoped**: they guide Copilot when it works on the profile,
community health files, and workflow templates kept here. To apply guidance across every
repository in the organization, set **organization custom instructions** in the
organization's settings instead.

**Read more:** [Repository custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) · [Organization custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-organization-instructions)

## Licensing

This repository is licensed under the [MIT License](LICENSE), except for
`.github/CODE_OF_CONDUCT.md`, which retains the Contributor Covenant's
[CC BY-SA 4.0 license](https://creativecommons.org/licenses/by-sa/4.0/).
