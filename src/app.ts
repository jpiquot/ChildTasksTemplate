import {
    CommonServiceIds,
    IExtensionDataService,
    IProjectPageService
} from "azure-devops-extension-api";


import * as SDK from "azure-devops-extension-sdk";
import { ChildTasksService } from "./ChildTasksService";
import { SettingsData } from "./Settings/SettingsData";

class program {
    public static async run() {
        const project = await (await SDK.getService<IProjectPageService>(
            CommonServiceIds.ProjectPageService
        )).getProject();
        SDK.register('child-tasks-template-action', () =>
            {
                return {
                    execute: async (context: any) => {
                        if (project === undefined)
                        {
                            throw Error("Current project is undefined.")
                        }
                        const childTasksService = new ChildTasksService(project.id);
                        await childTasksService.execute(context);
                   }
                }
            })
        await SDK.init({
            applyTheme: true,
            loaded: false,
        });
        await SDK.ready();

        if (project === undefined) {
            throw Error("No project defined.");
        }
        const extension: SDK.IExtensionContext = SDK.getExtensionContext();
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        );
        const settings = new SettingsData(await dataService.getExtensionDataManager(extension.id, await SDK.getAccessToken()), project.id);
        const tasksTemplate = await settings.getChildTasksTemplate();
        if (!tasksTemplate) {
            // If the child tasks template is not defined, do not add the child tasks insert menu item.
            return;
        }
        SDK.notifyLoadSucceeded();
    }
}

program.run();
