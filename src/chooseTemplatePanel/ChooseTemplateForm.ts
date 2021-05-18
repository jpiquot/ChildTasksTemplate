import { IHostPageLayoutService, IPanelOptions } from 'azure-devops-extension-api'
import { IExtensionContext } from 'azure-devops-extension-sdk'
import { SettingsData } from 'src/settings/SettingsData'
import { Template } from 'src/settings/Template'

export class ChooseTemplateForm {
    settings: SettingsData
    pageService: IHostPageLayoutService
    context: IExtensionContext
    public templateNames: string[] = [];

    constructor(settings: SettingsData, context: IExtensionContext, pageService: IHostPageLayoutService) {
        this.settings = settings
        this.pageService = pageService
        this.context = context
    }

    public dialogContributionId(): string {
        return this.context.id + ".child-tasks-template-choose"
    }
    public async showDialog(): Promise<void> {
        const options: IPanelOptions<string[]> = {
            title: "Choose templates to apply :",
            configuration: {
                panel:this
            },
            onClose: (result: string[] | undefined) => {
                this.setTemplateNames(result)
            }
        }
        console.info("Openning custom dialog : " + this.dialogContributionId())
        this.pageService.openPanel(this.dialogContributionId(), options)
    }
    private setTemplateNames(names: string[] | undefined) {
        console.info("selected templates : " + names)
        if (names) {
            this.templateNames = names
        }
        else {
            this.templateNames = [];
        }
    }
    public async getTemplates(): Promise<Template[]> {
        return await this.settings.getTemplates(this.templateNames)
    }
}