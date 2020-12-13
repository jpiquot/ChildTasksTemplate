export interface IFieldTemplate {
  name: string;
  value?: string;
}
export interface ITaskTemplate {
  name: string;
  fields: IFieldTemplate[];
}
export interface ITasksTemplate {
  tasks: ITaskTemplate[];
}
