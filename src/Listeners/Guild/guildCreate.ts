import { Guild, TextChannel } from "discord.js";
import Listener from "../../Struct/Listener";
export default class GuildCreateEvent extends Listener{
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild: Guild) {
        const main = this.client.guilds.cache.get("849131192275566613") as Guild
        (main.channels.cache.get("854479020028723210") as TextChannel).send({
            embeds: [
                this.client.embed({
                    title: "New server!",
                    fields: [{
                        name: "Name",
                        value: guild.name
                    },{
                        name: "Membercount",
                        value: guild.memberCount.toString()
                    }]
                },{
                    author: (await guild.fetchOwner()).user
                })
            ]
        })
    }
}