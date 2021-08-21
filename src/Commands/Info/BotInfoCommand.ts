import { Message,MessageActionRow,MessageButton } from "discord.js";
import Command from "../../Struct/Command";
import ms from "ms"
export default class BotInfoCommand extends Command{
    constructor(){
        super("botinfo",{
            aliases: ["bot-info","ping","info"],
            description: "Get the information about the bot"
        })
    }
    exec(message: Message){
        const { client } = this
        let memberc = 0;
        client.guilds.cache.forEach((guild) => (memberc += guild.memberCount));
        const embed = client.embed({},message)
          .setAuthor(`Jorge Bot Info`, client.user?.displayAvatarURL())
          .addFields(
            {
              name: `Tag <:tag:854460951805296640>`,
              value: `\`\`\`${client.user?.tag}\`\`\``,
              inline: true,
            },
            {
              name: `Ping <:ping:854461197720748032>`,
              value: `\`\`\`${ms(client.ws.ping)}\`\`\``,
              inline: true,
            },
            {
              name: `Uptime <:uptime:854464688490020875>`,
              value: `\`\`\`${ms(client.uptime as number, { long: true })}\`\`\``,
              //   inline: true
            },
            {
              name: `Users <:users:854458687547899934>`,
              value: `\`\`\`${memberc}\`\`\``,
              inline: true,
            },
            {
              name: `Channels <:channel:854458888131444776>`,
              value: `\`\`\`${client.channels.cache.size}\`\`\``,
              inline: true,
            },
            {
              name: `Guilds <:guilds:854459430733479967>`,
              value: `\`\`\`${client.guilds.cache.size}\`\`\``,
              inline: true
            }
          )
          .setColor("RANDOM")
          .setFooter(message.author.tag, message.author.displayAvatarURL())
          .setTimestamp();
    
        const buttons = new MessageActionRow().addComponents(
          new MessageButton()
            .setLabel("Invite")
            .setURL(
             client.generateInvite({ permissions: ["ADMINISTRATOR"],scopes: ["applications.commands"]})
            )
            .setStyle("LINK")
            .setEmoji("<:support:854951274423910410>"),
    
          new MessageButton()
            .setLabel("Support")
            .setURL("https://discord.gg/K4cMecMQyp")
            .setStyle("LINK")
            .setEmoji("<:invite:854951126025240586>"),
          new MessageButton()
            .setLabel("GitHub Repository")
            .setURL("https://github.com/nahann/Jorge-The-Frog")
            .setStyle("LINK")
            .setEmoji("<:github:854957408585515019>"),
         new MessageButton()
            .setLabel("Vote for us on top.gg")
            .setURL("https://top.gg/bot/838254815225970739")
            .setStyle("LINK")
            .setEmoji("<:rocket:856565446878560276>")
        );
    
        message.reply({
          embeds: [embed],
          components: [buttons],
          allowedMentions: { repliedUser: false },
        });
    }
}