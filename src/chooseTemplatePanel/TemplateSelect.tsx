import React from "react"
import { TemplateSelectItem } from "./TemplateSelectItem"
export interface ITemplateSelectState {
    checkedList: boolean[]
}
export interface ITemplateSelectProps {
    names: string[]
    onCheckedNamesChange?: ((names: string[]) => void)
}

export class TemplateSelect extends React.Component<ITemplateSelectProps, ITemplateSelectState> {

    private onchange = (id: number, checked: boolean): void =>{
        let list: boolean[] = [];
        if (this.state) {
            list = this.state.checkedList;
        }
        list[id] = checked
        this.setState({ checkedList: list })
        if (this.props.onCheckedNamesChange) {
            let names: string[] = []
            if (this.props.names) {
                for (let i = 0; i < this.props.names?.length; i++) {
                    if (this.state.checkedList[i] == true) {
                        names.push(this.props.names[i])
                    };
                }
            }
            this.props.onCheckedNamesChange(names)
        }
    }

    constructor(props: ITemplateSelectProps) {
        super(props)
        this.state = { checkedList: new Array(props.names?.length) }
    }
    public render(): JSX.Element {
        return (
            <div className="template-select flex-column flex-grow">
                {this.props.names?.map((name, i) => <TemplateSelectItem key={i} id={i} name={name} onChange={this.onchange} />)}
            </div>
        );
    }
}
