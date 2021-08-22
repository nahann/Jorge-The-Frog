import ExCommand from "../../Struct/Command";
import { obfuscate } from "javascript-obfuscator";
import { Message } from "discord.js";
export default class ObfuscateCommand extends ExCommand{
    constructor(){
        super("Obfuscate",{
            aliases: ["obfuscate"],
            description: "Obfuscate javascript code",
            args: [{
                id: "code",
                type: "string",
                default: "\"nerd\""
            }]
        })
    }
    async exec(message: Message,{ code }: { code: string }){
        const obfuscation = obfuscate(code).getObfuscatedCode()
        message.util?.reply({
            embeds:[
                this.client.embed({description: obfuscation.length > 2048 ? "too long xd" : `\`\`\`\n${obfuscation}\`\`\``},message)
            ]
        })
    }
}