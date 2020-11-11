import { CommonServiceIds, IExtensionDataService, IProjectPageService } from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk"
import { SettingsData } from "./SettingsData"
import "./settings.css"

class Program {
    public static settings: SettingsData
    public static async run() {
        await SDK.init({
            applyTheme: true,
            loaded: false,
        })
        await SDK.ready()
        const extension: SDK.IExtensionContext = SDK.getExtensionContext()
        const projectService = await SDK.getService<IProjectPageService>(CommonServiceIds.ProjectPageService)
        const project = await projectService.getProject()
        if (project === undefined) {
            throw Error("No project defined.")
        }
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        )
        this.settings = new SettingsData(await dataService.getExtensionDataManager(extension.id, await SDK.getAccessToken()), project.id)
        this.initForm()
        SDK.notifyLoadSucceeded()
    }
    private static async getField(name: string): Promise<HTMLInputElement> {
        const field = document.querySelector('[name="' + name + '"]') as HTMLInputElement
        if (field === null) {
            throw Error("The form query field with name " + name + " was not found.")
        }
        return field
    }
    private static async getTasksTemplateField(): Promise<HTMLInputElement> {
        return await this.getField("tasks-template")
    }
    private static async initForm(): Promise<void> {
        const tasksTemplateField = await Program.getTasksTemplateField()
        const tasksTemplateValue = await Program.settings.getChildTasksTemplate()
        if (tasksTemplateValue === null) {
            tasksTemplateField.value = ""
        }
        else {
            tasksTemplateField.value = tasksTemplateValue
        }
        const button = document.getElementById('child-tasks-template-button')
        if (button === null) {
            throw Error("The form element was not found.")
        }
        button.addEventListener('click', async (e: Event): Promise<void> => {
            e.preventDefault()
            const templateField = await Program.getTasksTemplateField()
            await Program.settings.setChildTasksTemplate(templateField.value)
        })
    }
}


Program.run()
