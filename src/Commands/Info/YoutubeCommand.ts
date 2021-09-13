import ExCommand from "../../Struct/Command";
import { Message } from "discord.js"
import { Youtube } from "../../interfaces/youtube";
import fetch from "node-fetch"
import { Screenshot } from "../../Functions/Screenshot";
export default class YoutubeCommand extends ExCommand{
    constructor(){
        super("youtube",{
            aliases: ["youtube","yt"],
            description: "Search for any youtube channel",
            args:[{
                id: "query",
                type: "STRING",
                match: "rest",
                default: "Salvage_Dev"
            }],
            typing: true
        })
    }
    async exec(message: Message,{ query }: { query: string }){
        const str = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${this.client.config.Youtube}&maxResults=1&type=channel`
        const { items: [{ snippet }] } = await (await fetch(str)).json() as Youtube
        const embed = this.client.embed({
            title: snippet.channelTitle,
            description: snippet.description,
            thumbnail: snippet.thumbnails.default,

        },message)
        .addField("Created account at", new Date(snippet.publishedAt).toLocaleDateString(),true)
        .setImage('attachment://Screenshot.png')
        message.reply({ embeds: [embed], ...await Screenshot(`https://youtube.com/channel/${snippet.channelId}`) })
    }
}