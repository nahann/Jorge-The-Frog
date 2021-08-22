import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
export default class BegCommand extends ExCommand{
    constructor(){
        super("beg",{
            aliases: ["beg"]
        })
    }
    async exec(message: Message){
        const schema = await this.client.db.load("userEcos");
          (await schema.findOne({ userId: message.author.id })) ||
          (await schema.create({ userId: message.author.id }));
        const tokens = Math.floor(Math.random() * 25);
        schema.increment({ userId: message.author.id }, "walletJorgeToken", tokens);
        message.util.reply({
          embeds: [
            this.client.embed(
              { description: `You begged and got ${tokens} Jorge Token` },
              message
            ),
          ],
        });
    }
}