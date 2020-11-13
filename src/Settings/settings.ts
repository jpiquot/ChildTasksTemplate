import { CommonServiceIds, IExtensionDataService, IProjectPageService } from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk"
import JSONEditor from "jsoneditor"
import { SettingsData } from "./SettingsData"
import "./settings.scss"

class Program {
    public static settings: SettingsData
    private static editor: JSONEditor
    public static async run() {
        SDK.init({
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
    private static getTasksTemplateField(): HTMLElement {
        const tasksTemplateId = "tasks-template";
        const element = document.getElementById(tasksTemplateId);
        if (!element)
        {
            throw Error("The tasks template editor element(id="+tasksTemplateId+") not found.");            
        }
        return element;
    }
    private static async initForm(): Promise<void> {
        const tasksTemplateField = await Program.getTasksTemplateField()
        const tasksTemplateValue = await Program.settings.getChildTasksTemplate()
        const options = {}
        Program.editor = new JSONEditor(tasksTemplateField, options)

        if (tasksTemplateValue === null) {
            Program.editor.set("")
        }
        else {
            Program.editor.set(tasksTemplateValue)
        }
        const button = document.getElementById('child-tasks-template-button')
        if (button === null) {
            throw Error("The form element was not found.")
        }
        button.addEventListener('click', async (e: Event): Promise<void> => {
            e.preventDefault()
            if (Program.editor)
            {
                await Program.settings.setChildTasksTemplate(Program.editor.get())
            }
            else
            {
                throw Error("JSON Editor object not defined.")
            }
        })
    }
}


Program.run()
