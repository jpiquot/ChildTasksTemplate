import { IExtensionDataManager } from "azure-devops-extension-api";
import { ITasksTemplate } from "./TaskTemplate";

/**
 * Settings are saved on Project level.
 */
export class SettingsData {
  /** Key that is used to store the child tasks template field. */
  public static readonly CHILD_TASKS_TEMPLATE =
    "fiveforty-child-tasks-template";

  private readonly projectId: string;
  private dataService: IExtensionDataManager;

  constructor(dataService: IExtensionDataManager, projectId: string) {
    this.dataService = dataService;
    this.projectId = projectId;
  }

  private getValue(fieldName: string): Promise<any> {
    return this.dataService.getValue(fieldName + "-" + this.projectId);
  }
  public async setChildTasksTemplate(value: string): Promise<string> {
    return this.dataService.setValue(
      SettingsData.CHILD_TASKS_TEMPLATE + "-" + this.projectId,
      value
    );
  }

  public async getChildTasksTemplate(): Promise<ITasksTemplate | null> {
    return (await this.getValue(SettingsData.CHILD_TASKS_TEMPLATE)) as ITasksTemplate;
  }
}
