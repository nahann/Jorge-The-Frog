import { Message } from "discord.js";
import Listener from "../../Struct/Listener";
import chat from "cleverbot-free"
export default class MessageCreateEvent extends Listener{
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message: Message) {
        if(message.channel.id == "852783453606248468" && !message.content.startsWith("//ignore")) message.crosspost()
        const { db } = this.client
        const schema = await db.load("chatbot")
        if(schema.findOne({ channelId: message.channel.id })){
            message.util?.reply(await chat(message.content))
        }
    }
}