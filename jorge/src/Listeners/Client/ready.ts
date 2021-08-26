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
        client.commandHandler.categories.map(category =>{
            client.console.success(category.id)
            const commands = [...category.values()]
            client.console.log(commands.join("\n"))
        });
        (client.guilds.cache.get("849131192275566613")?.channels.cache.get("853033512500461613") as TextChannel).send("im alive xd")
    }
}