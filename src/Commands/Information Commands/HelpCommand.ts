import Command from "../../Struct/Command";
import { Argument } from "discord-akairo" 
import Client from "../../Struct/Client"
import { Message } from "discord.js" 
export default class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['ping'],
            args: [
                {
                    id: 'command',
                    type: 'commandAliases'
                }
            ]
        })
    }

    exec(message: Message, args: Argument) {
        if(!args.command) {
            let embed = (this.client as Client).embed() 
        }
    }
} 