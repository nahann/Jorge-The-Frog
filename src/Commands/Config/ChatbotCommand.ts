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
    async exec(message: Message,{ channel }: { channel?: TextChannel }){
        const { db } = this.client
        const schema = await db.load("config")
        if(!channel){
            const doc = (await schema.findOne({ guildId: message.guild?.id }))?.chatbot
            if(doc){
                schema.update({ guildId: message.guild?.id },{ chatbot: null })
                return message.util?.reply("Removed chatbot channel")
            }
            else return
        }
        await schema.create({ chatbot: channel.id, guildId: message.guild?.id })
        message.util?.reply(`Set the chatbot channel to ${channel.toString()}`)
    }
}