import react, * as React from "react"
import * as ReactDOM from "react-dom"
import { Button } from "azure-devops-ui/Button"
import { ButtonGroup } from "azure-devops-ui/ButtonGroup"
import { Checkbox } from "azure-devops-ui/Checkbox"

import {
    CommonServiceIds,
    IExtensionDataService,
    IProjectPageService,
} from "azure-devops-extension-api"
import * as SDK from "azure-devops-extension-sdk"
import { IExtensionContext } from "azure-devops-extension-sdk"
import { SettingsData } from "../settings/SettingsData"



export class ChoosePanel extends React.Component<{}, IChooseState> {

    constructor(props: {}) {
        super(props)
        this.state = {}
    }
    public async componentDidMount() {
        SDK.init()

        await SDK.ready()
        const config = SDK.getConfiguration()
        this.setState(await ChoosePanel.initializeState())
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
    public static async initializeState(): Promise<IChooseState> {
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
        const templateNames = await settings.getTemplateNames()
        const state: IChooseState = { templates: [] }
        for (let i = 0; i < templateNames.length; i++) {
            state.templates?.push({ name: templateNames[i] })
        }
        return state
    }
    public render(): JSX.Element {
        return (
            <div className="sample-panel flex-column flex-grow">
                <div className="flex-grow flex-column flex-center justify-center" style={{ border: "1px solid #eee", margin: "10px 0" }}>
                    <Checkbox label="test 1" />
                    <Checkbox label="test 2" />
                    <Checkbox label="test 3" />
                    <Checkbox label="test 4" />
                </div>
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
    private close(cancel: boolean) {
        const result: IChooseState = cancel == true ? {} : this.state
        const config = SDK.getConfiguration()
        if (config.dialog) {
            config.dialog.close(result)
        }
        else if (config.panel) {
            config.panel.close(result)
        }
    }
}
ReactDOM.render(<ChoosePanel />, document.getElementById("root"))


