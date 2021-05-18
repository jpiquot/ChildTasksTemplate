import { IExtensionDataManager } from "azure-devops-extension-api"
import { SettingsUpgrade } from "./SettingsUpgrade";
import { Template } from "./Template"
import { TemplateSetup } from "./TemplateSetup"

/**
 * Settings are saved on Project level.
 */
export class SettingsData {
    /** Key that is used to store the child tasks template field. */
    public static readonly CHILD_TASKS_TEMPLATE =
        "fiveforty-child-tasks-template";

    private readonly projectId: string
    private dataService: IExtensionDataManager

    constructor(dataService: IExtensionDataManager, projectId: string) {
        this.dataService = dataService
        this.projectId = projectId
    }

    private getValue(fieldName: string): Promise<any> {
        return this.dataService.getValue(fieldName + "-" + this.projectId)
    }
    public async setChildTasksTemplate(value: string): Promise<string> {
        return this.dataService.setValue(
            SettingsData.CHILD_TASKS_TEMPLATE + "-" + this.projectId,
            value
        )
    }

    public async getChildTasksTemplateSetup(): Promise<TemplateSetup | undefined> {
        return SettingsUpgrade.upgradeToCurrent(await this.getValue(SettingsData.CHILD_TASKS_TEMPLATE))
    }
    public async getTemplateNames(): Promise<string[]> {
        let names: string[] = []
        const setup = await this.getChildTasksTemplateSetup()
        if (!setup?.templates) {
            console.error("Templates have not been defined or the templates settings are incorrect.")
            return names
        }

        for (let i = 0; i < setup.templates.length; i++) {
            names.push(setup.templates[i].name)
        }
        return names
    }
    public async getTemplates(names: string[]): Promise<Template[]> {
        let templates: Template[] = []
        console.info("Getting templates :" + names)
        const setup = await this.getChildTasksTemplateSetup()
        if (!setup?.templates) {
            console.error("Templates have not been defined or the templates settings are incorrect.")
            return templates
        }

        for (let i = 0; i < setup.templates.length; i++) {
            const template = setup.templates[i]
            if (names.includes(template.name)) {
                templates.push(template)
            }
        }
        return templates
    }
}
