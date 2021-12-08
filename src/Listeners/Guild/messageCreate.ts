import { Message } from "discord.js";
import Listener from "../../Struct/Listener";
import cleverbot from "cleverbot-free"
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
        const schema = await db.load("config")
        if(await schema.findOne({ chatbot: message.channel.id,guildId: message.guild?.id })){
            const msg = await cleverbot(message.content) 
            message.util?.reply(msg)
        }
    }
}
