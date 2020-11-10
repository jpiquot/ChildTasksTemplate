import {
    WorkItemTrackingRestClient,
} from "azure-devops-extension-api/WorkItemTracking";

import { getClient } from "azure-devops-extension-api";
import { JsonPatchDocument, JsonPatchOperation, Operation } from "azure-devops-extension-api/WebApi";

class ChildTasksService {
    private workClient?: WorkItemTrackingRestClient;

    private async getWorkClient():Promise<WorkItemTrackingRestClient>
    {
        if (!this.workClient)
        {
            this.workClient = getClient<WorkItemTrackingRestClient>(WorkItemTrackingRestClient);   
        }
        return this.workClient;
    }
    private newFieldOperation(field:string, value:any): JsonPatchOperation
    {
        return {
            "from": null as any,
            "op": Operation.Add,
            "path": "/fields/"+field,
            "value": value
        };
    }
    public async execute(context:any):Promise<void> {
        const client = await this.getWorkClient();
        let patch = new Array<JsonPatchOperation>();
        /*
        workItemAvailable: true
        workItemDirty: false
        workItemId: 7340
        workItemTypeName: "User Story"
        */
        if (context.workItemAvailable)
        {
            patch.push(this.newFieldOperation("System.Title", "Test child task of WI "+context.workItemId+" in project "+context.currentProjectName));
            patch.push(this.newFieldOperation("Microsoft.VSTS.Common.Activity", "Development"));
            const workItem = await client.createWorkItem(patch as JsonPatchDocument, context.currentProjectGuid, "Task");
            console.info("Created task "+workItem.id);
        }        
    }
}

export { ChildTasksService };
