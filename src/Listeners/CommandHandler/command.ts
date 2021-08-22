import { Message,TextChannel } from "discord.js";
import Listener from "../../Struct/Listener";
import Command from "../../Struct/Command";
export default class CommandEvent extends Listener{
    constructor() {
        super('commandStarted', {
            emitter: 'commandHandler',
            event: 'commandStarted'
        });
    }

    exec(message: Message,command: Command) {
        const channel = this.client.guilds.cache.get("849131192275566613")?.channels.cache.get("860179405824983090")
        return (channel as TextChannel)?.send({
            embeds: [
                this.client.embed({
                    title: `Command executed`,
                    fields: [{
                        name: "Command name",
                        value: command.id,
                        inline: true
                    },{
                        name: "Guild name",
                        value: message.guildId as string,
                        inline: true
                    },{
                        name: "Author ID",
                        value: message.author.id,
                        inline: true
                    }]
                },message).setColor("BLUE")
            ]
        })
    }
}