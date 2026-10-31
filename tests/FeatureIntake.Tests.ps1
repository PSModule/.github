#Requires -Version 7.4
#Requires -Modules @{ ModuleName = 'Pester'; ModuleVersion = '6.1.0'; MaximumVersion = '6.*' }
#Requires -Modules @{ ModuleName = 'powershell-yaml'; ModuleVersion = '0.4.12' }

<#
    .SYNOPSIS
    Check the organization-owned feature intake contract.

    .DESCRIPTION
    Verify consumer prompts, GitHub issue-form structure, submission usability, and preserved routing.

    .EXAMPLE
    Invoke-Pester -Path .\tests\FeatureIntake.Tests.ps1 -Output Detailed -CI

    .LINK
    https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
#>
[Diagnostics.CodeAnalysis.SuppressMessageAttribute(
    'PSUseDeclaredVarsMoreThanAssignments', '',
    Justification = 'Pester setup variables are read in separate test blocks.'
)]
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

BeforeAll {
    $repositoryRoot = [System.IO.Path]::GetFullPath((Join-Path -Path $PSScriptRoot -ChildPath '..'))
    $formPath = Join-Path -Path $repositoryRoot -ChildPath '.github\ISSUE_TEMPLATE\10-feature.yml'
    $configPath = Join-Path -Path $repositoryRoot -ChildPath '.github\ISSUE_TEMPLATE\config.yml'
    $form = ConvertFrom-Yaml -Yaml ([System.IO.File]::ReadAllText($formPath))
    $configuration = ConvertFrom-Yaml -Yaml ([System.IO.File]::ReadAllText($configPath))
    $introduction = $form.body[0]
    $response = $form.body[1]
}

Describe 'Feature intake GitHub form structure' {
    It 'uses only the existing supported top-level keys' {
        $form | Should -BeOfType ([System.Collections.IDictionary])
        @($form.Keys) | Should -HaveCount 5
        @($form.Keys | Where-Object -FilterScript {
                $_ -notin @('name', 'description', 'title', 'labels', 'body')
            }) | Should -HaveCount 0
    }

    It 'provides nonempty strings for the template chooser and title' {
        foreach ($value in @($form.name, $form.description, $form.title)) {
            $value | Should -BeOfType ([string])
            [string]::IsNullOrWhiteSpace($value) | Should -BeFalse
        }
    }

    It 'keeps introductory Markdown followed by one textarea' {
        ($form.body -is [System.Collections.IList]) | Should -BeTrue
        $form.body | Should -HaveCount 2
        $introduction.type | Should -BeExactly 'markdown'
        $response.type | Should -BeExactly 'textarea'
    }

    It 'uses the documented Markdown element keys' {
        @($introduction.Keys | Sort-Object) | Should -Be @('attributes', 'type')
        @($introduction.attributes.Keys) | Should -Be @('value')
        $introduction.attributes.value | Should -BeOfType ([string])
        [string]::IsNullOrWhiteSpace($introduction.attributes.value) | Should -BeFalse
    }

    It 'uses the documented textarea element keys' {
        @($response.Keys | Sort-Object) | Should -Be @('attributes', 'id', 'type', 'validations')
        @($response.attributes.Keys | Where-Object -FilterScript {
                $_ -notin @('label', 'description', 'placeholder')
            }) | Should -HaveCount 0
        foreach ($value in @($response.attributes.label, $response.attributes.description)) {
            $value | Should -BeOfType ([string])
            [string]::IsNullOrWhiteSpace($value) | Should -BeFalse
        }
    }

    It 'keeps the existing valid and unique URL-prefill field ID' {
        $response.id | Should -BeExactly 'description'
        $response.id | Should -Match '^[a-zA-Z0-9_-]+$'
        @($form.body | Where-Object -FilterScript { $_.id }) | Should -HaveCount 1
    }

    It 'requires a real response without adding submission constraints' {
        @($response.validations.Keys) | Should -Be @('required')
        $response.validations.required | Should -BeOfType ([bool])
        $response.validations.required | Should -BeTrue
        $response.attributes.ContainsKey('value') | Should -BeFalse
        $response.attributes.ContainsKey('render') | Should -BeFalse
    }
}

Describe 'Feature intake preserved routing' {
    It 'preserves the feature template name' {
        $form.name | Should -BeExactly ([char]::ConvertFromUtf32(0x1F680) + ' [Feature]')
    }

    It 'preserves the feature template chooser description' {
        $form.description | Should -BeExactly 'Suggest/request a new feature'
    }

    It 'preserves the existing title prefix' {
        $form.title | Should -BeExactly ([char]::ConvertFromUtf32(0x1F680) + '[Feature]: ')
    }

    It 'preserves only the feature and triage labels in their existing order' {
        ($form.labels -is [System.Collections.IList]) | Should -BeTrue
        $form.labels | Should -Be @('feature', 'triage')
    }

    It 'does not assign an internal native type, assignee, or project to feedback' {
        foreach ($key in @('type', 'assignees', 'projects')) {
            $form.ContainsKey($key) | Should -BeFalse
        }
    }

    It 'leaves blank issue intake enabled' {
        @($configuration.Keys) | Should -Be @('blank_issues_enabled')
        $configuration.blank_issues_enabled | Should -BeOfType ([bool])
        $configuration.blank_issues_enabled | Should -BeTrue
    }
}

Describe 'Feature intake consumer expectations' -Tag 'ConsumerExpectations' {
    It 'labels the response as consumer need and expected behavior' {
        $response.attributes.label | Should -BeExactly 'Consumer need and expected behavior'
    }

    It 'asks what the contributor wants to do and who benefits' {
        ($response.attributes.description -split '\r?\n')[0] |
            Should -BeExactly 'What are you trying to do, and who would benefit?'
    }

    It 'asks why the need matters and what is difficult or missing' {
        ($response.attributes.description -split '\r?\n')[1] |
            Should -BeExactly 'Why does it matter, and what is difficult or missing today?'
    }

    It 'asks for expected behavior in a real situation' {
        ($response.attributes.description -split '\r?\n')[2] |
            Should -BeExactly 'In a real situation, what would you do and expect to happen?'
    }

    It 'offers optional ordinary-language starters instead of a prefilled answer' {
        $response.attributes.placeholder | Should -Not -BeNullOrEmpty
        ($response.attributes.placeholder.TrimEnd() -split '\r?\n') | Should -Be @(
            'I need to ...'
            'This matters because ...'
            'When I ..., I expect ...'
        )
    }

    It 'does not solicit implementation choices or prescribe Gherkin syntax' {
        (@(
            $introduction.attributes.value
            $response.attributes.description
            $response.attributes.placeholder
        ) -join ' ') |
            Should -Not -Match '\b(implement(?:ed|ation)?|architecture|Gherkin|Given|Then)\b'
        $response.attributes.description |
            Should -Not -Match 'Are there alternatives you.ve considered\?'
    }

    It 'invites the contributor to use their own words without a technical plan' {
        $introduction.attributes.value |
            Should -Match 'in your own words\.\s+No technical plan is needed\.'
    }

    It 'keeps feedback review and routing with maintainers' {
        $introduction.attributes.value |
            Should -Match 'Maintainers will review your feedback and decide how to route it\.'
    }

    It 'links the canonical MSX issue guidance' {
        $introduction.attributes.value | Should -Match '\[MSX issue guidance\]\[issues\]'
        $introduction.attributes.value |
            Should -Match '(?m)^\[issues\]: https://msx\.no/docs/Ways-of-Working/Issues/\r?$'
    }

    It 'links the canonical MSX planning guidance' {
        $introduction.attributes.value | Should -Match '\[planning guidance\]\[planning\]'
        $introduction.attributes.value |
            Should -Match '(?m)^\[planning\]: https://msx\.no/docs/Ways-of-Working/Issues/Process/Planning/\r?$'
    }
}
