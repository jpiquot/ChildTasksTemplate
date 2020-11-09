# Child Tasks Template Azure DevOps extension

[![Build Status](https://dev.azure.com/fiveforty/DevOps/_apis/build/status/ChildTaskTemplate?branchName=master)](https://dev.azure.com/fiveforty/DevOps/_build/latest?definitionId=17&branchName=master)

This project generates an [Azure DevOps extension](https://docs.microsoft.com/en-us/azure/devops/extend/overview?view=vsts).

## Dependencies

The project depends on a few Azure DevOps packages:

- [azure-devops-extension-sdk](https://github.com/Microsoft/azure-devops-extension-sdk): Required module for Azure DevOps extensions which allows communication between the host page and the extension iframe.
- [azure-devops-extension-api](https://github.com/Microsoft/azure-devops-extension-api): Contains REST client libraries for the various Azure DevOps feature areas.

Some external dependencies:

- `TypeScript` - Samples are written in TypeScript and complied to JavaScript
- `webpack` - Is used to gather dependencies into a single javascript bundle for each sample.

## Building the project

Just run:

    npm run build

This produces a .vsix file which can be uploaded to the [Visual Studio Marketplace](https://marketplace.visualstudio.com/azuredevops)
