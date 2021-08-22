import { Message } from "discord.js";
import Listener from "../../Struct/Listener";
import Command from "../../Struct/Command";
import ms from "ms"
export default class CooldownEvent extends Listener{
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    exec(message: Message,command: Command,remaining: number) {
        return message.util.reply({
            embeds: [
                this.client.embed({
                    title: `P A T I E N C E `,
                    description: `You're on cooldown. you have ${ms(remaining)} till you can run ${command.id} again.`
                },message).setColor("RED")
            ]
        })
    }
}