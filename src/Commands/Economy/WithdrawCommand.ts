import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
export default class WithDrawCommand extends ExCommand{
    constructor(){
        super("withdraw",{
            aliases: ["withdraw","with"],
            args:[{
                id: "num",
                type: "number",
                default: "5"
            }]
        })
    }
    async exec(message: Message,{num}:{num: number}){
        if (isNaN(num))
        return message.util?.reply({
          embeds: [
            this.client.embed({ description: `Provide a real number.` }, message),
          ],
        });
      const Schema = await this.client.db.load("userEcos");
      const data =
        (await Schema.findOne({ userId: message.author.id }) ||
        await Schema.create({ userId: message.author.id })) as any;
      const walletToken = data["walletJorgeToken"];
      const bankToken = data["bankJorgeToken"];
      if (num > bankToken)
        return message.util?.reply({
          embeds: [
            this.client.embed(
              {
                description: `You don't have that much money in your bank account.`,
              },
              message
            ),
          ],
        });
      Schema.decrement({ userId: message.author.id }, "bankJorgeToken", num);
      Schema.increment(
        { userId: message.author.id },
        "walletJorgeToken",
        num
      );
      message.util?.reply({
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