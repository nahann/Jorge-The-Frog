import { Message } from "discord.js";
import Listener from "../../Struct/Listener";
import Command from "../../Struct/Command";
export default class ErrorEvent extends Listener{
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    exec(e: Error,message: Message,command: Command) {
        this.client.console.error(e)
        return message.util?.reply({
            embeds: [
                this.client.embed({
                    title: `Error occured while running command ${command.id || "unknown"}`,
                    description: `\`\`\`\n${e.stack}\`\`\``
                },message).setColor("RED")
            ]
        })
    }
}