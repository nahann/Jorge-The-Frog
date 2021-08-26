import { Calculator } from "../../Functions/Calculator"
import ExCommand from "../../Struct/Command"
import { Message,MessageEmbed } from "discord.js"
export default class CalculatorCommand extends ExCommand{
    constructor(){
        super("calculator",{
            aliases: ["calculator","calc"]
        })
    }
    async exec(message: Message){
        await Calculator({
            message,
            embed: new MessageEmbed()
        })
    }
}