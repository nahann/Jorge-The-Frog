import { Message, Util } from "discord.js";
import Command from "../../Struct/Command";
import { inspect } from "util";
export default class EvalCommand extends Command{
    constructor(){
        super("eval",{
            aliases:["eval","ev"],
            ownerOnly: true,
            description: "Evaluate a piece of code",
            args: [{
                id: "code",
                type: "string",
                match: "rest",
                default: "client.user.username"
            }]
        })
    }
    exec(message: Message,{ code }: { code: string }){
        const { client } = this
        const cd = code
        .replace(new RegExp("client.token","g"),"()")
        .replace(/”/g, '"')
        .replace(/“/g, '"')
        const evaled = Util.splitMessage(inspect(eval(cd),{depth: 0}))[0]
        message.reply({ embeds: [client.embed({title: "Eval success",description: `\`\`\`\n${evaled}\`\`\``},message)]})
    }
}