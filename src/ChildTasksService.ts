import {
    WorkItem,
    WorkItemTrackingRestClient,
} from "azure-devops-extension-api/WorkItemTracking"
import pupa from "pupa";

import { getClient } from "azure-devops-extension-api"
import { JsonPatchDocument, JsonPatchOperation, Operation } from "azure-devops-extension-api/WebApi"

class ChildTasksService {
    private workClient?: WorkItemTrackingRestClient

    private async getWorkClient(): Promise<WorkItemTrackingRestClient> {
        if (!this.workClient) {
            this.workClient = getClient<WorkItemTrackingRestClient>(WorkItemTrackingRestClient)
        }
        return this.workClient
    }
    private newFieldOperation(field: string, value: any): JsonPatchOperation {
        return {
            "from": null as any,
            "op": Operation.Add,
            "path": "/fields/" + field,
            "value": value
        }
    }
    private newParentRelation(parent:WorkItem): JsonPatchOperation
    {
        return {
            "from": null as any,
            "op": Operation.Add,
            "path": "/relations/-",
            "value": {
              "rel": "System.LinkTypes.Dependency-Parent",
              "url": parent.url,
            }
          }
    }
    public async execute(context: any): Promise<void> {
        const client = await this.getWorkClient()
        const patch = new Array<JsonPatchOperation>()
        const parent = await client.getWorkItem(context.workItemId);
        /*
        workItemAvailable: true
        workItemDirty: false
        workItemId: 7340
        workItemTypeName: "User Story"
        */
        if (context.workItemAvailable) {
            patch.push(this.newParentRelation(parent))
            patch.push(this.newFieldOperation("System.Title", this.interpolate("{System.Title} DEV:{System.Id}", parent)))
            patch.push(this.newFieldOperation("Microsoft.VSTS.Common.Activity", "Development"))
            const workItem = await client.createWorkItem(patch as JsonPatchDocument, context.currentProjectGuid, "Task")
            console.info("Created task " + workItem.id)
        }
    }
    private interpolate(text:string, parent:WorkItem):string
    {
        return pupa(text,parent.fields);
    }
}

export { ChildTasksService }
