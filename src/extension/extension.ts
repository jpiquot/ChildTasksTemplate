import {
  CommonServiceIds,
  IExtensionDataService,
  IHostPageLayoutService,
  IProjectPageService,
} from "azure-devops-extension-api";
import * as SDK from "azure-devops-extension-sdk";
import { IExtensionContext } from "azure-devops-extension-sdk";
import { ChooseTemplateDialog } from "../choose/ChooseTemplateDialog";
import { SettingsData } from "../settings/SettingsData";
import { ChildTasksService } from "./ChildTasksService";

class Program {
  static settings: SettingsData;
  static context: IExtensionContext;
  static pageService: IHostPageLayoutService;

  public static async run() : Promise<void> {
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
    Program.context = SDK.getExtensionContext();
    const dataService = await SDK.getService<IExtensionDataService>(
      CommonServiceIds.ExtensionDataService
    );
    Program.pageService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService);

    Program.settings = new SettingsData(
      await dataService.getExtensionDataManager(
        Program.context.id,
        await SDK.getAccessToken()
      ),
      project.id
    );

    SDK.register(SDK.getContributionId(), () => {
      return {
        execute: async (context: any): Promise<void> => {
          const dialog = new ChooseTemplateDialog(Program.settings, Program.context, Program.pageService);
          await dialog.showDialog();
          await new ChildTasksService(await dialog.getTemplates()).execute(context);
        },
      };
    });
    await SDK.notifyLoadSucceeded();
  }
}

Program.run();

