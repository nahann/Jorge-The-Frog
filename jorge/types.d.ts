import { Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js"

export type EmbedFunction = (data: MessageEmbedOptions, message: Message | { author: User}) => MessageEmbed
