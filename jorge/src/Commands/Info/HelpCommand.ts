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
                  Config: '<:config:854469436306882592>'
                };
          
                if (!command) {

                   const menu = new MessageSelectMenu().setCustomId("helpmenu").addOptions({
                     label: "Main",
                     value: "main"
                   })
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
                  const msg = await message.util?.reply({
                    embeds: [embed],
                    components: [row]
                  }) as Message;
                  const collector = await msg.createMessageComponentCollector({ time: 30000, filter: (interaction) => interaction.user.id == message.author.id,componentType: "SELECT_MENU" })
                  collector.on("collect",(interaction) =>{
                    if(!interaction.isSelectMenu()) return
                    interaction.deferReply({ ephemeral: true })
                    if(interaction.values[0] !== "main"){
                    const category = categories.get(interaction.values[0])
                    embed.setDescription(category?.map(cmd => `\`${cmd.aliases[0]}\``).join(", ") as string).setTitle(`${dirEmojis[category?.id as keyof typeof dirEmojis]} ${category?.id}`)
                    }else{
                      embed.setDescription(categories.map(
                        (category, name) =>
                          `${dirEmojis[name as keyof typeof dirEmojis]} **${name}: **  ${category
                            .map((command) => `\`${command.aliases[0]}\``)
                            .join(", ")}`
                      ).join("\n"))
                    }
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
                if (command.aliases)
                embed.description += `\n**Aliases:** ${command.aliases.slice(1).join(", ")}`
                if (command.description)
                embed.description += `**Description:** ${command.description}`
                if (command.userPermissions)
                embed.description += `**Permissions:** ${command.userPermissions}`

                embed.setAuthor(`Jorge Help Menu`);
                embed
                  .setFooter(`Syntax: [] = required, {} = optional.`)
                message.util?.reply({
                  embeds: [embed],
                });
        }
    }