import { NewsChannel,Message } from "discord.js";
import Listener from "../../Struct/Listener";
export default class MessageCreateEvent extends Listener{
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message: Message) {
        if(message.channel.id == "852783453606248468" && !message.content.startsWith("//ignore")) message.crosspost()
    }
}