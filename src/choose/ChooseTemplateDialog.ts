import {
  FASTDesignSystemProvider,
  FASTDialog,
  FASTButton,
  FASTMenu,
  FASTMenuItem,
} from '@microsoft/fast-components';
import { MenuItemRole } from '@microsoft/fast-foundation';
import { SettingsData } from 'src/settings/SettingsData';

FASTDesignSystemProvider;
FASTDialog;
FASTButton;
FASTMenu;
FASTMenuItem;

export class ChooseTemplateDialog {
  settings: SettingsData;

  constructor(settings: SettingsData) {
    this.settings = settings;
  }

  public async initDialog(): Promise<void> {
    const templates = await this.settings.getChildTasksTemplate();
    if (!templates) {
        console.warn("Template is undefined or has an incorrect format.");
        return;
    }
    const templateMenu = document.getElementById("template-menu");
    if (!templateMenu) {
        console.warn("The <fast-menu id=\"template-menu\"> tag is missing.");
        return;
    }
    for (let i = 0; i < templates.templates.length; i++)
    {
      const menuItem = new FASTMenuItem();
      menuItem.role = MenuItemRole.menuitemcheckbox;
      menuItem.textContent = "test";
      templateMenu.appendChild(menuItem);
    }
  }
}