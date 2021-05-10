import {
  FASTDesignSystemProvider,
  FASTDialog,
  FASTButton,
  FASTMenu,
  FASTMenuItem,
} from '@microsoft/fast-components';
import { MenuItemRole } from '@microsoft/fast-foundation';
import { IHostPageLayoutService } from 'azure-devops-extension-api';
import { IExtensionContext } from 'azure-devops-extension-sdk';
import { SettingsData } from 'src/settings/SettingsData';
import { Template } from 'src/settings/Template';

FASTDesignSystemProvider;
FASTDialog;
FASTButton;
FASTMenu;
FASTMenuItem;

export class ChooseTemplateDialog {
  settings: SettingsData;
  context: IExtensionContext;
  pageService: any;
  public templateNames: string[] = [];

  constructor(settings: SettingsData, context : IExtensionContext, pageService : IHostPageLayoutService) {
    this.settings = settings;
    this.context = context;
    this.pageService = pageService;
  }

  public async initDialog(): Promise<void> {
    const templateNames = await this.settings.getTemplateNames();
    const templateMenu = document.getElementById("template-menu");
    if (!templateMenu) {
        console.warn("The <fast-menu id=\"template-menu\"> tag is missing.");
        return;
    }
    for (let i = 0; i < templateNames.length; i++)
    {
      const menuItem = new FASTMenuItem();
      menuItem.role = MenuItemRole.menuitemcheckbox;
      menuItem.textContent = templateNames[i];
      templateMenu.appendChild(menuItem);
    }
  }
  public dialogContributionId(): string
  {
    return this.context.id + ".choose-template-form";
  }
  public async showDialog(): Promise<void> {
    this.pageService.openCustomDialog(this.dialogContributionId(), {
      title: "Child templates",
      configuration: {
        message: "Choose templates.",
        initialValue: this.templateNames
      },
      onClose: (result: string[]) => {
        if (result !== undefined) {
          this.setTemplates(result);
        }
      }
    });
  }
  private setTemplates(value: string[]) {
    this.templateNames = value;
  }
  public async getTemplates() : Promise<Template[]> {
    return await this.settings.getTemplates(this.templateNames);
  }
}