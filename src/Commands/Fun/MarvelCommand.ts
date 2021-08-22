import { DataResolver, Message } from "discord.js";
import { Marvel } from "../../interfaces/Marvel";
import ExCommand from "../../Struct/Command";
import fetch from "node-fetch";
import { resourceLimits } from "worker_threads";
export default class MarvelCommand extends ExCommand{
    constructor(){
        super("marvel",{
            aliases: ["marvel"],
            args:[{
                id: "query",
                type: "string",
                match: "rest",
                default: "Iron Man"
            }]
        })
    }
    async exec(message: Message,{ query }: {query: string}){
        const { Marvel } = this.client.config
        const json = await (await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${encodeURIComponent(query)}&apikey=${Marvel}`)).json() as Marvel
        console.log(json)
        const embed = this.client.embed({},message)
        if(!json.data.total) embed.setTitle("Not found")
        else{
            const result = json.data.results[0]
            embed.setTitle(result.name).setDescription(result.description || "No description provided").setThumbnail(`${result.thumbnail.path}.${result.thumbnail.extension}`).addField("Number of comics appeared in",result.comics.available.toString())
            const exmpl = this.client.trimArray(result.comics.items.map(i => i.name).reverse(),10)
            embed.addField("Names of comics character appeared in",exmpl)
        }
    }
}