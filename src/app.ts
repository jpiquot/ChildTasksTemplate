import {
    CommonServiceIds,
    IExtensionDataService,
    IProjectInfo,
    IProjectPageService
} from "azure-devops-extension-api";


import * as SDK from "azure-devops-extension-sdk";
import { ChildTasksService } from "./ChildTasksService";
import { SettingsData } from "./Settings/SettingsData";

class program {
    private static project?: IProjectInfo;
    private static async getCurrentProject():Promise<IProjectInfo>
    {
        if (!program.project)
        {
            program.project = await (await SDK.getService<IProjectPageService>(
                CommonServiceIds.ProjectPageService
            )).getProject();
        }
        if (!program.project)
        {
            throw Error("Current project is undefined.")
        }
        return program.project;
    }
    public static async run() {
        SDK.init({
            applyTheme: true,
            loaded: false,
        });
        await SDK.ready();
        const extension: SDK.IExtensionContext = SDK.getExtensionContext();
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        );
        const settings = new SettingsData(await dataService.getExtensionDataManager(extension.id, await SDK.getAccessToken()), (await program.getCurrentProject()).id);
        const tasksTemplate = await settings.getChildTasksTemplate();
        if (tasksTemplate) {
            SDK.register('child-tasks-template-action', () =>
            {
                return {
                    execute: async (context: any):Promise<void> => {
                        await (new ChildTasksService()).execute(context);
                   }
                }
            });
        }
        await SDK.notifyLoadSucceeded();
    }
}

program.run();
