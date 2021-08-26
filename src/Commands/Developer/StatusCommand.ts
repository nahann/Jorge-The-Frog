import { Message, ActivityType } from "discord.js";
import Command from "../../Struct/Command";
export default class StatusCommand extends Command{
    constructor(){
        super("status",{
            aliases:["status","presence"],
            ownerOnly: true,
            description: "Set the status of the bot",
            args: [{
                id: "status",
                type: "string",
                match: "rest",
                default: "hi"
            },{
                id: "type",
                type: "string",
                match: "option",
                default: "PLAYING",
                flag: "--type="            
            }]
        })
    }
    exec(message: Message,{ status,type }: { status: string,type: string }){
        const { client } = this
        type = (type).toUpperCase()
        const types = ["PLAYING","WATCHING","STREAMING","LISTENING","COMPETING"]
        if(!types.includes(type)) return
        client.user?.setActivity(status,{ type: (type as ActivityType) })
        message.util?.reply({ embeds: [client.embed({title: "Success"},message)]})
    }
}