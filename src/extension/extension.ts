import {
    CommonServiceIds,
    IExtensionDataService,
    IHostPageLayoutService,
    IPanelOptions,
    IProjectPageService,
} from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk"
import { IExtensionContext } from "azure-devops-extension-sdk"
import { SettingsData } from "../settings/SettingsData"
import { ChildTasksService } from "./ChildTasksService"
import {IChooseTemplatePanelResult} from "../chooseTemplatePanel/ChooseTemplatePanel"
class Program {
    static settings: SettingsData
    static context: IExtensionContext
    static pageService: IHostPageLayoutService

    public static async run(): Promise<void> {
        SDK.init({
            applyTheme: true,
            loaded: false,
        })
        await SDK.ready()
        const project = await (
            await SDK.getService<IProjectPageService>(
                CommonServiceIds.ProjectPageService
            )
        ).getProject()

        if (project === undefined) {
            throw Error("No project defined.")
        }
        Program.context = SDK.getExtensionContext()
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        )
        Program.pageService = await SDK.getService<IHostPageLayoutService>(CommonServiceIds.HostPageLayoutService)

        Program.settings = new SettingsData(
            await dataService.getExtensionDataManager(
                Program.context.id,
                await SDK.getAccessToken()
            ),
            project.id
        )

        SDK.register(SDK.getContributionId(), () => {
            return {
                execute: async (context: any): Promise<void> => {
                    await Program.showDialog(context)
                },
            }
        })
        await SDK.notifyLoadSucceeded()
    }
    public static dialogContributionId(): string {
        return Program.context.id + ".child-tasks-template-choose"
    }
    public static async showDialog(context:any): Promise<void> {
        const options: IPanelOptions<IChooseTemplatePanelResult> = {
            title: "Choose templates to apply :",
            configuration: {
                panel: this,
                context: context,
            },
            onClose: Program.onClose
        }
        this.pageService.openPanel(this.dialogContributionId(), options)
    }
    private static onClose = async (result: IChooseTemplatePanelResult | undefined): Promise<void> => {
        if (result && result.names && result.names.length > 0) {
            await new ChildTasksService(await Program.settings.getTemplates(result.names)).execute(result.context)
        }
    }
}
Program.run()

