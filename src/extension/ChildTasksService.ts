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
              "rel": "System.LinkTypes.Hierarchy-Reverse",
              "url": parent.url,
            }
          }
    }
    public async execute(context: any): Promise<void> {
        const client = await this.getWorkClient()
        const patch = new Array<JsonPatchOperation>()
        const parent = await client.getWorkItem(context.workItemId);
 
        if (context.workItemAvailable) {
            patch.push(this.newParentRelation(parent))
            patch.push(this.newFieldOperation("System.Title", ChildTasksService.interpolate("{System.Title} DEV:{id}", parent)))
            patch.push(this.newFieldOperation("Microsoft.VSTS.Common.Activity", "Development"))
            const workItem = await client.createWorkItem(patch as JsonPatchDocument, context.currentProjectGuid, "Task")
            console.info("Created task " + workItem.id)
        }
    }
    private static interpolate(text:string, parent:WorkItem):string
    {
        let obj = {}
        const keys = Object.keys(parent.fields);
        for (const key of keys) {
            ChildTasksService.setFieldValue(obj, key, parent.fields[key])
        }
        obj["id"] = parent.id;
        obj["rev"] = parent.rev;
        obj["url"] = parent.url;
        return pupa(text, obj);
    }
    private static setFieldValue(obj:object, fieldName:string, value:any)
    {
        const parts:string[] = fieldName.split(".", 2);
        if (parts.length == 2)
        {
            if (obj[parts[0]] === undefined)
            {
                obj[parts[0]] = {}
            }
            this.setFieldValue(obj[parts[0]], fieldName.substring(parts[0].length+1), value)
        }
        else
        {
            obj[parts[0]] = value;
        }
    }
}

export { ChildTasksService }
