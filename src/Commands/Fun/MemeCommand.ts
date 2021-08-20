import ExCommand from "../../Struct/Command";
import { advanced } from "imageapi.js";
import { Message } from "discord.js";
export default class MemeCommand extends ExCommand{
    constructor(){
        super("meme",{
            aliases: ["meme"],
            description: "Get a random meme from reddit"
        })
    }
    async exec(message: Message){
        const { title, img: url} = await advanced("dankmemes","top")
        message.reply({
            embeds:[
                this.client.embed({
                    title,
                    url,
                    image: { url }
                },message)
            ]
        })
    }
}