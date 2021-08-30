import { Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js"

export type EmbedFunction = (data: MessageEmbedOptions, { author: User }) => MessageEmbed
