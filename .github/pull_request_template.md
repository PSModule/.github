<!--
Follow MSX PR Format: https://msx.no/docs/Ways-of-Working/PR-Format/
Replace every placeholder and example reference, then delete this comment and
inapplicable sections, examples, supporting blocks, and release fields.
Keep classifier groups in the order shown; repeat a complete section for each
distinct result. Keep exactly one announcement marker after the leading summary.
The marker bounds announcement excerpts, not publication of the complete body.
Keep required upgrade instructions in this PR/release record, not repository
migration guides or changelogs; evergreen docs describe supported usage.
For internal-only work with no classified result, place one applicable supporting
block pair directly after the marker.
Inspect the effective target route before adding release decisions or labels.
If Release Management is not invoked, delete the whole release block and use no
release:* labels. For a managed no-release result, retain only Release and Labels.
Resolve DefaultBump from shared defaults, repository settings, and explicitly
supplied supported caller inputs, in that order; omitted caller inputs preserve
repository settings. One explicit bump label overrides the valid effective
default. Invalid settings and conflicting owned labels are errors, not fallbacks.
Use only release:patch, release:minor, release:major, release:prerelease, and
release:skip. Prerelease still needs a resolved bump; skip must be used alone.
Report Labels: None when valid effective settings supply the decision without
an override. Publication resolves final version, tag, source, and artifact
coordinates; do not predict them.
-->

{{ One or two short summary paragraphs that state what changes, why, who is
affected, and required adoption actions or an explicit no-action result. }}

<!-- ANNOUNCEMENT STOP -->

## Breaking: {{ Reader-facing result }}

{{ Explain what changes, why, affected supported uses, compatibility, and exact
adoption actions or an explicit no-action result. Include applicable
prerequisites, verification, ordering, and any required intermediate installation
or run. }}

{{ Interface or old-to-new example, comparison, or diagram after the prose when
needed to make adoption unambiguous. Keep required transition details in this
note; link to evergreen usage docs only for optional depth. Delete when prose
is sufficient. }}

<details>
<summary>Technical details</summary>

{{ Implementation and validation evidence, closing delivery-leaf plan progress,
and issue-convergence search scope and outcome for this result, even when no
additional issue converges. }}

| Changed surface | Standards checked | Framework docs checked | Result |
| --- | --- | --- | --- |
| `{{ Path or interface }}` | {{ Applicable standards }} | {{ Applicable framework docs, or `None (no framework-specific docs)` }} | {{ `Aligned`, `Fixed in this PR`, or `Exception - MSXOrg/repository#123` }} |

{{ For an applicable release-managed result, identify the consumer-change release
and source baseline and evidence supporting the actions or no-action result
above. For an affected integration template, identify its repository, verified
compatible immutable commit, and compatibility evidence. Publication resolves
actual release coordinates; do not predict a final version. Delete inapplicable
evidence. }}

</details>

<details>
<summary>Related references</summary>

- Resolves MSXOrg/repository#123
- References MSXOrg/repository#456
- Depends on MSXOrg/other-repository#789

</details>

## Removed: {{ Reader-facing result }}

{{ Explain what changes, why, affected supported uses, compatibility, and exact
adoption actions or an explicit no-action result. Include applicable
prerequisites, verification, ordering, and any required intermediate installation
or run. }}

{{ Interface or old-to-new example, comparison, or diagram after the prose when
needed to make adoption unambiguous. Keep required transition details in this
note; link to evergreen usage docs only for optional depth. Delete when prose
is sufficient. }}

<details>
<summary>Technical details</summary>

{{ Implementation and validation evidence, closing delivery-leaf plan progress,
and issue-convergence search scope and outcome for this result, even when no
additional issue converges. }}

| Changed surface | Standards checked | Framework docs checked | Result |
| --- | --- | --- | --- |
| `{{ Path or interface }}` | {{ Applicable standards }} | {{ Applicable framework docs, or `None (no framework-specific docs)` }} | {{ `Aligned`, `Fixed in this PR`, or `Exception - MSXOrg/repository#123` }} |

{{ For an applicable release-managed result, identify the consumer-change release
and source baseline and evidence supporting the actions or no-action result
above. For an affected integration template, identify its repository, verified
compatible immutable commit, and compatibility evidence. Publication resolves
actual release coordinates; do not predict a final version. Delete inapplicable
evidence. }}

</details>

<details>
<summary>Related references</summary>

- Resolves MSXOrg/repository#123
- References MSXOrg/repository#456
- Depends on MSXOrg/other-repository#789

</details>

## New: {{ Reader-facing result }}

{{ Explain what changes, why, affected supported uses, compatibility, and exact
adoption actions or an explicit no-action result. Include applicable
prerequisites, verification, ordering, and any required intermediate installation
or run. }}

{{ Interface or old-to-new example, comparison, or diagram after the prose when
needed to make adoption unambiguous. Keep required transition details in this
note; link to evergreen usage docs only for optional depth. Delete when prose
is sufficient. }}

<details>
<summary>Technical details</summary>

{{ Implementation and validation evidence, closing delivery-leaf plan progress,
and issue-convergence search scope and outcome for this result, even when no
additional issue converges. }}

| Changed surface | Standards checked | Framework docs checked | Result |
| --- | --- | --- | --- |
| `{{ Path or interface }}` | {{ Applicable standards }} | {{ Applicable framework docs, or `None (no framework-specific docs)` }} | {{ `Aligned`, `Fixed in this PR`, or `Exception - MSXOrg/repository#123` }} |

{{ For an applicable release-managed result, identify the consumer-change release
and source baseline and evidence supporting the actions or no-action result
above. For an affected integration template, identify its repository, verified
compatible immutable commit, and compatibility evidence. Publication resolves
actual release coordinates; do not predict a final version. Delete inapplicable
evidence. }}

</details>

<details>
<summary>Related references</summary>

- Resolves MSXOrg/repository#123
- References MSXOrg/repository#456
- Depends on MSXOrg/other-repository#789

</details>

## Changed: {{ Reader-facing result }}

{{ Explain what changes, why, affected supported uses, compatibility, and exact
adoption actions or an explicit no-action result. Include applicable
prerequisites, verification, ordering, and any required intermediate installation
or run. }}

{{ Interface or old-to-new example, comparison, or diagram after the prose when
needed to make adoption unambiguous. Keep required transition details in this
note; link to evergreen usage docs only for optional depth. Delete when prose
is sufficient. }}

<details>
<summary>Technical details</summary>

{{ Implementation and validation evidence, closing delivery-leaf plan progress,
and issue-convergence search scope and outcome for this result, even when no
additional issue converges. }}

| Changed surface | Standards checked | Framework docs checked | Result |
| --- | --- | --- | --- |
| `{{ Path or interface }}` | {{ Applicable standards }} | {{ Applicable framework docs, or `None (no framework-specific docs)` }} | {{ `Aligned`, `Fixed in this PR`, or `Exception - MSXOrg/repository#123` }} |

{{ For an applicable release-managed result, identify the consumer-change release
and source baseline and evidence supporting the actions or no-action result
above. For an affected integration template, identify its repository, verified
compatible immutable commit, and compatibility evidence. Publication resolves
actual release coordinates; do not predict a final version. Delete inapplicable
evidence. }}

</details>

<details>
<summary>Related references</summary>

- Resolves MSXOrg/repository#123
- References MSXOrg/repository#456
- Depends on MSXOrg/other-repository#789

</details>

## Fixed: {{ Reader-facing result }}

{{ Explain what changes, why, affected supported uses, compatibility, and exact
adoption actions or an explicit no-action result. Include applicable
prerequisites, verification, ordering, and any required intermediate installation
or run. }}

{{ Interface or old-to-new example, comparison, or diagram after the prose when
needed to make adoption unambiguous. Keep required transition details in this
note; link to evergreen usage docs only for optional depth. Delete when prose
is sufficient. }}

<details>
<summary>Technical details</summary>

{{ Implementation and validation evidence, closing delivery-leaf plan progress,
and issue-convergence search scope and outcome for this result, even when no
additional issue converges. }}

| Changed surface | Standards checked | Framework docs checked | Result |
| --- | --- | --- | --- |
| `{{ Path or interface }}` | {{ Applicable standards }} | {{ Applicable framework docs, or `None (no framework-specific docs)` }} | {{ `Aligned`, `Fixed in this PR`, or `Exception - MSXOrg/repository#123` }} |

{{ For an applicable release-managed result, identify the consumer-change release
and source baseline and evidence supporting the actions or no-action result
above. For an affected integration template, identify its repository, verified
compatible immutable commit, and compatibility evidence. Publication resolves
actual release coordinates; do not predict a final version. Delete inapplicable
evidence. }}

</details>

<details>
<summary>Related references</summary>

- Resolves MSXOrg/repository#123
- References MSXOrg/repository#456
- Depends on MSXOrg/other-repository#789

</details>

<details>
<summary>Release decisions</summary>

- **Release:** {{ Yes or No }} - {{ Evidence from the artifact, route, and
  supported consumer contract. }}
- **Version bump:** {{ Patch, Minor, or Major }} - {{ Compatibility evidence.
  Identify the explicit label, supported caller input, repository setting, or
  documented shared default that supplies it. Delete this field when Release
  is No. }}
- **Mode:** {{ Stable or Prerelease }} - {{ Target-route or override evidence.
  Identify configured release-candidate routing when applicable. Delete this
  field when Release is No. }}
- **Labels:** {{ Exact `release:*` labels, or `None` when effective configuration
  supplies the decision without an override label. }}

</details>
