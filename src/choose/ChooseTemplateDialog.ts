import {
  FASTDesignSystemProvider,
  FASTDialog,
  FASTButton,
  FASTMenu,
  FASTMenuItem,
} from '@microsoft/fast-components';
import { MenuItemRole } from '@microsoft/fast-foundation';
import { IHostPageLayoutService, IPanelOptions } from 'azure-devops-extension-api';
import * as SDK from "azure-devops-extension-sdk";
import { SettingsData } from 'src/settings/SettingsData';
import { Template } from 'src/settings/Template';

FASTDesignSystemProvider;
FASTDialog;
FASTButton;
FASTMenu;
FASTMenuItem;

export class ChooseTemplateDialog {
  settings: SettingsData;
  pageService: any;
  public templateNames: string[] = [];

  constructor(settings: SettingsData, pageService : IHostPageLayoutService) {
    this.settings = settings;
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
    return SDK.getExtensionContext().id + ".child-tasks-template-choose";
  }
  public async showDialog(): Promise<void> {
    /*
    const options: IDialogOptions<string[]> = {
      title: "Child templates",
      onClose: (result: string[] | undefined) => {
        if (result !== undefined) {
          this.setTemplates(result);
        }
      }
    };
    this.pageService.openCustomDialog(this.dialogContributionId(), options);
    */
    const options: IPanelOptions<string[]> = {
      title: "Child templates",
      onClose: (result: string[] | undefined) => {
        if (result !== undefined) {
          this.setTemplates(result);
        }
      }
    };
    this.pageService.openPanel(this.dialogContributionId(), options);
  }
  private setTemplates(value: string[]) {
    this.templateNames = value;
  }
  public async getTemplates() : Promise<Template[]> {
    return await this.settings.getTemplates(this.templateNames);
  }
}