import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
export default class SayCommand extends ExCommand{
    constructor(){
        super("say",{
            aliases: ["say","echo"],
            ownerOnly: true,
            args: [{
                id: "msg",
                type: "string",
                default: "hi"
            }]
        })
    }
    async exec(message: Message,{msg}: {msg:string}){
        if(message.guild?.me?.permissions.has("MANAGE_MESSAGES")) message.delete()
        message.channel.send(msg)
    }
}