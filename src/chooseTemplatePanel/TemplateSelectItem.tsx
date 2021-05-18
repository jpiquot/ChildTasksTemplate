import React, { Component, MouseEvent, KeyboardEvent } from "react"
import { Checkbox } from "azure-devops-ui/Checkbox"
export interface ITemplateSelectItemState {
    checked: boolean
}
export interface ITemplateSelectItemProps {
    name: string
    id: number
    onChange?: (id: number, checked: boolean) => void
}
export class TemplateSelectItem extends Component<ITemplateSelectItemProps, ITemplateSelectItemState> {
    private onChange = (event: MouseEvent<HTMLElement, globalThis.MouseEvent> | KeyboardEvent<HTMLElement>, checked: boolean):void => {
        event.preventDefault();
        this.setState({checked:checked});
        if (this.props.onChange) {
            this.props.onChange(this.props.id, checked)
        }
    }
    constructor(props: ITemplateSelectItemProps) {
        super(props)
        this.state = {checked:false}
    }
    public render(): JSX.Element {
        return (<Checkbox className="template-select-item" key={this.props.id} onChange={this.onChange} checked={this.state.checked} label={this.props.name} />)
    }
}
