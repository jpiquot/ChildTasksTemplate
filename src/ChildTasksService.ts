import {
    IWorkItemFormService
} from "../node_modules/azure-devops-extension-api/WorkItemTracking";

class ChildTasksService {
    private workItemService: IWorkItemFormService;

    public constructor(
        workItemService: IWorkItemFormService
    ) {
        this.workItemService = workItemService;
    }

    public dummy() {
        if (this.workItemService) {

        }
    }

}

export { ChildTasksService };
