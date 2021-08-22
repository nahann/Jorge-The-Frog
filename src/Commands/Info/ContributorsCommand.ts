import ExCommand from "../../Struct/Command";
import { Message } from "discord.js"
import fetch from "node-fetch"
export default class ContributorsCommand extends ExCommand{
    constructor(){
        super("contributors",{
            aliases: ["contributors"],
            description: "List the contributors for Shiba"
        })
    }
    async exec(message: Message){
        const { config } = this.client
        const json = await (
            await fetch("https://api.github.com/repos/nahann/Jorge-The-Frog/contributors", {
              method: "GET",
              headers: {
                Authorization: `token ${config.PAT}`,
              },
            })
          ).json();
        console.log(JSON.stringify(json))
        const contributors = json.map(
            (contributor: any) =>
              new Object({
                name: contributor.login,
                value: `[Click me to visit their GitHub](${contributor.html_url})`,
                inline: true,
              })
          );
      
          const embed = this.client.embed({title: "All the contributors that are helping make Jorge awesome!",description:               "Be sure to drop a star on the repo, [here!](https://github.com/nahann/Jorge-The-Frog)"},message)
            .addFields(contributors)
      
          message.reply({ embeds: [embed] });
    }
}