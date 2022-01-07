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
                match: "rest",
                default: "https://www.google.com"
            }]
        })
    }
    async exec(message:Message,{ query }: { query: string }){
        return message.util?.reply(await Screenshot(query) || { content: "NSFW Link xd" })
    }
}