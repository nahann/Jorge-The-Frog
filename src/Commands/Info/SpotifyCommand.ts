import ExCommand from "../../Struct/Command";
import { Message, GuildMember } from "discord.js"
export default class SpotifyCommand extends ExCommand{
    constructor(){
        super("spotify",{
            aliases: ["spotify"],
            description: "Get the spotify song someone is listening to",
            args: [{
                id: "member",
                type: "memberMention"
            }]
        })
    }
    async exec(message: Message, { member }: { member?: GuildMember }){
        const presence = (member || message.member as GuildMember).presence?.activities.find(activity => activity.name.toLowerCase() == "spotify")
        if(!presence) return message.util?.reply({
            embeds: [
                this.client.embed({
                    description: `${member?.user.username} isn't currently on Spotify.`
                },message)
            ]
        })
        const url = `https://i.scdn.co/image/${presence.assets?.largeImage?.slice(8)}`
        message.util?.reply({
            embeds: [
                this.client.embed({
                    title: presence.details as string,
                    description: `by ${presence.state} on ${presence.assets?.largeText || "Unknown"}`,
                    thumbnail: { url }
                },message)
            ]
        })
    }
}