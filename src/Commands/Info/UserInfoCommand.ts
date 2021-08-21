import ExCommand from "../../Struct/Command";
import { GuildMember, Message,Formatters } from "discord.js";
export default class UserInfoCommand extends ExCommand{
    constructor(){
        super("userinfo",{
            aliases: ["userinfo","ui"],
            description: "Get the info of an user",
            args: [{
                id: "member",
                type: "memberMention"
            }]
        })
    }
    async exec(message: Message,{ member }: {member?: GuildMember}){
        member = member || message.member as GuildMember
        const user = member.user
        const roles = member.roles.cache
       .sort((a, b) => b.position - a.position)
       .map((role) => role.toString())
       .slice(0, -1);
        return message.reply({
            embeds: [
                this.client.embed({
                    author:{
                        name: user.tag,
                        url: user.displayAvatarURL()
                    },
                    fields:[
                        {
                            name: "» Joined At",
                            value: `(${Formatters.time(new Date(member.joinedTimestamp as number))})`,
                            inline: true
                        },
                        {
                            name: "» Registered At",
                            value: `(${Formatters.time(new Date(user.createdTimestamp as number))})`,
                            inline: true
                        },
                        {
                            name: `» Roles [${roles.length}]`,
                            value: `Roles: ${
                              roles.length < 10
                                ? roles.join(" ,")
                                : roles.length > 10
                                ? this.client.trimArray(roles,10)
                                : "None"
                            }`,
                          }
                    ],
                    thumbnail: {
                        url: user.displayAvatarURL()
                    }
                },message)
            ]
        })
    }
}