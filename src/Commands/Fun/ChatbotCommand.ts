import ExCommand from "../../Struct/Command";
import { Message,TextChannel } from "discord.js"
export default class ChatbotCommand extends ExCommand{
    constructor(){
        super("chatbot",{
            aliases: ["chatbot"],
            description: "Set the chatbot channel for your server",
            args: [{
                id: "channel",
                type: "channelMention"
            }],
            userPermissions: "MANAGE_GUILD"
        })
    }
    async exec(message: Message,{ channel }: { channel: TextChannel }){
        if(!channel) return
        const { db } = this.client
        const schema = await db.load("chatbot")
        await schema.create({ channelId: channel.id })
        message.util?.reply(`Set the chatbot channel to ${channel.toString()}`)
    }
}