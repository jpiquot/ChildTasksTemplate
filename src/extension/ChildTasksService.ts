import {
  WorkItem,
  WorkItemTrackingRestClient,
} from "azure-devops-extension-api/WorkItemTracking";
import pupa from "pupa";

import { getClient } from "azure-devops-extension-api";
import {
  JsonPatchDocument,
  JsonPatchOperation,
  Operation,
} from "azure-devops-extension-api/WebApi";
import { SettingsData } from "src/settings/SettingsData";
import {
  IFieldTemplate,
  ITaskTemplate,
} from "src/settings/TaskTemplate";

class ChildTasksService {
  private workClient?: WorkItemTrackingRestClient;
  settings: SettingsData;

  constructor(settings: SettingsData) {
    this.settings = settings;
  }
  private async getWorkClient(): Promise<WorkItemTrackingRestClient> {
    if (!this.workClient) {
      this.workClient = getClient<WorkItemTrackingRestClient>(
        WorkItemTrackingRestClient
      );
    }
    return this.workClient;
  }
  private newFieldOperation(field: string, value: any): JsonPatchOperation {
    return {
      from: null as any,
      op: Operation.Add,
      path: "/fields/" + field,
      value: value,
    };
  }
  private newParentRelation(parent: WorkItem): JsonPatchOperation {
    return {
      from: null as any,
      op: Operation.Add,
      path: "/relations/-",
      value: {
        rel: "System.LinkTypes.Hierarchy-Reverse",
        url: parent.url,
      },
    };
  }
  public async execute(context: any): Promise<void> {
    const client = await this.getWorkClient();
    const parent = await client.getWorkItem(context.workItemId);
    const template = await this.settings.getChildTasksTemplate();

    if (!template) {
      console.warn("Template is undefined or has an incorrect format.");
      return;
    }
    if (context.workItemAvailable) {
      for (let i = 0; i < template.tasks.length; i++) {
        const patch = new Array<JsonPatchOperation>();
        patch.push(this.newParentRelation(parent));
        const task = template.tasks[i] as ITaskTemplate;
        if (!task) {
          continue;
        }
        for (let j = 0; j < task.fields.length; j++) {
          const field = task.fields[j] as IFieldTemplate;
          if (!field) {
            continue;
          }
          patch.push(
            this.newFieldOperation(
              field.name,
              ChildTasksService.interpolate(field.value, parent)
            )
          );
        }

        const workItem = await client.createWorkItem(
          patch as JsonPatchDocument,
          context.currentProjectGuid,
          "Task"
        );
        console.info("Created task " + workItem.id);
      }
    }
  }
  private static interpolate(text: string | null | undefined, parent: WorkItem): string | null {
    if (!text)
    {
      return null;
      }
    let obj = {};
    const keys = Object.keys(parent.fields);
    for (const key of keys) {
      ChildTasksService.setFieldValue(obj, key, parent.fields[key]);
    }
    obj["id"] = parent.id;
    obj["rev"] = parent.rev;
    obj["url"] = parent.url;
    return pupa(text, obj);
  }
  private static setFieldValue(obj: object, fieldName: string, value: any) {
    const parts: string[] = fieldName.split(".", 2);
    if (parts.length == 2) {
      if (obj[parts[0]] === undefined) {
        obj[parts[0]] = {};
      }
      this.setFieldValue(
        obj[parts[0]],
        fieldName.substring(parts[0].length + 1),
        value
      );
    } else {
      obj[parts[0]] = value;
    }
  }
}

export { ChildTasksService };
