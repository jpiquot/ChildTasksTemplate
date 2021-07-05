import { Task } from "./Task";
import { Template } from "./Template";
import { TemplateSetup } from "./TemplateSetup";
import sample from "./templateSetupSample.json"

export class SettingsUpgrade {
    private static currentVersion = 2;

    public static upgradeToCurrent(obj: object): TemplateSetup {
        if (!obj) {
            return sample as TemplateSetup;
        }
        let version = obj["version"] as number;
        if (version === undefined || version < SettingsUpgrade.currentVersion) {
            let tasks: Task[] = obj["tasks"];
            const template: Template = { name: "default", tasks: tasks };
            const setup: TemplateSetup = { version: this.currentVersion, templates:[template] };
            return setup;
        }
        return obj as TemplateSetup;
    }
}
