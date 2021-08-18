import { MessageEmbed, MessageEmbedOptions,Message } from "discord.js"
import { EmbedFunction } from "../../types"

export const embed: EmbedFunction = (data, message) => {
    return new MessageEmbed(data).setTimestamp().setColor("RANDOM").setFooter(`Requested by ${message.author.tag}`,message.author.displayAvatarURL())
} 
