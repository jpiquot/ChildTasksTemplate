import React, { Component } from "react"
import { render } from "react-dom"
import { Button } from "azure-devops-ui/Button"
import { ButtonGroup } from "azure-devops-ui/ButtonGroup"
import {
    CommonServiceIds,
    IExtensionDataService,
    IProjectPageService,
} from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk"
import { IExtensionContext } from "azure-devops-extension-sdk"
import { SettingsData } from "../settings/SettingsData"
import { TemplateSelect } from "./TemplateSelect"
import "./chooseTemplatePanel.scss"
export interface IChooseTemplatePanelState {
    names: string[];
    checks: boolean[];
}
export interface IChooseTemplatePanelResult {
    names: string[];
    context: any;
}
export class ChooseTemplatePanel extends Component<{}, IChooseTemplatePanelState> {

    private onCheckedTemplatesChange = (templates: string[]): void =>{
        let state: IChooseTemplatePanelState = this.state;
        state.checks = [];
        this.state.names.map(name => {
            state.checks.push( templates.findIndex(e => e == name) >= 0 ? true:false)
        });
        this.setState(state)
    }

    private setTemplateList(templates: string[]): void {
        this.setState({ names: templates, checks:new Array(templates.length) })
    }
    private getSelectedTemplates(): string[] {
        let templates = [];
        for (let i = 0; i < this.state.checks.length; i++)
        {
            if (this.state.checks[i] === true)
            {
                templates.push(this.state.names[i]);
            }
        }
        return templates;
    }

    constructor(props: {}) {
        super(props)
    }
    public async componentDidMount() {
        let init = SDK.init()
        this.setTemplateList(await this.getTemplateNames());
        await SDK.ready()
        const config = SDK.getConfiguration()
        if (config.dialog) {
            // Give the host frame the size of our dialog content so that the dialog can be sized appropriately.
            // This is the case where we know our content size and can explicitly provide it to SDK.resize. If our
            // size is dynamic, we have to make sure our frame is visible before calling SDK.resize() with no arguments.
            // In that case, we would instead do something like this:
            await SDK.notifyLoadSucceeded()
            // we are visible in this callback.
            SDK.resize()
        }
        await init;
    }
    public static settings: SettingsData
    public async getTemplateNames(): Promise<string[]> {
        const project = await (
            await SDK.getService<IProjectPageService>(
                CommonServiceIds.ProjectPageService
            )
        ).getProject()

        if (project === undefined) {
            throw Error("No project defined.")
        }
        const extension: IExtensionContext = SDK.getExtensionContext()
        const dataService = await SDK.getService<IExtensionDataService>(
            CommonServiceIds.ExtensionDataService
        )
        const settings = new SettingsData(
            await dataService.getExtensionDataManager(
                extension.id,
                await SDK.getAccessToken()
            ),
            project.id
        )
        const templateList = await settings.getTemplateNames()
        return templateList
    }

    public render(): JSX.Element {
            return (
            <div className="choose-template-panel flex-column flex-grow">
                <TemplateSelect names={this.state?.names} onCheckedNamesChange={this.onCheckedTemplatesChange} />
                <ButtonGroup className="button-bar">
                    <Button
                        text="Cancel"
                        onClick={() => this.close(true)}
                    />
                    <Button
                        primary={true}
                        text="Ok"
                        onClick={() => this.close(false)}
                    />
                </ButtonGroup>
            </div>
        )
    }
    private close = (cancel: boolean): void => {
        const config = SDK.getConfiguration()
        const result: IChooseTemplatePanelResult =
        {
            names: (cancel) ? [] : this.getSelectedTemplates(),
            context: config.context
        }
        if (config.dialog) {
            config.dialog.close(result)
        }
        else if (config.panel) {
            config.panel.close(result)
        }
    }
}
render(<ChooseTemplatePanel />, document.getElementById("root"))


