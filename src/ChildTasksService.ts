import {
    WorkItemTrackingRestClient,
} from "azure-devops-extension-api/WorkItemTracking";

import { getClient } from "azure-devops-extension-api";
import { JsonPatchDocument, JsonPatchOperation, Operation } from "azure-devops-extension-api/WebApi";

class ChildTasksService {
    private workClient?: WorkItemTrackingRestClient;
    private projectId: string;

    constructor(projectId:string)
    {
        this.projectId = projectId;
    }

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

        patch.push(this.newFieldOperation("System.Title", "Test child task of "+context.ID));
        patch.push(this.newFieldOperation("System.Activity", "Development"));
        await client.createWorkItem(patch as JsonPatchDocument, this.projectId, "Task");
        
    }
}

export { ChildTasksService };
