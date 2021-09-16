import { GuildMember,TextChannel } from "discord.js"
import Listener from "../../Struct/Listener"
export default class GuildMemberAddEvent extends Listener{
    constructor(){
        super("guildMemberAdd",{
            emitter: "client",
            event: "guildMemberAdd"
        })
    }
    async exec(member: GuildMember){
        const schema = await this.client.db.load("config")
        const channel = member.guild.channels.cache.get((await schema.findOne({ guildId: member.guild?.id })).welcome) as TextChannel
        if(channel){
            const embeds = {
                embeds: [
                    this.client.embed({
                        thumbnail: { url: member.user.displayAvatarURL() },
                        author: {
                            name: member.user.username,
                            icon_url: member.user.displayAvatarURL()
                        },
                        description: `Welcome ${member.user.toString()} to ${member.guild.name}!!`
                    },{ author: member.user })
                ]
            }
            channel.send(embeds)
        }       
    }
}
