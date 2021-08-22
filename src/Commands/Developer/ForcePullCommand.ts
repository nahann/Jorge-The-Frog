import { Message, Util } from "discord.js";
import Command from "../../Struct/Command";
import { exec } from "child_process"
export default class EvalCommand extends Command{
    constructor(){
        super("forcepull",{
            aliases:["pull","force-pull"],
            ownerOnly: true,
            description: "Pull and restart",
        })
    }
    exec(message: Message){
        exec("cd /root/Jorge && git pull && pm2 restart 0",(stdout,error)=>{
            message.util?.reply({
                embeds:[
                    this.client.embed({
                        description: `Output: \`\`\`\n${stdout || error}\`\`\``
                    },message)
                ]
            })
        })
    }
} 