import * as SDK from "azure-devops-extension-sdk"
import { ChildTasksService } from "./ChildTasksService"

class Program {
    public static async run() {        
        SDK.init({
            applyTheme: true,
            loaded: false,
        })
        await SDK.ready()        
        SDK.register(SDK.getContributionId(), () => {
            return {
                execute: async (context: any): Promise<void> => {
                    await (new ChildTasksService()).execute(context)
                }
            }
        })        
        await SDK.notifyLoadSucceeded()
    }
}

Program.run()
