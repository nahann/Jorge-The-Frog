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
                    type: 'commandAlias'
                }
            ],
            description: "Help cmd"
        })
    }

    async exec(message: Message, { command } : { command?: Command}) {
            const { client } = this
            const { prefix, categories } = client.commandHandler
                const embed = client.embed({},message)
          
                const dirEmojis = {
                  Developer: "<:dev:854466327976345602>",
                  Fun: "<:fun:854470205978443789>",
                  Info: "<:info:854469078433792020>",
                  Moderation: "<:mod:854469924088446996>",
                  Economy: "<:ec:854466932551450644>",
                  Config: "<:config:854469436306882592>"
                };
          
                if (!command) {

                   const menu = new MessageSelectMenu().setCustomId("helpmenu").addOptions({
                     label: "Main",
                     value: "main",
                     default: true
                   })
                   categories.map(cat => menu.addOptions({
                     label: cat.id,
                     value: cat.id
                   }))
                   const row = new MessageActionRow().addComponents(menu)
                    embed
                    .setAuthor(`Jorge Command List`, message.author.displayAvatarURL())
                    .setDescription(categories.map(
                      (category, name) =>
                        `${dirEmojis[name as keyof typeof dirEmojis]} **${name}: **  ${category
                          .map((command) => `\`${command.aliases[0]}\``)
                          .join(", ")}`
                    ).join("\n"))
                    .setFooter(
                      `You can send \`${prefix[Math.floor(Math.random() * prefix.length) as keyof typeof prefix]}help [command name]\` to get info on a specific command!`
                    )
                  const msg = await message.util?.reply({
                    embeds: [embed],
                    components: [row]
                  }) as Message;
                  const collector = await msg.createMessageComponentCollector({ time: 30000, filter: (interaction) => interaction.user.id == message.author.id,componentType: "SELECT_MENU" })
                  collector.on("collect",(interaction) =>{
                    if(!interaction.isSelectMenu()) return
                    const category = categories.get(interaction.values[0])
                    embed.setDescription(category?.map(cmd => `\`${cmd.aliases[0]}\``).join(", ") as string).setTitle(`${dirEmojis[category?.id as keyof typeof dirEmojis]} ${category?.id}`)
                    interaction.reply({ content: "Selection seen. Don't complain about this message, discord is a dick and doesn't let us just not reply to interactions. look at the help message to see your selection, not here.",ephemeral:true})                    
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
                embed.description = ""
                embed.description += `\n**Name:** ${command.aliases[0]}`
                if (command.aliases?.length > 1)
                embed.description += `\n**Aliases:** ${command.aliases?.slice(1).join(", ") || "None"}`
                if (command.description)
                embed.description += `\n**Description:** ${command.description}`
                if (command.userPermissions)
                embed.description += `\n**Permissions:** ${command.userPermissions}`

                embed.setAuthor(`Jorge Help Menu`);
                embed
                  .setFooter(`Syntax: [] = required, {} = optional.`)
                message.util?.reply({
                  embeds: [embed],
                });
        }
    }