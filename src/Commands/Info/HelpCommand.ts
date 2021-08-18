import CMD from "../../Struct/Command"
import { Command } from "discord-akairo" 
import { Message,MessageActionRow,MessageSelectMenu } from "discord.js" 
export default class HelpCommand extends CMD {
    constructor() {
        super('help', {
            aliases: ['help',],
            args: [
                {
                    id: 'command',
                    type: 'commandAliases'
                }
            ],
            description: "Help cmd"
        })
    }

    async exec(message: Message, { command } : { command?: Command}) {
            const { client } = this
            const { prefix, categories } = client.commandHandler
                const data = [];
                const embed = client.embed({},message)
          
                const dirEmojis = {
                  Developer: "<:dev:854466327976345602>",
                  Fun: "<:fun:854470205978443789>",
                  "Guild Config": "<:config:854469436306882592>",
                  Info: "<:info:854469078433792020>",
                  Moderation: "<:mod:854469924088446996>",
                  Userinfo: "<:users:854458687547899934>",
                  Economy: "<:ec:854466932551450644>",
                  Music: "<:music:855134047205720104>",
                  Leveling: "<:rocket:856565446878560276>",
                };
          
                if (!command) {

                   const menu = new MessageSelectMenu().setCustomId("helpmenu")
                   categories.map(cat => menu.addOptions({
                     label: cat.id,
                     value: cat.id
                   }))
                   const row = new MessageActionRow().addComponents(menu)
                    embed
                    .setAuthor(`Jorge Command List`, message.author.displayAvatarURL())
                    .setDescription(`Choose a category in the select menu. Note that this only works for 30 seconds.\nOptions:\n ${categories.map( cat => `${dirEmojis[cat.id as keyof typeof dirEmojis]} ${cat.id}` ).join("\n")}`)
                    .setFooter(
                      `You can send \`${prefix[Math.floor(Math.random() * prefix.length) as keyof typeof prefix]}help [command name]\` to get info on a specific command!`
                    )
                  const msg = await message.reply({
                    embeds: [embed],
                    components: [row]
                  });
                  const collector = await msg.createMessageComponentCollector({ time: 30000, filter: (interaction) => interaction.user.id == message.author.id,componentType: "SELECT_MENU" })
                  collector.on("collect",(interaction) =>{
                    if(!interaction.isSelectMenu()) return
                    interaction.reply({ content: "Success", ephemeral: true})
                    const category = categories.get(interaction.values[0])
                    embed.setDescription(category?.map(cmd => `\`${cmd.aliases[0]}\``).join(", ") as string).setTitle(`${dirEmojis[category?.id as keyof typeof dirEmojis]} ${category?.id}`)
                    msg.edit({
                      embeds: [embed],
                      components: [row]
                    })
                  })
                  collector.on("end",(collected)=>{
                    embed.setFooter("Expired")
                    msg.edit({
                      embeds: [embed],
                      components: [new MessageActionRow({ components: row.components.map(c => c.setDisabled()) })]
                    })
                  })
                  return
                }
          
                data.push(`**Name:** ${command.aliases[0]}`);
                if (command.aliases)
                  data.push(`**Aliases:** ${command.aliases.slice(1).join(", ")}`);
                if (command.description)
                  data.push(`**Description:** ${command.description}`);
                if (command.userPermissions)
                  data.push(`**Permissions:** ${command.userPermissions}`);

                embed.setAuthor(`Jorge Help Menu`);
                embed.setDescription(data.join("\n"));
                embed
                  .setFooter(`Syntax: [] = required, {} = optional.`)
                message.reply({
                  embeds: [embed],
                });
        }
    }