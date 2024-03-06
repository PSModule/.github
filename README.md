# .github

[PowerShell Docs](https://learn.microsoft.com/en-us/powershell/)
[PowerShell: Scripting](https://learn.microsoft.com/en-us/powershell/scripting/how-to-use-docs)
[Powershell Team Blog](https://devblogs.microsoft.com/powershell/)

Inspiration to this page can come from

<https://github.com/Microsoft/.github>
<https://github.com/GitHub/.github>
<https://github.com/PowerShell/.github>
<https://github.com/Azure/.github>
<https://github.com/spotify/.github>
<https://github.com/sap/.github>
<https://github.com/actions/.github>
<https://github.com/PowerShell/whatsnew>

Shoud be built to support:
[PSResourceGet | GitHub](https://github.com/PowerShell/PSResourceGet)
[PSResourceGet | Microsoft Learn](https://learn.microsoft.com/en-us/powershell/module/powershellget/?view=powershellget-3.x)

[Top 50 modules](https://blog.ironmansoftware.com/50-of-the-top-powershell-modules-to-check-out/)

Define quality:
- <https://github.com/PowerShell/DscResources/blob/master/HighQualityModuleGuidelines.md#creating-a-high-quality-dsc-resource-module>

Module manifest:
- <https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_module_manifests?view=powershell-7.3>
- <https://learn.microsoft.com/en-us/powershell/scripting/developer/module/how-to-write-a-powershell-module-manifest?view=powershell-7.3>
- <https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/new-modulemanifest?view=powershell-7.3>
- <https://learn.microsoft.com/en-us/powershell/gallery/concepts/package-manifest-affecting-ui?view=powershellget-2.x#powershell-gallery-feature-elements-controlled-by-the-module-manifest>


Best practice:
  - Suppressing output
    - $null = <statement>
  - Array addition
    - `[System.Collections.Generic.List[object]]::new()` and then `$list.Add($item)`
    - `[System.Collections.ArrayList]::new()` and then `$list.Add($item)`
  - String addition
    - Use `-join` operator not `+=`
  - Processing large files
    ```powershell
        try {
            $stream = [System.IO.StreamReader]::new($path)
            while ($line = $stream.ReadLine()) {
                if ($line.Length -gt 10) {
                    $line
                }
            }
        } finally {
            $stream.Dispose()
        }
    ```
    Instead of `Get-Content $path | Where-Object { $_.Length -gt 10 }`
  - Looking up entries by property in large collections
    - Lookup using hash tables and keys to get items, instead of using where-object.
  - Avoid Write-Host
    - Use Write-Output instead, or Write-Verbose for pipeline logs.
  - Avoid repeated calls to a function
    - Move the loop into the function instead (call it only once).
  - Avoid calling functions that support append, with append.
    - Instead gather all things that must be set, and then call the function once to set them all.
  - Dont use `*` in `...ToExport` properties for a module manifest.
    - Instead use explicit names. Best approach is to use a build step to generate the list of functions, cmdlets, variables and aliases to export.
    - If nothing is defined, then the default should be to export an empty array (`@()`).
  - Avoid CDXML
    - Use other types of modules instead. In the order listed below:
      - Binary modules
      - Script/Manifest modules
      - CDXML modules
- [Security](https://learn.microsoft.com/en-us/powershell/scripting/dev-cross-plat/security/preventing-script-injection?view=powershell-7.3)
  - Preventing script injection attacks
    - Restruct the use of `Invoke-Expression`.
    - Use strongly typed parameters, and validate input. Think that all input can mask a command.
    - Wrap strings in single quotes, and use the `-f` operator to insert variables.
    - Use the EscapeSingleQuotedStringContent() method
  - Detecting vulnerable code with Injection Hunter


