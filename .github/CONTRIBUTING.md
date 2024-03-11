<!--
    https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors
-->

# Welcome to GitHub docs contributing guide <!-- omit in toc -->

Thank you for investing your time in contributing to this project!

Before you get started, please review the following guidelines:
Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

In short the flow is very much like [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow):

- Open an issue or indicate that you want any of the open issues, so others know what you are working on.
- Fork the repository.
- Create a branch from `main` and make your changes.
  - In your changes, be sure to have a test that is covering the added functionality.
- Open a pull request towards upstream `main`.
  - Add any details using the PR template.
  - Link the PR to the issue you opened by adding "Fixes #<issue_number>" so that the issue gets associated and closed with the PR.
- Review your own PR first, when you are happy with it, mark it as "ready for review".
- Review and address comments on your pull request. We do not want to close PRs directly if we disagree on a specific approach.
  Lets discuss it instead. We are happy to help you with your changes if there are some difficult points in the code or framework.
- Once your pull request is approved, it will be merged and a new feature will be released immediately.

In rare occation we might create a release branch and do a release from that branch, but that is more for bigger changes.
These branches might also run with a prerelease tag, so that we can test the changes before we release it to the public.
