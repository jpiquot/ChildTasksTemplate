# Create linked sub tasks to your parent work item in one click

Use this extension to enable creating child tasks from an existing work items and based on a template. Automatically you will be able to generate sub work items under a parent one and with the proper links

## General information

There are two things to know to be confortable using this extension.

- How to setup a "template" of tasks

- How to create the sub linked tasks

### How to setup a template of tasks

Go in the extension setup, which is per project. As you can see below, you have a "JSON" file to determine. The easiest way is to copy our sample [Json template](https://github.com/jpiquot/ChildTasksTemplate/raw/main/src/settings/templateSetupSample.json) and to modify it. In the Azure DevOps Json editor, on the header bar, you can click on "Tree" or "Text". Go to the Text mode and you can copy and paste values, to add tasks to the template.

![Settings screen](https://github.com/jpiquot/ChildTasksTemplate/raw/main/doc/project_setup.png)

You can setup parent fields in the sub tasks. By this way, when the system will generate the sub-tasks, you will be able to use "parent task" variables, like the original title, ID, url ... In the value field, as in the sample, when you specify a field, it will be the parent's value.

### How to create the linked sub tasks

When you are on a work item, just go in the options and click on add tasks as below. The sub tasks will be automatically generated.

![Settings screen](https://github.com/jpiquot/ChildTasksTemplate/raw/main/doc/Add_tasks.png)
