import Command from "../../Struct/Command";
import fetch from "node-fetch"
import { Message } from "discord.js";
import { CSEImage, Google } from "../../interfaces/google"
export default class SearchCommand extends Command{
    constructor(){
        super("search",{
            aliases: ["search","google"],
            description: "Search for anything(except nsfw stuff) on google",
            args: [{
                id: "query",
                type: "string",
                default: "google.com"
            }]
        })
    }
    async exec(message: Message, { query }: { query: string }){
        const url = `https://www.googleapis.com/customsearch/v1?key=${this.client.config.Google}&cx=${this.client.config.CX}&q=${query}`
        const { items: [item],searchInformation } = await (await fetch(url)).json() as Google
        const image = item.pagemap?.cse_image as CSEImage[] || []
        const obj = this.client.embed({
            title: item.title,
            url: `https://${item.displayLink}`,
            description: `"${item.snippet}"\nTime taken to search: ${searchInformation.formattedSearchTime} seconds`,
            image: {
                url: image[0]?.src || "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png",
            }
        },message)
        message.util?.reply({ embeds: [obj] })
    }
}