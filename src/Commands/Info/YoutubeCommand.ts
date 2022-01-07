import ExCommand from "../../Struct/Command";
import { Message } from "discord.js"
import { Youtube } from "../../interfaces/youtube";
import fetch from "../../Functions/Undici";
import { Screenshot } from "../../Functions/Screenshot";
import { Youtube2 } from "../../interfaces/youtube2";
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
        const str = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=${this.client.config.Youtube}&maxResults=1&type=channel`
        let item = (await (await fetch(str)).json() as Youtube).items[0]
        let channelId = item?.snippet?.channelId
        if(!item) {
            if(/^(https?:\/\/)/i.test(query)) channelId = query.slice('https://youtube.com/channel/'.length)
            if(!channelId) return message.util?.reply("Not found")
        }
        const { items: [{ snippet,statistics }] } = await (await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${channelId}&key=${this.client.config.Youtube}`)).json() as Youtube2
        function format(n:number){
            return n.toString().split("").reverse().join("").match(new RegExp('.{1,' + 3 + '}', 'g'))?.reverse().map(n => n.split("").reverse().join("")).join(",") as string
        }
        const embed = this.client.embed({
            title: snippet.title,
            description: snippet.description,
            thumbnail: snippet.thumbnails.default,
        },message)
        .addField("Created account at", new Date(snippet.publishedAt).toLocaleDateString(),true)
        .addField("View count",format(parseInt(statistics.viewCount)),true)
        .addField("Upload count",format(parseInt(statistics.videoCount)),true)
        .addField("Subscriber count",statistics.hiddenSubscriberCount ? "Hidden" : format(parseInt(statistics.subscriberCount) ),true)
        .setImage('attachment://Screenshot.png')
        message.util?.reply({ embeds: [embed], ...await Screenshot(`https://youtube.com/channel/${channelId}`) })
    }
}