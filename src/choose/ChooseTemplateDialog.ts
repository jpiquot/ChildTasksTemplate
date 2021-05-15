import { IDialogOptions, IHostPageLayoutService } from 'azure-devops-extension-api'
import { IExtensionContext } from 'azure-devops-extension-sdk'
import { SettingsData } from 'src/settings/SettingsData'
import { Template } from 'src/settings/Template'

export class ChooseTemplateDialog {
    settings: SettingsData
    pageService: any
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
        const options: IDialogOptions<string[]> = {
            title: "Choose templates to apply :",
            onClose: (result: string[] | undefined) => {
                if (result !== undefined) {
                    this.setTemplateNames(result)
                }
            }
        }
        console.info("Openning custom dialog : " + this.dialogContributionId())
        this.pageService.openCustomDialog(this.dialogContributionId(), options)
    }
    private setTemplateNames(names: string[]) {
        this.templateNames = names
    }
    public async getTemplates(): Promise<Template[]> {
        return await this.settings.getTemplates(this.templateNames)
    }
}