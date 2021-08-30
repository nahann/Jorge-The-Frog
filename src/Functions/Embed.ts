import { MessageEmbed, MessageEmbedOptions,Message } from "discord.js"
import { EmbedFunction } from "../../types"

export const embed: EmbedFunction = (data, { author }) => {
    return new MessageEmbed(data).setTimestamp().setColor("RANDOM").setFooter(`Requested by ${author.tag}`,author.displayAvatarURL())
} 
