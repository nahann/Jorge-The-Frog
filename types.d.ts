import { Message, MessageEmbed, MessageEmbedOptions } from "discord.js"

export type EmbedFunction = (data: MessageEmbedOptions, message: Message) => MessageEmbed
