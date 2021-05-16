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

export class ChooseTemplatePanel extends Component<{}, IChooseTemplatePanelState> {
    private templateList?: string[]

    private onCheckedTemplatesChange(templates: string[]): void {
        this.setState({ templateNames: templates })
    }

    constructor(props: {}) {
        super(props)
        this.state = { templateNames: [] }
    }
    public async componentDidMount() {
        SDK.init()

        await SDK.ready()
        const config = SDK.getConfiguration()
        this.templateList = await this.getTemplateNames()
        if (config.dialog) {
            // Give the host frame the size of our dialog content so that the dialog can be sized appropriately.
            // This is the case where we know our content size and can explicitly provide it to SDK.resize. If our
            // size is dynamic, we have to make sure our frame is visible before calling SDK.resize() with no arguments.
            // In that case, we would instead do something like this:
            await SDK.notifyLoadSucceeded()
            // we are visible in this callback.
            SDK.resize()
        }
    }
    public static settings: SettingsData
    public async getTemplateNames(): Promise<string[]> {
        if (this.templateList) {
            return this.templateList
        }
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
        this.templateList = await settings.getTemplateNames()
        return this.templateList
    }

    public render(): JSX.Element {
        if (this.templateList) {
            return (
                <div className="sample-panel flex-column flex-grow">
                    <TemplateSelect names={this.templateList} onCheckedNamesChange={this.onCheckedTemplatesChange} />
                    <ButtonGroup className="sample-panel-button-bar">
                        <Button
                            primary={true}
                            text="OK"
                            onClick={() => this.close(false)}
                        />
                        <Button
                            text="Cancel"
                            onClick={() => this.close(true)}
                        />
                    </ButtonGroup>
                </div>
            )
        }
        else {
            return (
                <div className="sample-panel flex-column flex-grow">
                    <h2>No templates found</h2>
                </div>
            )
        }
    }
    private close(cancel: boolean) {
        const result = (cancel) ? [] : this.state.templateNames
        const config = SDK.getConfiguration()
        if (config.dialog) {
            config.dialog.close(result)
        }
        else if (config.panel) {
            config.panel.close(result)
        }
    }
}
render(<ChooseTemplatePanel />, document.getElementById("root"))


