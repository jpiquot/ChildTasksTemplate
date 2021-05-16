import React from "react"
import { ITemplateSelectProps } from "./ITemplateSelectProps"
import { TemplateSelectItem } from "./TemplateSelectItem"

export class TemplateSelect extends React.Component<ITemplateSelectProps, ITemplateSelectState> {

    private onchange(id: number, checked: boolean): void {
        let list = this.state.checkedList
        list[id] = checked
        this.setState({ checkedList: list })
        if (this.props.onCheckedNamesChange) {
            let names: string[] = []
            for (let i = 0; i < this.props.names.length; i++) {
                if (this.state.checkedList[i] == true) {
                    names.push(this.props.names[i])
                };
            }
            this.props.onCheckedNamesChange(names)
        }
    }

    constructor(props: ITemplateSelectProps) {
        super(props)
        this.state = { checkedList: new Array(props.names.length) }
    }
    public render(): JSX.Element {
        let i = 0
        return (<>{this.props.names.map(name => { <TemplateSelectItem id={i} name={name} onChange={this.onchange} /> })}</>)
    }
}
