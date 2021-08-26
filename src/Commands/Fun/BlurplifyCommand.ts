import { Message } from "discord.js";
import ExCommand from "../../Struct/Command";
import fetch from "node-fetch";
export default class BlurplifyCommand extends ExCommand{
    constructor(){
        super("blurple",{
            aliases: ["blurplify","blurple","blurpul"],
            args:[{
                id: "url",
                type: "url"
            }],
            typing: true
        })
    }
    async exec(message: Message,{ url }: {url?: URL}){
        const link = url?.href || message.author.displayAvatarURL({ size: 1024 })
        const { message: msg } = await (await fetch(`https://nekobot.xyz/api/imagegen?type=blurpify&image=${link}`)).json()
        message.util?.reply({
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