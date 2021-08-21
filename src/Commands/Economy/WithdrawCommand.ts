import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
export default class WithDrawCommand extends ExCommand{
    constructor(){
        super("withdraw",{
            aliases: ["withdraw","with"],
            args:[{
                id: "num",
                type: "number"
            }]
        })
    }
    async exec(message: Message,{num}:{num: number}){
        if (isNaN(num))
        return message.reply({
          embeds: [
            this.client.embed({ description: `Provide a real number.` }, message),
          ],
        });
      const Schema = await this.client.db.load("userEcos");
      const data =
        (await Schema.findOne({ userId: message.author.id }) ||
        await Schema.create({ userId: message.author.id })) as any;
      const walletToken = data["walletShibaToken"];
      const bankToken = data["bankShibaToken"];
      if (num > bankToken)
        return message.reply({
          embeds: [
            this.client.embed(
              {
                description: `You don't have that much money in your bank account.`,
              },
              message
            ),
          ],
        });
      Schema.decrement({ userId: message.author.id }, "bankShibaToken", num);
      Schema.increment(
        { userId: message.author.id },
        "walletShibaToken",
        num
      );
      message.reply({
        embeds: [
          this.client.embed(
            {
              description: `You have withdrawed ${num} from your bank account.`,
            },
            message
          ),
        ],
      });
    }
}