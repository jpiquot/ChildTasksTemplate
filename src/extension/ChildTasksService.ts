import {
    IWorkItemFormService,
    WorkItem,
    WorkItemTrackingRestClient,
    WorkItemTrackingServiceIds
} from "azure-devops-extension-api/WorkItemTracking"
import pupa from "pupa"

import { getClient } from "azure-devops-extension-api"
import {
    JsonPatchDocument,
    JsonPatchOperation,
    Operation,
} from "azure-devops-extension-api/WebApi"
import * as SDK from "azure-devops-extension-sdk"
import { Task } from "src/settings/Task"
import { Field } from "src/settings/Field"
import { Template } from "src/settings/Template"

export class ChildTasksService {
    private workClient?: WorkItemTrackingRestClient
    private clientForm?: IWorkItemFormService
    templates: Template[]

    constructor(templates: Template[]) {
        this.templates = templates
    }
    private async getFormService(): Promise<IWorkItemFormService> {
        if (!this.clientForm) {
            this.clientForm = await SDK.getService<IWorkItemFormService>(
                WorkItemTrackingServiceIds.WorkItemFormService
            )
        }
        return this.clientForm
    }
    private async getWorkClient(): Promise<WorkItemTrackingRestClient> {
        if (!this.workClient) {
            this.workClient = getClient<WorkItemTrackingRestClient>(
                WorkItemTrackingRestClient
            )
        }
        return this.workClient
    }
    private newFieldOperation(field: string, value: any): JsonPatchOperation {
        return {
            from: null as any,
            op: Operation.Add,
            path: "/fields/" + field,
            value: value,
        }
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
        }
    }
    public async execute(context: any): Promise<void> {
        const client = await this.getWorkClient()
        const parent = await client.getWorkItem(context.workItemId)

        if (!this.templates) {
            console.warn("Template is undefined or has an incorrect format.")
            return
        }
        if (context.workItemAvailable) {
            for (let t = 0; t < this.templates.length; t++) {
                let template = this.templates[t]
                console.info("creating tasks from template : "+template.name)
                for (let i = 0; i < template.tasks.length; i++) {
                    const patch = new Array<JsonPatchOperation>()
                    patch.push(this.newParentRelation(parent))
                    const task = template.tasks[i] as Task
                    if (!task) {
                        continue
                    }
                    for (let j = 0; j < task.fields.length; j++) {
                        const field = task.fields[j] as Field
                        if (!field) {
                            continue
                        }
                        patch.push(
                            this.newFieldOperation(
                                field.name,
                                ChildTasksService.interpolate(field.value, parent)
                            )
                        )
                    }
                    console.info("creating task : "+JSON.stringify(task))

                    const workItem = await client.createWorkItem(
                        patch as JsonPatchDocument,
                        context.currentProjectGuid,
                        "Task"
                    )
                    console.info("Created task " + workItem.id)
                }
            }
            const formService = await this.getFormService()
            if (! await formService.isDirty()) {
                await formService.refresh()
            }
        }
    }
    private static interpolate(text: string | null | undefined, parent: WorkItem): string | null {
        if (!text) {
            return null
        }
        let obj = {}
        const keys = Object.keys(parent.fields)
        for (const key of keys) {
            try {
                ChildTasksService.setFieldValue(obj, key, parent.fields[key])
            }
            catch (Error) {
                console.error("An error accured while setting field value. Name '" + key + "'; Value '" + parent.fields[key] + "'." + Error.message)
            }
        }
        obj["id"] = parent.id
        obj["rev"] = parent.rev
        obj["url"] = parent.url
        return pupa(text, obj)
    }
    private static setFieldValue(obj: object, fieldName: string, value: any) {
        const parts: string[] = fieldName.split(".", 2)
        if (parts.length == 2) {
            if (obj[parts[0]] === undefined) {
                obj[parts[0]] = {}
            }
            this.setFieldValue(
                obj[parts[0]],
                fieldName.substring(parts[0].length + 1),
                value
            )
        } else {
            obj[fieldName] = value
        }
    }
}