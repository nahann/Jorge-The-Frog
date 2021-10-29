import { Guild, TextChannel } from "discord.js";
import Listener from "../../Struct/Listener";
export default class GuildDeleteEvent extends Listener{
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild: Guild) {
        console.log(guild)
        const main = this.client.guilds.cache.get("849131192275566613") as Guild
        (main.channels.cache.get("854479020028723210") as TextChannel).send({
            embeds: [
                this.client.embed({
                    title: "We lost a server.",
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
