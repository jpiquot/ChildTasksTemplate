import {
  CommonServiceIds,
  IExtensionDataService,
  IProjectPageService,
} from "azure-devops-extension-api";
import * as SDK from "azure-devops-extension-sdk";
import { IExtensionContext } from "azure-devops-extension-sdk";
import { SettingsData } from "../settings/SettingsData";
class Program {
    public static initialized = false;
    public static settings: SettingsData;
    public static async run(): Promise<void> {
        SDK.init({
            applyTheme: true,
            loaded: false,
        });
        await SDK.ready();
        const project = await (
            await SDK.getService<IProjectPageService>(
                CommonServiceIds.ProjectPageService
            )
        ).getProject();

        if (project === undefined) {
            throw Error("No project defined.");
        }
        const extension: IExtensionContext = SDK.getExtensionContext();
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        );
        Program.settings = new SettingsData(
            await dataService.getExtensionDataManager(
                extension.id,
                await SDK.getAccessToken()
            ),
            project.id
        );
        let contributionId = SDK.getContributionId();
        SDK.register(contributionId, () => {
        return {
            execute: async (_: any): Promise<void> => {
                console.info("extension executed : " + SDK.getContributionId());
        },
      };
    });
        SDK.notifyLoadSucceeded();
    }
}
if (Program.initialized) {
  console.error("The choose dialog is already initialized.");
} else {
  Program.run().then(() => {
    console.info("Choose dialog initialized.");
  });
}
