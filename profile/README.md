# <img src="https://github.com/PSModule/.github/raw/main/profile/ps_metro_black.png" alt="PowerShell" height="24"/> A GitHub based PowerShell module development framework

PSModule simplifies how to go from idea to having a module published with decent standards and practices.
This is done using a collection of GitHub Actions and PowerShell modules that build, test and publish PowerShell modules.
The framework sets standard when it comes to code structure and quality so that its easy to build automation around it to handles the tedious tasks, and as a developer you can focus on the code.

## Core practices

- **Everything as code**
- **Automate everything**
- **Simplify**
- **Optimize**
- **Streamline**

<!-- TODO: Diagram of the flow of the framework. -->
<!-- TODO: Add Compatability shields - [Compatability shields](https://learn.microsoft.com/en-us/powershell/gallery/concepts/publishing-guidelines?view=powershellget-3.x#tag-your-package-with-the-compatible-pseditions-and-platforms) -->

## GitHub Actions and Workflows

[PSModule on the GitHub Marketplace](https://github.com/marketplace?&verification=&query=publisher%3Apsmodule)

<table>
    <tr>
        <th width="10%">Name</th>
        <th width="80%">Description</th>
        <th width="10%">Version</th>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Auto-Release/">Auto&#8209;Release</a></td>
        <td>Handles release of a GitHub repo using PR based triggered Actions and labels in the PR.</td>
        <td><a href="https://github.com/PSModule/Auto-Release/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/Auto-Release?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a></td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Process-PSModule">Process&#8209;PSModule</a></td>
        <td>A GitHub workflow that is used as a template in PowerShell module repos to build, test and publish the module using the PSModule framework.</td>
        <td><a href="https://github.com/PSModule/Process-PSModule/releases/latest"><img src="https://img.shields.io/github/v/release/PSModule/Process-PSModule?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub Release"></a></td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Initialize-PSModule">Initialize&#8209;PSModule</a></td>
        <td>An action that is used to prepare the GitHub runner for the PSModule framework.</td>
        <td><a href="https://github.com/PSModule/Initialize-PSModule/releases/latest"><img src="https://img.shields.io/github/v/release/PSModule/Initialize-PSModule?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub Release"></a></td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Build-PSModule">Build&#8209;PSModule</a></td>
        <td>Build the project from different files and structures dynamically based on the defaults defined in the framework. The results of the build should be a module that runs and is ready to be published to PowerShell Gallery with documentation ready to be published on GitHub Pages.</td>
        <td><a href="https://github.com/PSModule/Build-PSModule/releases/latest"><img src="https://img.shields.io/github/v/release/PSModule/Build-PSModule?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub Release"></a></td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Test-PSModule">Test&#8209;PSModule</a></td>
        <td>Runs static code analysis and pester tests on source code or a built module. The tests are some framework specific tests and tests from within the module repo.</td>
        <td><a href="https://github.com/PSModule/Test-PSModule/releases/latest"><img src="https://img.shields.io/github/v/release/PSModule/Test-PSModule?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub Release"></a></td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Publish-PSModule">Publish&#8209;PSModule</a></td>
        <td>Calculates the version number, updates module files with version, create a repo release and finally publish module to PowerShell Gallery and documentation to GitHub Pages.</td>
        <td><a href="https://github.com/PSModule/Publish-PSModule/releases/latest"><img src="https://img.shields.io/github/v/release/PSModule/Publish-PSModule?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub Release"></a></td>
    </tr>
</table>

## Modules we deliver on PowerShell Gallery

<table>
    <tr>
        <th width="10%">Name</th>
        <th width="80%">Description</th>
        <th width="10%">Version</th>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Admin">Admin</a></td>
        <td>A PowerShell module working with the admin role.</td>
        <td>
            <a href="https://github.com/PSModule/Admin/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/Admin?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/Admin/"><img src="https://img.shields.io/powershellgallery/v/Admin?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/AzureDevOps">AzureDevOps</a></td>
        <td>A PowerShell module to interact with the Azure DevOps REST API.</td>
        <td>
            <a href="https://github.com/PSModule/AzureDevOps/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/AzureDevOps?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/AzureDevOps/"><img src="https://img.shields.io/powershellgallery/v/AzureDevOps?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/DynamicParams">DynamicParams</a></td>
        <td>A PowerShell module that makes it easier to use dynamic params.</td>
        <td>
            <a href="https://github.com/PSModule/DynamicParams/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/DynamicParams?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/DynamicParams/"><img src="https://img.shields.io/powershellgallery/v/DynamicParams?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Fonts">Fonts</a></td>
        <td>A PowerShell module for managing fonts.</td>
        <td>
            <a href="https://github.com/PSModule/Fonts/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/Fonts?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/Fonts/"><img src="https://img.shields.io/powershellgallery/v/Fonts?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/GitHub">GitHub</a></td>
        <td>A PowerShell module to interact with the GitHub API.</td>
        <td>
            <a href="https://github.com/PSModule/GitHub/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/GitHub?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/GitHub/"><img src="https://img.shields.io/powershellgallery/v/GitHub?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/GoogleFonts">GoogleFonts</a></td>
        <td>A PowerShell module to download and install fonts from GoogleFonts.</td>
        <td>
            <a href="https://github.com/PSModule/GoogleFonts/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/GoogleFonts?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/GoogleFonts/"><img src="https://img.shields.io/powershellgallery/v/GoogleFonts?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/NerdFonts">NerdFonts</a></td>
        <td>A PowerShell module to download and install fonts from NerdFonts.</td>
        <td>
            <a href="https://github.com/PSModule/NerdFonts/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/NerdFonts?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/NerdFonts/"><img src="https://img.shields.io/powershellgallery/v/NerdFonts?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/PATH">PATH</a></td>
        <td>A PowerShell module to manage the PATH environment variable on Windows.</td>
        <td>
            <a href="https://github.com/PSModule/PATH/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/PATH?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/PATH/"><img src="https://img.shields.io/powershellgallery/v/PATH?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/PowerShellGallery">PowerShellGallery</a></td>
        <td>A PowerShell module for interacting with the PowerShell Gallery.</td>
        <td>
            <a href="https://github.com/PSModule/PowerShellGallery/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/PowerShellGallery?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/PowerShellGallery/"><img src="https://img.shields.io/powershellgallery/v/PowerShellGallery?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/PSSemVer">PSSemVer</a></td>
        <td>A PowerShell module adding a SemVer compatible class and functions.</td>
        <td>
            <a href="https://github.com/PSModule/PSSemVer/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/PSSemVer?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/PSSemVer/"><img src="https://img.shields.io/powershellgallery/v/PSSemVer?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/PublicIP">PublicIP</a></td>
        <td>A PowerShell module that helps getting info about your public IP.</td>
        <td>
            <a href="https://github.com/PSModule/PublicIP/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/PublicIP?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/PublicIP/"><img src="https://img.shields.io/powershellgallery/v/PublicIP?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Store">Store</a></td>
        <td>A PowerShell module that manages a store of secrets and variables.</td>
        <td>
            <a href="https://github.com/PSModule/Store/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/Store?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/Store/"><img src="https://img.shields.io/powershellgallery/v/Store?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
    <tr>
        <td><a href="https://github.com/PSModule/Utilities">Utilities</a></td>
        <td>A PowerShell module with a collection of functions that should have been in PowerShell to start with.</td>
        <td>
            <a href="https://github.com/PSModule/Utilities/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/Utilities?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/Utilities/"><img src="https://img.shields.io/powershellgallery/v/Utilities?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
        <tr>
        <td><a href="https://github.com/PSModule/WoW">WoW</a></td>
        <td>A PowerShell module containing utilities for World of Warcraft.</td>
        <td>
            <a href="https://github.com/PSModule/WoW/releases/latest"><img src="https://img.shields.io/github/v/release/psmodule/WoW?style=flat-square&logo=github&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="GitHub release (with filter)"></a>
            <a href="https://www.powershellgallery.com/packages/WoW/"><img src="https://img.shields.io/powershellgallery/v/WoW?style=flat-square&logo=powershell&logoColor=a0a0a0&label=&labelColor=505050&color=blue" alt="PowerShell Gallery Version"></a>
        </td>
    </tr>
</table>

## Design decisions

### Repository

- A repository manages ONE module.
- A repository has releases that are in line with the version of the published package.
- The version of a repository follows semver 2.0.0 based on the changes to the module, and not the framework or any other external factor from the module.

### Repository structure

- The output folder = .\outputs on the root of the repo.
- The module that is build is stored under the output folder in a folder with the same name as the module.

The test and build process is based on the following repository structure. The [PSModule framework](https://github.com/PSModule) is expecting the modules to follow this structure as some of the
paths and calculations are based on this structure. Not following this might result in the build process not working as expected.

```tree
.
├─ .github/
│  └- workflows/
│     └- Process-PSModule.yml              # The workflow file based on [Process-PSModule](https://github.com/PSModule/Process-PSModule) template.
├─ .vscode/                                # The settings for the Visual Studio Code aligned with the PSModule framework formatting and linting practices.
├─ icon/
|  └- <icon>.png                           # Icon file automatically used in the module manifest file if nothing else is specified.
├─ outputs/                                # The output folder created during build. This is a temporary folder that should not be committed to the repository.
|  ├─ docs/                                # The output folder for the documentation.
|  |  └─ ModuleName/                       # The output folder for the module.
|  └─ modules/                             # The output folder for the module.
|     └─ ModuleName/                       # The output folder for the module.
├─ src/                                    # The source code for the module.
│  ├─ ModuleName/                          # The source code folder for the module. Kept like this for ease of testing. This folder can be loaded as a module.
│  │  ├─ assembly/                         # All .dll files are collected to RequiredAssemblies
│  │  │  └─ <dlls>                         # loaded during import via RequiredAssemblies
│  │  ├─ classes/                          # All .ps1 files are collected to ScriptsToProcess and loaded to the caller session (parent of module session)
│  │  │  ├─ <ClassName>.ps1                # loaded during import via ScritsToProcess
│  │  │  ├─ <ClassName>.Format.ps1xml      # loaded during import via FormatsToProcess (collected based on *.Formats.ps1xml files in the root of the folder)
│  │  │  └─ <ClassName>.Types.ps1xml       # loaded during import via TypesToProcess (collected based on *.Types.ps1xml files in the root of the folder)
│  │  ├─ data/                             # Loads .psd1 files into the module session.
│  │  ├─ en/
│  │  |  ├─ en-US/                         # Search here first for OS = en-US, then parent, en. Get-Help and platyPS reads this.
│  │  │  └─ about_<ComponentName>.help.txt
│  │  ├─ init/                             # All .ps1 files are added to the root module and can contain scripts that run during import before functions are loaded.
│  │  ├─ modules/                          # All .dll, psm1 and ps1 files are collected to NestedModules and loaded to the module session.
│  │  ├─ private/                          # All .ps1 files are added to the root module, but not exported to the caller session.
│  │  ├─ public/                           # All .ps1 files are added to the root module, and exported to the caller session.
|  |  ├─ resources/                        # All .psm1 files are collected to DscResourcesToExport and loaded to the module session.
│  │  ├─ scripts/                          # All .ps1 files are collected to ScriptsToProcess and loaded to the caller session (parent of module session)
|  |  ├─ <ScriptName>.ps1                  # All *.ps1 files are added to the root module last and can contain scripts that run during import after functions are loaded.
|  |  ├─ header.ps1                        # Added to the root module first. Typically for Pester supressions and [CmdletBinding()].
│  │  ├─ ModuleName.psd1                   # The module manifest file, if not present, it is generated.
│  │  └- ModuleName.psm1                   # The root module file, if not present, it is generated from the source files.
├─ tests/
│  └- ModuleName/
│     └- ModuleName.Tests.ps1
├─ .gitattributes
├─ .gitignore
├─ LICENSE                                 -> The license file for the module. Used in the module manifest file.
└─ README.md
```

### Modules

To be filled later.

### Manifest

- The `ModuleVersion` is generated from the `Publish-PSModule` function, based on available version and lables on PRs, not from the module manifest.
- The basis of the module manifest comes from the source manifest file.
- Values that are not defined in the module manifest file are generated from reading the module files and github repository properties.
- If no RootModule is defined in the manifest file, a file with the name of the folder is searched for with a compatible file extension.
- A new module manifest file is created every time to get a new GUID, so that the specific version of the module can be imported.

### Actions

- Use the composite action to load prerequisite modules. I.e., 'Utilities'.
- Run the main functionality from a `main.ps1` file located in a `scripts` folder.
- The action inputs are written in PascalCase and uses the natural language name of the input.
- Use envvironment variables to pass data between the composite action and the `main.ps1` file.
- Prefix the environment variable with `GITHUB_ACTION_INPUT_` followed by the name of the action input to avoid collision with other environment variables.
- Have a `readme.md` file in the action folder that explains the action and how to use it.
- Have a Action-Test workflow file that tests the action.
- Use the `Auto-Release` action for automating the release of the action via pull requeusts.
- Actions versions must be available as vX, vX.Y and vX.Y.Z tags, where they get the updates on their respective version.
  - vX automatically gets all the feature and patch updates until a breaking change is introduced.
  - vX.Y automatically gets all the patch updates until a new feature is introduced.
  - vX.Y.Z is locked to the exact version and will not get any updates.
- Older version of the action are not updates on their given track. i.e., if an older version of the action has bugs or a security issue,
  the fix will be implemented on the latest version and the user will have to update to the latest version to get the fix.

## Developer handbook

- [PowerShell Practices and Style](https://github.com/PoshCode/PowerShellPracticeAndStyle)
- [PowerShell Best Practices and Style Guide](https://poshcode.gitbooks.io/powershell-practice-and-style/content/)
- Code With Engineering Playbook
  - [Docs](https://microsoft.github.io/code-with-engineering-playbook/)
  - [GitHub repo](https://github.com/microsoft/code-with-engineering-playbook)

### Process

1. Question all requirements. Make sure the requirements are valid and necessary.
2. Remove things that should not be there. Delete the part or process, if things are not added back in, you are not deleting enough.
3. Simplify or optimize, most common error is to optimize something that should not exist.
4. Streamline and improve the cycle time.
5. Automate.

<!-- ## 📦 Module structure

```powershell
``` -->

## 🌈 Contribution guidelines

Feel free to submit issues, PRs what have you. Also feel free to use as you like; be that the functions or modules we maintain here.

## 👩‍💻 Credits

This project is not intented to be plagerising or stealing code from anyone without giving credit where credit is due. If any of these projects get recognition, it was achieved [by standing on the shoulders of giants].
Credit regarding pieces of the framework will be listed here, and the module specific credits will be added in the different module repos.
If you think you should be mentioned, create [an issue](https://github.com/PSModule/.github/issues).

### 🛟 PSGallery support

- cgadmin@microsoft.com
- https://github.com/PowerShell/PowerShellGallery/issues


## 🗂️ Powershell Resources

- [Awsome-Powershell](https://github.com/janikvonrotz/awesome-powershell)
- [PowerShell Module Browser | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/)
  - Azure PowerShell
    - Namespace: `Az` & `Az.*` namespace
    - [Docs | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/azure)
    - [PowerShell | GitHub](https://github.com/Azure/azure-powershell)
    - [CLI | GitHub](https://github.com/Azure/azure-cli)
  - Microsoft Graph PowerShell
    - Namespace: `Microsoft.Graph` & `Microsoft.Graph.*`
    - [Microsoft Docs](https://learn.microsoft.com/en-us/powershell/microsoftgraph)
    - [PowerShell | GitHub](https://github.com/microsoftgraph/msgraph-sdk-powershell)
    - [CLI | GitHub](https://github.com/microsoftgraph/msgraph-cli)
- [gaelcolas/Sampler | GitHub](https://github.com/gaelcolas/Sampler) - Inspiration on bits and pieces that should be included in a generic PowerShell module repo, and best practices to follow (even though not all are followed here).
- [FriedrichWeinmann | GitHub](https://github.com/FriedrichWeinmann)
- [PowershellFrameworkCollective | GitHub](https://github.com/PowershellFrameworkCollective)
- [PoshCode | GitHub](https://github.com/PoshCode)
- [PoshCode Actions | GitHub](https://github.com/PoshCode/Actions) - Did not know this existed untill i started making my own. Approaches are different however.
- [PoshCode ModuleBuilder | GitHub](https://github.com/PoshCode/ModuleBuilder)

## GitHub Pages Resources

- [GitHub Pages | GitHub Docs](https://docs.github.com/en/pages)
- [GitHub Pages | GitHub Help](https://help.github.com/en/github/working-with-github-pages)
- [GitHub Pages | GitHub Learning Lab](https://lab.github.com/githubtraining/github-pages)

Projects using GitHub Pages:

- [Code With Engineering Playbook](https://github.com/microsoft/code-with-engineering-playbook)

### Outdated resources
- [psake, A build automation tool written in PowerShell | GitHub](https://github.com/psake/psake)
- http://ramblingcookiemonster.github.io/
- https://github.com/RamblingCookieMonster/
