import { Screenshot } from "../../Functions/Screenshot";
import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
export default class ScreenshotCommand extends ExCommand{
    constructor(){
        super("screenshot",{
            aliases: ["screenshot","ss"],
            description: "Screenshot any sfw website",
            args: [{
                id: "query",
                type: "STRING",
                match: "rest"
            }]
        })
    }
    async exec(message:Message,{ query }: { query: string }){
        return message.reply(await Screenshot(query))
    }
}