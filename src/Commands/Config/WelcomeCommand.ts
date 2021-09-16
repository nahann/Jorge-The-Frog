import ExCommand from "../../Struct/Command";
import { Message, TextChannel } from "discord.js";
export default class WelcomeCommand extends ExCommand{
    constructor(){
        super("welcome",{
            aliases: ["welcome"],
            description: "Set the welcome channel for your server",
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
        const schema = await db.load("config")
        await schema.create({ welcome: channel.id, guildId: message.guild?.id })
        message.util?.reply(`Set the welcome channel to ${channel.toString()}`)
    }   
}