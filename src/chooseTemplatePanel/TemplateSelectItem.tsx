import React, { Component } from "react"
import { Checkbox } from "azure-devops-ui/Checkbox"
import { ITemplateSelectItemProps } from "./ITemplateSelectItemProps"

export class TemplateSelectItem extends Component<ITemplateSelectItemProps, ITemplateSelectItemState> {
    private onChange(_: React.MouseEvent<HTMLElement, globalThis.MouseEvent> | React.KeyboardEvent<HTMLElement>, checked: boolean): void {
        this.setState({ checked: checked })
        if (this.props.onChange) {
            this.props.onChange(this.props.id, checked)
        }
    }

    constructor(props: ITemplateSelectItemProps) {
        super(props)
        this.state = {}
    }
    public render(): JSX.Element {
        return (<Checkbox onChange={this.onChange} checked={this.state.checked} label={this.props.name} />)
    }
}
