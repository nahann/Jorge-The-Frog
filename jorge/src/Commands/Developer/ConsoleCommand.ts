import { Message } from "discord.js";
import Command from "../../Struct/Command";
import { exec } from "child_process"
export default class ConsoleCommand extends Command{
    constructor(){
        super("console",{
            aliases:["console","shell"],
            ownerOnly: true,
            description: "Run a shell command in discord",
            args: [{
                id: "code",
                type: "string",
                match: "rest",
                default: "ls"
            }]
        })
    }
    exec(message: Message,{ code }: { code: string }){
        exec(code,(stdout,error)=>{
            message.util?.reply({
                embeds:[
                    this.client.embed({
                        description: `Output: \`\`\`\n${stdout || error}\`\`\``
                    },message)
                ]
            })
        })
    }
} 