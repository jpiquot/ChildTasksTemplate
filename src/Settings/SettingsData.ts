import { IExtensionDataManager } from "azure-devops-extension-api";

/**
 * Settings are saved on Project level.
 */
export class SettingsData {
    /** Key that is used to store the child tasks template field. */
    public static readonly CHILD_TASKS_TEMPLATE = "fiveforty-child-tasks-template";

    private readonly projectId: string;
    private dataService: IExtensionDataManager;

    constructor(dataService: IExtensionDataManager, projectId: string) {
        this.dataService = dataService;
        this.projectId = projectId;
    }

    private async getValue(fieldName: string): Promise<string | null> {
        try {
            let value = await this.dataService.getValue(fieldName + "-" + this.projectId) as string;
            if (!value.startsWith("{"))
            {
                value = "{}"
            }
            return value;
        }
        catch
        {
            console.warn('Field value not found : ' + fieldName);
            return null;
        }
    }
    public async setChildTasksTemplate(value: string): Promise<string> {
        return this.dataService.setValue(
            SettingsData.CHILD_TASKS_TEMPLATE + "-" + this.projectId,
            value
        );
    }

    public async getChildTasksTemplate(): Promise<string | null> {
        return await this.getValue(SettingsData.CHILD_TASKS_TEMPLATE);
    }
}
