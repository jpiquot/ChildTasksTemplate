import { Field } from "./Field"

export interface Task {
    type: string // e.g., "Task", "Product Backlog Item", "Feature"
    name: string
    fields: Field[]
}
