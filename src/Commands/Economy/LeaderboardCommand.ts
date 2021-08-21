import ExCommand from "../../Struct/Command";
import { Message } from "discord.js";
export default class LeaderBoardCommand extends ExCommand{
    constructor(){
        super("leaderboard",{
            aliases: ["leaderboard","lb"]
        })
    }
    async exec(message: Message){
        const Schema = await this.client.db.load("userEcos");
        const leaderboard = await Schema.leaderboard(
          (a: any, b: any) => b.walletShibaToken - a.walletShibaToken
        );
        return message.reply({
          embeds: [
            this.client.embed(
              {
                fields: [
                  {
                    name: "⠀",
                    value:
                      "This displays the users with the most money in their wallets.",
                  },
                ],
                title: `Shiba Economy Leaderboard`,
                description: leaderboard
                  .map((value: any, index) => {
                    return `:coin: ${value.walletShibaToken} Shiba Token - ${
                      this.client.users.cache.get(value?.userId)?.tag || "Unknown User"
                    }`;
                  })
                  .join("\n"),
              },
              message
            ),
          ],
        });
    }
}