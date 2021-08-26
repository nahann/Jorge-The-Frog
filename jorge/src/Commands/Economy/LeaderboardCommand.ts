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
          (a: any, b: any) => b.walletJorgeToken - a.walletJorgeToken
        );
        return message.util?.reply({
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
                title: `Jorge Economy Leaderboard`,
                description: leaderboard
                  .map((value: any, index) => {
                    return `:coin: ${value.walletJorgeToken} Jorge Token - ${
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