import ExCommand from "../../Struct/Command";
import { reddit } from "../../Functions/Reddit";
import { Message } from "discord.js";
export default class MemeCommand extends ExCommand{
    constructor(){
        super("meme",{
            aliases: ["meme"],
            description: "Get a random meme from reddit"
        })
    }
    async exec(message: Message){
        const { title, img, url,upvote_ratio,author } = await reddit("dankmemes")
        message.util?.reply({
            embeds:[
                this.client.embed({
                    title,
                    url,
                    image: { url: img },
                    footer: { text: `By ${author}, ${upvote_ratio} upvote ratio` }
                },message)
            ]
        })
    }
}