import {
    CommonServiceIds,
    IExtensionDataService,
    IProjectPageService,
} from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk"
import JSONEditor, { JSONEditorOptions } from "jsoneditor"
import { SettingsData } from "./SettingsData"
import schema from "./TemplateSchema.json"
import "jsoneditor/dist/jsoneditor.css"
import "./settings.scss"

class Program {
    public static initialized = false;
    public static settings: SettingsData
    private static editor: JSONEditor
    public static async run(): Promise<void> {
        SDK.init({
            applyTheme: true,
            loaded: false,
        })
        await SDK.ready()
        this.initSettings()
        SDK.notifyLoadSucceeded()
    }

    private static async initSettings(): Promise<void> {
        const extension: SDK.IExtensionContext = SDK.getExtensionContext()
        const projectService = await SDK.getService<IProjectPageService>(
            CommonServiceIds.ProjectPageService
        )
        const project = await projectService.getProject()
        if (project === undefined) {
            throw Error("No project defined.")
        }
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        )
        this.settings = new SettingsData(
            await dataService.getExtensionDataManager(
                extension.id,
                await SDK.getAccessToken()
            ),
            project.id
        )
        await this.initForm()
    }
    private static getTasksTemplateField(): HTMLElement {
        const tasksTemplateId = "tasks-template"
        const element = document.getElementById(tasksTemplateId)
        if (!element) {
            throw Error(
                "The tasks template editor element(id=" +
                tasksTemplateId +
                ") not found."
            )
        }
        return element
    }
    private static async initForm(): Promise<void> {
        const tasksTemplateField = Program.getTasksTemplateField()
        const tasksTemplateValue = await Program.settings.getChildTasksTemplateSetup()
        const options: JSONEditorOptions = {
            mode: "tree",
            modes: ["tree", "text"],
            schema: schema,
        }
        Program.editor = new JSONEditor(
            tasksTemplateField,
            options,
            tasksTemplateValue
        )

        const button = document.getElementById("child-tasks-template-button")
        if (button === null) {
            throw Error("The form element was not found.")
        }
        button.addEventListener("click", Program.saveEvent)
    }
    private static async saveEvent(e: Event): Promise<void> {
        e.preventDefault()
        if (Program.editor) {
            try {
                const value = Program.editor.get() as string
                await Program.settings.setChildTasksTemplate(value)
            } catch {
                throw Error("Error while saving json template.")
            }
        } else {
            throw Error("JSON Editor object not defined.")
        }
    }
}
if (Program.initialized) {
    console.error("The application is already initialized.")
} else {
    Program.run().then(() => {
        console.info("Extension initialized.")
    })
}
