interface IChooseState {
    templates?: IChooseTemplateState[]
}

interface IChooseTemplateState {
    name?: string
    checked?: boolean
}
