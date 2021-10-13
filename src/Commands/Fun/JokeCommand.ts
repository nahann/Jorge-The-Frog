import ExCommand from "../../Struct/Command";
import { reddit } from "../../Functions/Reddit";
import { Message } from "discord.js";
export default class JokeCommand extends ExCommand{
    constructor(){
        super("joke",{
            aliases: ["joke"],
            description: "Get a random joke from reddit"
        })
    }
    async exec(message: Message){
        const { title, url,upvote_ratio,author,description } = await reddit("jokes")
        message.util?.reply({
            embeds:[
                this.client.embed({
                    title,
                    url,
                    description,                 
                },message).setFooter(`By ${author}, ${upvote_ratio} upvote ratio`)
            ]
        })
    }
}