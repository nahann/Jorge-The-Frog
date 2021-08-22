import { Message } from "discord.js";
import ExCommand from "../../Struct/Command";
import fetch from "node-fetch"
export default class DocsCommand extends ExCommand{
    constructor(){
        super("docs",{
            aliases: ["docs"],
            description:"Get Discord.JS documentation",
            args: [{
                id: "query",
                type: "string"
            },{
                id: "source",
                type: "option",
                flag: "--src=",
                default: "stable"
            }]
        })
    }
    async exec(message: Message,{query,source}: { query?: string,source: string}){
        if(!query) return
        if(!["stable","master","akairo","akairo-master"]) return
        const src = source == "akairo" ? "akairo-master" : source
        const fetched = await (await fetch(`https://djsdocs.sorta.moe/v2/embed?src=${src}&q=${encodeURIComponent(query)}`)).json()
        message.util.reply({ embeds: [fetched] })
    }
}