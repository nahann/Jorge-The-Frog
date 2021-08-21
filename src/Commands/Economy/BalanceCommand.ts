import ExCommand from "../../Struct/Command";
import { Message, User } from "discord.js";
export default class BalanceCommand extends ExCommand{
    constructor(){
        super("balance",{
            aliases: ["bal","balance"],
            args:[{
                id: "mention",
                type: "memberMention"
            }]
        })
    }
    async exec(message: Message,{ mention }: { mention: User }){
        const user = mention || message.author;
        const Schema = await this.client.db.load("userEcos");
        const data =
          (await Schema.findOne({ userId: user.id }) ||
          await Schema.create({ userId: user.id })) as any
        const walletToken = data.walletShibaToken
        const bankToken = data.bankShibaToken
        message.reply({
          embeds: [
            this.client.embed(
              {
                title: `${user.username}'s wallet`,
                description: `:coin: Wallet: ${walletToken} Shiba Token\n:bank: Bank: ${bankToken} Shiba Token`,
              },
              message
            ),
          ],
        });
    }
}