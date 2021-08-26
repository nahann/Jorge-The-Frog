import ExCommand from "../../Struct/Command";
import { Message } from "discord.js"
import { GuildConfigs } from "../../Database/Schemas";

export default class PrefixCommand extends ExCommand{
    constructor(){
        super("prefix",{
            aliases: ["prefix"],
            description: "Change the prefix",
            args: [{
                id: "prefix",
                type: "STRING"
            }],
        })
    }
    async exec(message: Message, { prefix }: { prefix: string }){
        if(!message.guild) return;
        try {
            await GuildConfigs.findOne({ guildId: message.guild.id }) ? await GuildConfigs.findOneAndUpdate({ guildId: message.guild.id },{ prefix },{ new: true }) : await new GuildConfigs({ guildId: message.guild.id, prefix }).save()
        } catch (e) {
            console.error(e.message)
        }
        message.util?.reply(`updated prefix to: \`${prefix}\``)
    }
}