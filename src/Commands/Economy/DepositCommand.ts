import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
export default class DepCommand extends ExCommand{
    constructor(){
        super("deposit",{
            aliases: ["dep","deposit"],
            args:[{
                id: "num",
                type: "number"
            }]
        })
    }
    async exec(message: Message,{ num }: { num: number}){
        if (isNaN(num))
        return message.reply({
          embeds: [
            this.client.embed({ description: `Provide a real number.` }, message),
          ],
        });
      const Schema = await this.client.db.load("userEcos");
      const data =
        (await Schema.findOne({ userId: message.author.id }) ||
        await Schema.create({ userId: message.author.id })) as any
      const walletToken = data["walletJorgeToken"];
      const bankToken = data["bankJorgeToken"];
      if (num > walletToken)
        return message.reply({
          embeds: [
            this.client.embed(
              { description: `You don't have that much money in your wallet.` },
              message
            ),
          ],
        });
      Schema.increment(
        { userId: message.author.id },
        "bankJorgeToken",
        num
      );
      Schema.decrement(
        { userId: message.author.id },
        "walletJorgeToken",
        num
      );
      message.reply({
        embeds: [
          this.client.embed(
            {
              description: `You have deposited ${num} into your bank account.`,
            },
            message
          ),
        ],
      });
    }
}