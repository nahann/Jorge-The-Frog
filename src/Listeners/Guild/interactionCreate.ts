import { Interaction } from "discord.js";
import Listener from "../../Struct/Listener";
export default class InteractionCreateEvent extends Listener{
    constructor() {
        super('interactionCreate', {
            emitter: 'client',
            event: 'interactionCreate'
        });
    }

    async exec(interaction: Interaction) {
        if(!interaction.isCommand()) return
        const cmd = this.client.slashes.get(interaction.commandName)
        if(!cmd) return interaction.reply("That command is invalid or deleted.")
        cmd.run(this.client,interaction)
    }
}