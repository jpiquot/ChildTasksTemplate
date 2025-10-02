
Extension has been customized to support any child work item type ( TASK, BUT, PBI, FEATURES) by calling out the type in the config of the template


# Create linked sub tasks to your parent work item 
  

Use this extension to enable creating child tasks from an existing work items based on a template. Automatically you will be able to generate sub work items under a parent one and with the proper links

  
## General information

  

There are two things to know to be comfortable using this extension.

  

- How to setup a "template" of work items

  

- How to create the sub linked work items

  

### How to setup a template of tasks

  

Go in the extension setup, which is per project. As you can see below, you have a "JSON" file to determine this. The easiest way is to copy a section and dubplate it and then modify it. In the Azure DevOps Json editor, on the header bar, you can click on "Tree" or "Text". Go to the Text mode and you can copy and paste values, to add Child items to the template.

![setup_screen.png](doc/project_setup.png)

  

Example json format of a single section that creates 2 tasks
```json
{
  "name": "Dev Activity",
  "tasks": [
    {
      "name": "Code Review",
      "fields": [
        {
          "name": "System.Title",
          "value": "Code Review"
        },
        {
          "name": "System.IterationPath",
          "value": "{System.IterationPath}"
        },
        {
          "name": "System.AreaPath",
          "value": "{System.AreaPath}"
        },
        {
          "name": "Microsoft.VSTS.Common.Priority",
          "value": "{Microsoft.VSTS.Common.Priority}"
        },
        {
          "name": "Microsoft.VSTS.Common.Activity",
          "value": "Development"
        }
      ],
      "type": "Task"
    },
    {
      "name": "Dev Analysis and Development",
      "fields": [
        {
          "name": "System.Title",
          "value": "Dev Analysis and Development"
        },
        {
          "name": "System.IterationPath",
          "value": "{System.IterationPath}"
        },
        {
          "name": "System.AreaPath",
          "value": "{System.AreaPath}"
        },
        {
          "name": "Microsoft.VSTS.Common.Activity",
          "value": "Development"
        }
      ],
      "type": "Task"
    }
  ]
}
```
  
in this example the above shows up as Dev Activity template
![image.png](/.attachments/image-ec580d02-c9a7-46c3-9976-b1fa9d67336a.png)

and create 2 Task child work items titled
1.Code Review
2.Dev Analysis and Development

and activity types defined and inherits the parent work items iteration and area path's

Note: You can setup parent fields in the sub tasks like the area and iteration paths. By this way, when the system will generate the sub-tasks, you will be able to use "parent task" variables, like the original title, ID, url ... In the value field, as in the sample, when you specify a field, it will be the parent's value.

#### Adding fields to template:
list of available fields for each work item below you must use the systems ReferenceName for the name value ex: Microsoft.VSTS.Common.Activity
System.AreaPath
Custom.OtherReference

<details>
  <summary>Task</summary>
       
| FieldName | ReferenceName |
| --- | --- |
| Iteration Path | System.IterationPath |
| Iteration ID | System.IterationId |
| External Link Count | System.ExternalLinkCount |
| Iteration Level 7 | System.IterationLevel7 |
| Iteration Level 6 | System.IterationLevel6 |
| Iteration Level 5 | System.IterationLevel5 |
| Iteration Level 4 | System.IterationLevel4 |
| Iteration Level 3 | System.IterationLevel3 |
| Iteration Level 2 | System.IterationLevel2 |
| Iteration Level 1 | System.IterationLevel1 |
| Area Level 7 | System.AreaLevel7 |
| Area Level 6 | System.AreaLevel6 |
| Area Level 5 | System.AreaLevel5 |
| Area Level 4 | System.AreaLevel4 |
| Area Level 3 | System.AreaLevel3 |
| Area Level 2 | System.AreaLevel2 |
| Area Level 1 | System.AreaLevel1 |
| Team Project | System.TeamProject |
| Parent | System.Parent |
| Remote Link Count | System.RemoteLinkCount |
| Comment Count | System.CommentCount |
| Hyperlink Count | System.HyperLinkCount |
| Attached File Count | System.AttachedFileCount |
| Node Name | System.NodeName |
| Area Path | System.AreaPath |
| Revised Date | System.RevisedDate |
| Changed Date | System.ChangedDate |
| ID | System.Id |
| Area ID | System.AreaId |
| Authorized As | System.AuthorizedAs |
| Title | System.Title |
| State | System.State |
| Authorized Date | System.AuthorizedDate |
| Watermark | System.Watermark |
| Rev | System.Rev |
| Changed By | System.ChangedBy |
| Reason | System.Reason |
| Assigned To | System.AssignedTo |
| Work Item Type | System.WorkItemType |
| Created Date | System.CreatedDate |
| Created By | System.CreatedBy |
| Description | System.Description |
| History | System.History |
| Related Link Count | System.RelatedLinkCount |
| Tags | System.Tags |
| Board Column | System.BoardColumn |
| Board Column Done | System.BoardColumnDone |
| Board Lane | System.BoardLane |
| Priority | Microsoft.VSTS.Common.Priority |
| Remaining Work | Microsoft.VSTS.Scheduling.RemainingWork |
| Backlog Priority | Microsoft.VSTS.Common.BacklogPriority |
| Activity | Microsoft.VSTS.Common.Activity |
| State Change Date | Microsoft.VSTS.Common.StateChangeDate |
| Activated Date | Microsoft.VSTS.Common.ActivatedDate |
| Activated By | Microsoft.VSTS.Common.ActivatedBy |
| Integration Build | Microsoft.VSTS.Build.IntegrationBuild |
| Blocked | Microsoft.VSTS.CMMI.Blocked |
| Closed Date | Microsoft.VSTS.Common.ClosedDate |
| Closed By | Microsoft.VSTS.Common.ClosedBy |
| Resolved By | Microsoft.VSTS.Common.ResolvedBy |
| Resolved Date | Microsoft.VSTS.Common.ResolvedDate |
| Completed Work | Microsoft.VSTS.Scheduling.CompletedWork |
| Original Estimate | Microsoft.VSTS.Scheduling.OriginalEstimate |
| Value Area | Microsoft.VSTS.Common.ValueArea |
</details>
<details>
  <summary>Product Backlog Item</summary>
      
| FieldName | ReferenceName |
| --- | --- |
| Iteration Path | System.IterationPath |
| Iteration ID | System.IterationId |
| External Link Count | System.ExternalLinkCount |
| Iteration Level 7 | System.IterationLevel7 |
| Iteration Level 6 | System.IterationLevel6 |
| Iteration Level 5 | System.IterationLevel5 |
| Iteration Level 4 | System.IterationLevel4 |
| Iteration Level 3 | System.IterationLevel3 |
| Iteration Level 2 | System.IterationLevel2 |
| Iteration Level 1 | System.IterationLevel1 |
| Area Level 7 | System.AreaLevel7 |
| Area Level 6 | System.AreaLevel6 |
| Area Level 5 | System.AreaLevel5 |
| Area Level 4 | System.AreaLevel4 |
| Area Level 3 | System.AreaLevel3 |
| Area Level 2 | System.AreaLevel2 |
| Area Level 1 | System.AreaLevel1 |
| Team Project | System.TeamProject |
| Parent | System.Parent |
| Remote Link Count | System.RemoteLinkCount |
| Comment Count | System.CommentCount |
| Hyperlink Count | System.HyperLinkCount |
| Attached File Count | System.AttachedFileCount |
| Node Name | System.NodeName |
| Area Path | System.AreaPath |
| Revised Date | System.RevisedDate |
| Changed Date | System.ChangedDate |
| ID | System.Id |
| Area ID | System.AreaId |
| Authorized As | System.AuthorizedAs |
| Title | System.Title |
| State | System.State |
| Authorized Date | System.AuthorizedDate |
| Watermark | System.Watermark |
| Rev | System.Rev |
| Changed By | System.ChangedBy |
| Reason | System.Reason |
| Assigned To | System.AssignedTo |
| Work Item Type | System.WorkItemType |
| Created Date | System.CreatedDate |
| Created By | System.CreatedBy |
| Description | System.Description |
| History | System.History |
| Related Link Count | System.RelatedLinkCount |
| Tags | System.Tags |
| Board Column | System.BoardColumn |
| Board Column Done | System.BoardColumnDone |
| Board Lane | System.BoardLane |
| State Change Date | Microsoft.VSTS.Common.StateChangeDate |
| Closed Date | Microsoft.VSTS.Common.ClosedDate |
| Closed By | Microsoft.VSTS.Common.ClosedBy |
| Activated Date | Microsoft.VSTS.Common.ActivatedDate |
| Activated By | Microsoft.VSTS.Common.ActivatedBy |
| Backlog Priority | Microsoft.VSTS.Common.BacklogPriority |
| Business Value | Microsoft.VSTS.Common.BusinessValue |
| Effort | Microsoft.VSTS.Scheduling.Effort |
| Acceptance Criteria | Microsoft.VSTS.Common.AcceptanceCriteria |
| Priority | Microsoft.VSTS.Common.Priority |
| Value Area | Microsoft.VSTS.Common.ValueArea |
| Integration Build | Microsoft.VSTS.Build.IntegrationBuild |
| Resolved By | Microsoft.VSTS.Common.ResolvedBy |
| Resolved Date | Microsoft.VSTS.Common.ResolvedDate |
| Other Reference | Custom.OtherReference |.
</details>
<details>
  <summary>Bug</summary>
       
| FieldName | ReferenceName |
| --- | --- |
| Iteration Path | System.IterationPath |
| Iteration ID | System.IterationId |
| External Link Count | System.ExternalLinkCount |
| Iteration Level 7 | System.IterationLevel7 |
| Iteration Level 6 | System.IterationLevel6 |
| Iteration Level 5 | System.IterationLevel5 |
| Iteration Level 4 | System.IterationLevel4 |
| Iteration Level 3 | System.IterationLevel3 |
| Iteration Level 2 | System.IterationLevel2 |
| Iteration Level 1 | System.IterationLevel1 |
| Area Level 7 | System.AreaLevel7 |
| Area Level 6 | System.AreaLevel6 |
| Area Level 5 | System.AreaLevel5 |
| Area Level 4 | System.AreaLevel4 |
| Area Level 3 | System.AreaLevel3 |
| Area Level 2 | System.AreaLevel2 |
| Area Level 1 | System.AreaLevel1 |
| Team Project | System.TeamProject |
| Parent | System.Parent |
| Remote Link Count | System.RemoteLinkCount |
| Comment Count | System.CommentCount |
| Hyperlink Count | System.HyperLinkCount |
| Attached File Count | System.AttachedFileCount |
| Node Name | System.NodeName |
| Area Path | System.AreaPath |
| Revised Date | System.RevisedDate |
| Changed Date | System.ChangedDate |
| ID | System.Id |
| Area ID | System.AreaId |
| Authorized As | System.AuthorizedAs |
| Title | System.Title |
| State | System.State |
| Authorized Date | System.AuthorizedDate |
| Watermark | System.Watermark |
| Rev | System.Rev |
| Changed By | System.ChangedBy |
| Reason | System.Reason |
| Assigned To | System.AssignedTo |
| Work Item Type | System.WorkItemType |
| Created Date | System.CreatedDate |
| Created By | System.CreatedBy |
| Description | System.Description |
| History | System.History |
| Related Link Count | System.RelatedLinkCount |
| Tags | System.Tags |
| Board Column | System.BoardColumn |
| Board Column Done | System.BoardColumnDone |
| Board Lane | System.BoardLane |
| System Info | Microsoft.VSTS.TCM.SystemInfo |
| Closed Date | Microsoft.VSTS.Common.ClosedDate |
| Closed By | Microsoft.VSTS.Common.ClosedBy |
| Activated Date | Microsoft.VSTS.Common.ActivatedDate |
| Activated By | Microsoft.VSTS.Common.ActivatedBy |
| Repro Steps | Microsoft.VSTS.TCM.ReproSteps |
| Backlog Priority | Microsoft.VSTS.Common.BacklogPriority |
| Effort | Microsoft.VSTS.Scheduling.Effort |
| Remaining Work | Microsoft.VSTS.Scheduling.RemainingWork |
| Activity | Microsoft.VSTS.Common.Activity |
| Acceptance Criteria | Microsoft.VSTS.Common.AcceptanceCriteria |
| Priority | Microsoft.VSTS.Common.Priority |
| Severity | Microsoft.VSTS.Common.Severity |
| Value Area | Microsoft.VSTS.Common.ValueArea |
| State Change Date | Microsoft.VSTS.Common.StateChangeDate |
| Integration Build | Microsoft.VSTS.Build.IntegrationBuild |
| Found In | Microsoft.VSTS.Build.FoundIn |
| Resolved By | Microsoft.VSTS.Common.ResolvedBy |
| Resolved Date | Microsoft.VSTS.Common.ResolvedDate |
| Completed Work | Microsoft.VSTS.Scheduling.CompletedWork |
</details>
<details>
  <summary>Feature</summary>
     
| FieldName | ReferenceName |
| --- | --- |
| Iteration Path | System.IterationPath |
| Iteration ID | System.IterationId |
| External Link Count | System.ExternalLinkCount |
| Iteration Level 7 | System.IterationLevel7 |
| Iteration Level 6 | System.IterationLevel6 |
| Iteration Level 5 | System.IterationLevel5 |
| Iteration Level 4 | System.IterationLevel4 |
| Iteration Level 3 | System.IterationLevel3 |
| Iteration Level 2 | System.IterationLevel2 |
| Iteration Level 1 | System.IterationLevel1 |
| Area Level 7 | System.AreaLevel7 |
| Area Level 6 | System.AreaLevel6 |
| Area Level 5 | System.AreaLevel5 |
| Area Level 4 | System.AreaLevel4 |
| Area Level 3 | System.AreaLevel3 |
| Area Level 2 | System.AreaLevel2 |
| Area Level 1 | System.AreaLevel1 |
| Team Project | System.TeamProject |
| Parent | System.Parent |
| Remote Link Count | System.RemoteLinkCount |
| Comment Count | System.CommentCount |
| Hyperlink Count | System.HyperLinkCount |
| Attached File Count | System.AttachedFileCount |
| Node Name | System.NodeName |
| Area Path | System.AreaPath |
| Revised Date | System.RevisedDate |
| Changed Date | System.ChangedDate |
| ID | System.Id |
| Area ID | System.AreaId |
| Authorized As | System.AuthorizedAs |
| Title | System.Title |
| State | System.State |
| Authorized Date | System.AuthorizedDate |
| Watermark | System.Watermark |
| Rev | System.Rev |
| Changed By | System.ChangedBy |
| Reason | System.Reason |
| Assigned To | System.AssignedTo |
| Work Item Type | System.WorkItemType |
| Created Date | System.CreatedDate |
| Created By | System.CreatedBy |
| Description | System.Description |
| History | System.History |
| Related Link Count | System.RelatedLinkCount |
| Tags | System.Tags |
| Board Column | System.BoardColumn |
| Board Column Done | System.BoardColumnDone |
| Board Lane | System.BoardLane |
| Backlog Priority | Microsoft.VSTS.Common.BacklogPriority |
| State Change Date | Microsoft.VSTS.Common.StateChangeDate |
| Activated Date | Microsoft.VSTS.Common.ActivatedDate |
| Activated By | Microsoft.VSTS.Common.ActivatedBy |
| Closed Date | Microsoft.VSTS.Common.ClosedDate |
| Closed By | Microsoft.VSTS.Common.ClosedBy |
| Priority | Microsoft.VSTS.Common.Priority |
| Target Date | Microsoft.VSTS.Scheduling.TargetDate |
| Start Date | Microsoft.VSTS.Scheduling.StartDate |
| Business Value | Microsoft.VSTS.Common.BusinessValue |
| Time Criticality | Microsoft.VSTS.Common.TimeCriticality |
| Effort | Microsoft.VSTS.Scheduling.Effort |
| Value Area | Microsoft.VSTS.Common.ValueArea |
| Integration Build | Microsoft.VSTS.Build.IntegrationBuild |
| Acceptance Criteria | Microsoft.VSTS.Common.AcceptanceCriteria |
| Resolved By | Microsoft.VSTS.Common.ResolvedBy |
| Resolved Date | Microsoft.VSTS.Common.ResolvedDate |
| Other Reference | Custom.OtherReference |
</details>
<details>
  <summary>Impediment</summary>
     
| FieldName | ReferenceName |
| --- | --- |
| Iteration Path | System.IterationPath |
| Iteration ID | System.IterationId |
| External Link Count | System.ExternalLinkCount |
| Iteration Level 7 | System.IterationLevel7 |
| Iteration Level 6 | System.IterationLevel6 |
| Iteration Level 5 | System.IterationLevel5 |
| Iteration Level 4 | System.IterationLevel4 |
| Iteration Level 3 | System.IterationLevel3 |
| Iteration Level 2 | System.IterationLevel2 |
| Iteration Level 1 | System.IterationLevel1 |
| Area Level 7 | System.AreaLevel7 |
| Area Level 6 | System.AreaLevel6 |
| Area Level 5 | System.AreaLevel5 |
| Area Level 4 | System.AreaLevel4 |
| Area Level 3 | System.AreaLevel3 |
| Area Level 2 | System.AreaLevel2 |
| Area Level 1 | System.AreaLevel1 |
| Team Project | System.TeamProject |
| Parent | System.Parent |
| Remote Link Count | System.RemoteLinkCount |
| Comment Count | System.CommentCount |
| Hyperlink Count | System.HyperLinkCount |
| Attached File Count | System.AttachedFileCount |
| Node Name | System.NodeName |
| Area Path | System.AreaPath |
| Revised Date | System.RevisedDate |
| Changed Date | System.ChangedDate |
| ID | System.Id |
| Area ID | System.AreaId |
| Authorized As | System.AuthorizedAs |
| Title | System.Title |
| State | System.State |
| Authorized Date | System.AuthorizedDate |
| Watermark | System.Watermark |
| Rev | System.Rev |
| Changed By | System.ChangedBy |
| Reason | System.Reason |
| Assigned To | System.AssignedTo |
| Work Item Type | System.WorkItemType |
| Created Date | System.CreatedDate |
| Created By | System.CreatedBy |
| Description | System.Description |
| History | System.History |
| Related Link Count | System.RelatedLinkCount |
| Tags | System.Tags |
| Board Column | System.BoardColumn |
| Board Column Done | System.BoardColumnDone |
| Board Lane | System.BoardLane |
| Resolution | Microsoft.VSTS.Common.Resolution |
| Closed Date | Microsoft.VSTS.Common.ClosedDate |
| Closed By | Microsoft.VSTS.Common.ClosedBy |
| State Change Date | Microsoft.VSTS.Common.StateChangeDate |
| Integration Build | Microsoft.VSTS.Build.IntegrationBuild |
| Priority | Microsoft.VSTS.Common.Priority |
| Resolved By | Microsoft.VSTS.Common.ResolvedBy |
| Resolved Date | Microsoft.VSTS.Common.ResolvedDate |
| Activated Date | Microsoft.VSTS.Common.ActivatedDate |
| Activated By | Microsoft.VSTS.Common.ActivatedBy |
| Backlog Priority | Microsoft.VSTS.Common.BacklogPriority |
| Effort | Microsoft.VSTS.Scheduling.Effort |
</details>
<details>
  <summary>Test Case</summary>
     
| FieldName | ReferenceName |
| --- | --- |
| Iteration Path | System.IterationPath |
| Iteration ID | System.IterationId |
| External Link Count | System.ExternalLinkCount |
| Iteration Level 7 | System.IterationLevel7 |
| Iteration Level 6 | System.IterationLevel6 |
| Iteration Level 5 | System.IterationLevel5 |
| Iteration Level 4 | System.IterationLevel4 |
| Iteration Level 3 | System.IterationLevel3 |
| Iteration Level 2 | System.IterationLevel2 |
| Iteration Level 1 | System.IterationLevel1 |
| Area Level 7 | System.AreaLevel7 |
| Area Level 6 | System.AreaLevel6 |
| Area Level 5 | System.AreaLevel5 |
| Area Level 4 | System.AreaLevel4 |
| Area Level 3 | System.AreaLevel3 |
| Area Level 2 | System.AreaLevel2 |
| Area Level 1 | System.AreaLevel1 |
| Team Project | System.TeamProject |
| Parent | System.Parent |
| Remote Link Count | System.RemoteLinkCount |
| Comment Count | System.CommentCount |
| Hyperlink Count | System.HyperLinkCount |
| Attached File Count | System.AttachedFileCount |
| Node Name | System.NodeName |
| Area Path | System.AreaPath |
| Revised Date | System.RevisedDate |
| Changed Date | System.ChangedDate |
| ID | System.Id |
| Area ID | System.AreaId |
| Authorized As | System.AuthorizedAs |
| Title | System.Title |
| State | System.State |
| Authorized Date | System.AuthorizedDate |
| Watermark | System.Watermark |
| Rev | System.Rev |
| Changed By | System.ChangedBy |
| Reason | System.Reason |
| Assigned To | System.AssignedTo |
| Work Item Type | System.WorkItemType |
| Created Date | System.CreatedDate |
| Created By | System.CreatedBy |
| Description | System.Description |
| History | System.History |
| Related Link Count | System.RelatedLinkCount |
| Tags | System.Tags |
| Board Column | System.BoardColumn |
| Board Column Done | System.BoardColumnDone |
| Board Lane | System.BoardLane |
| State Change Date | Microsoft.VSTS.Common.StateChangeDate |
| Activated Date | Microsoft.VSTS.Common.ActivatedDate |
| Activated By | Microsoft.VSTS.Common.ActivatedBy |
| Closed Date | Microsoft.VSTS.Common.ClosedDate |
| Closed By | Microsoft.VSTS.Common.ClosedBy |
| Priority | Microsoft.VSTS.Common.Priority |
| Steps | Microsoft.VSTS.TCM.Steps |
| Automated Test Name | Microsoft.VSTS.TCM.AutomatedTestName |
| Automated Test Storage | Microsoft.VSTS.TCM.AutomatedTestStorage |
| Automated Test Id | Microsoft.VSTS.TCM.AutomatedTestId |
| Automated Test Type | Microsoft.VSTS.TCM.AutomatedTestType |
| Parameters | Microsoft.VSTS.TCM.Parameters |
| Local Data Source | Microsoft.VSTS.TCM.LocalDataSource |
| Automation status | Microsoft.VSTS.TCM.AutomationStatus |
| Integration Build | Microsoft.VSTS.Build.IntegrationBuild |
</details>
  <details>
  <summary>Test Suite</summary>
     
| FieldName | ReferenceName |
| --- | --- |
| Iteration Path | System.IterationPath |
| Iteration ID | System.IterationId |
| External Link Count | System.ExternalLinkCount |
| Iteration Level 7 | System.IterationLevel7 |
| Iteration Level 6 | System.IterationLevel6 |
| Iteration Level 5 | System.IterationLevel5 |
| Iteration Level 4 | System.IterationLevel4 |
| Iteration Level 3 | System.IterationLevel3 |
| Iteration Level 2 | System.IterationLevel2 |
| Iteration Level 1 | System.IterationLevel1 |
| Area Level 7 | System.AreaLevel7 |
| Area Level 6 | System.AreaLevel6 |
| Area Level 5 | System.AreaLevel5 |
| Area Level 4 | System.AreaLevel4 |
| Area Level 3 | System.AreaLevel3 |
| Area Level 2 | System.AreaLevel2 |
| Area Level 1 | System.AreaLevel1 |
| Team Project | System.TeamProject |
| Parent | System.Parent |
| Remote Link Count | System.RemoteLinkCount |
| Comment Count | System.CommentCount |
| Hyperlink Count | System.HyperLinkCount |
| Attached File Count | System.AttachedFileCount |
| Node Name | System.NodeName |
| Area Path | System.AreaPath |
| Revised Date | System.RevisedDate |
| Changed Date | System.ChangedDate |
| ID | System.Id |
| Area ID | System.AreaId |
| Authorized As | System.AuthorizedAs |
| Title | System.Title |
| State | System.State |
| Authorized Date | System.AuthorizedDate |
| Watermark | System.Watermark |
| Rev | System.Rev |
| Changed By | System.ChangedBy |
| Reason | System.Reason |
| Assigned To | System.AssignedTo |
| Work Item Type | System.WorkItemType |
| Created Date | System.CreatedDate |
| Created By | System.CreatedBy |
| Description | System.Description |
| History | System.History |
| Related Link Count | System.RelatedLinkCount |
| Tags | System.Tags |
| Board Column | System.BoardColumn |
| Board Column Done | System.BoardColumnDone |
| Board Lane | System.BoardLane |
| Integration Build | Microsoft.VSTS.Build.IntegrationBuild |
| Test Suite Type Id | Microsoft.VSTS.TCM.TestSuiteTypeId |
| Test Suite Type | Microsoft.VSTS.TCM.TestSuiteType |
| Query Text | Microsoft.VSTS.TCM.QueryText |
| Test Suite Audit | Microsoft.VSTS.TCM.TestSuiteAudit |
</details>

### How to create the linked sub tasks

  

When you are on a work item, just go in the options and click on add tasks as below.
![image.png](/.attachments/image-aa98a500-1746-4958-aa5d-7fc8146b5c82.png)

then select as many templates you wish to apply, please note that templates could be a set any number of work items and types so insure your select the Template of child items appropriately to its parent child hierarchy

![image.png](/.attachments/image-1facb28b-4e3e-4239-a7d8-222cad66414c.png)
you should then see your Child items linked to the Parent work item

  


