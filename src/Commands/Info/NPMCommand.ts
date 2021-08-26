import ExCommand from "../../Struct/Command";
import fetch from "node-fetch"
import { Message } from "discord.js";
import { Npm } from "../../interfaces/npm";
export default class NPMCommand extends ExCommand{
    constructor(){
        super("npm",{
            aliases: ["npm"],
            description: "Search for any npm package",
            args: [{
                id: "query",
                type: "lowercase",
                default: "discord.js"
            }]
        })
    }
    async exec(message: Message,{ query }: {query: string}){
        const fetched = await (await fetch(`https://api.npms.io/v2/search?q=${query}`)).json() as Npm
        const { package: pkg } = fetched.results[0]
        message.util?.reply({
            embeds:[
                this.client.embed({
                    title: pkg.name,
                    url: pkg.links.npm,
                    description: pkg.description
                },message)
                .addField("Author",(pkg.author?.name || "Unknown") as string,true)
                .addField("Version",pkg.version,true)
                .addField("Keywords",(pkg.keywords?.join(", ") || "None"))
                .addField("Homepage",pkg.links.homepage || "None")
                .addField("Repository",pkg.links.repository || "None")
                .addField("Maintainers",pkg.maintainers.map(m => m.username).join(", "))
                .addField("Updated Date",new Date(pkg.date).toDateString())
            ]
        })
    }
}