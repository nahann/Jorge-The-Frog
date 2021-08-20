import { Message, TextChannel } from "discord.js";
import ExCommand from "../../Struct/Command";
import fetch from "node-fetch";
export default class BlurplifyCommand extends ExCommand{
    constructor(){
        super("blurple",{
            aliases: ["blurplify","blurple","blurpul"],
            args:[{
                id: "url",
                type: "url"
            }]
        })
    }
    async exec(message: Message,{ url }: {url?: URL}){
        (message.channel as TextChannel).sendTyping()
        const link = url?.href || message.author.displayAvatarURL({ size: 1024 })
        const { message: msg } = await (await fetch(`https://nekobot.xyz/api/imagegen?type=blurpify&image=${link}`)).json()
        message.reply({
            embeds:[
                this.client.embed({
                image: {
                    url: msg
                }
            },message)
            ]
        })
    }
}