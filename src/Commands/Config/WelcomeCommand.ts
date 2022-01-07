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
    async exec(message: Message,{ channel }: { channel?: TextChannel }){
        const { db } = this.client
        const schema = await db.load("config")
        if(!channel){
            const doc = (await schema.findOne({ guildId: message.guild?.id }) as any)?.welcome
            if(doc){
                schema.update({ guildId: message.guild?.id },{ welcome: null })
                return message.util?.reply("Removed welcome channel")
            }
            else return
        }

        await schema.create({ welcome: channel.id, guildId: message.guild?.id })
        message.util?.reply(`Set the welcome channel to ${channel.toString()}`)
    }   
}