import { TextChannel } from "discord.js";
import Listener from "../../Struct/Listener";
export default class ReadyEvent extends Listener{
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const { client } = this
        client.console.ready(`${this.client.user?.tag} is now online`);
        client.slashes.map(async command =>{
            if(command.guild) return client.guilds.cache.get("849131192275566613")?.commands.create(command)
            await client.application?.commands.fetch()
            if(client.application?.commands.cache.find(c => {
                return c.name == command.name && c.description == command.description && c.options == command.optiosn
            })) return
            client.application?.commands.create(command)
        });
        (client.guilds.cache.get("849131192275566613")?.channels.cache.get("853033512500461613") as TextChannel).send("im alive xd")
    }
}