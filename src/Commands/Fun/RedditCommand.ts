import ExCommand from "../../Struct/Command";
import { reddit } from "../../Functions/Reddit";
import { Message } from "discord.js";
export default class RedditCommand extends ExCommand{
    constructor(){
        super("reddit",{
            aliases: ["reddit"],
            description: "Get a random post from reddit",
            args: [{
                id: "subreddit",
                type: "STRING"
            }]
        })
    }
    async exec(message: Message,{ subreddit }: { subreddit: string }){
        if(subreddit == "dankmemes") return message.util?.reply("You can use `;meme` to get a meme!")
        if(subreddit == "jokes") return message.util?.reply("You can use `;joke` to get a joke!")
        const post = await reddit(subreddit)
        if(post.message) return message.util?.reply(post.message)
        const embed = this.client.embed({url: post.url},message)
        if(post.title) embed.title = post.title
        if(post.description) embed.description = post.description
        if(post.img) embed.setImage(post.img)
        message.util?.reply({
            embeds:[
                embed     
            ]
        })
    }
}