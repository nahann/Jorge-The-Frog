import { Message, MessageEmbed, MessageEmbedOptions, User, MessageOptions } from "discord.js"

export type EmbedFunction = (data: MessageEmbedOptions, { author: User }) => MessageEmbed

export type ScreenshotFunction = (site: string) => Promise<MessageOptions | null>