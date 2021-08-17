import CMD from "../../Struct/Command"
import { Argument,Command} from "discord-akairo" 
import { Message,Collection } from "discord.js" 
export default class HelpCommand extends CMD {
    constructor() {
        super('help', {
            aliases: ['help',],
            args: [
                {
                    id: 'command',
                    type: 'commandAliases'
                }
            ]
        })
    }

    exec(message: Message, args: Argument) {
            const { client } = this
            const { prefix,modules: commands } = client.commandHandler
            try {
                const data = [];
                const embed = client.embed({},message)
                const categories: Collection<string,Collection<string,Command>> = new Collection();
                commands.forEach((command) => {
                  const category = categories.get(command.category.id);
                  if (category) {
                    category.set(command.aliases[0], command);
                  } else {
                    categories.set(
                      command.category.id,
                      (new Collection().set(command.aliases[0], command) as Collection<string,Command>)
                    );
                  }
                });
          
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
                const lines = categories.map(
                  (category, name) =>
                    `${dirEmojis[name as keyof typeof dirEmojis]} **${name}: **  ${category
                      .map((command) => `\`${command.aliases[0]}\``)
                      .join(", ")}`
                );
          
                if (!args.command) {
                  embed
                    .setAuthor(`Jorge Command List`, message.author.displayAvatarURL())
                    .setDescription(lines.join("\n"))
                    .setThumbnail(client.user?.displayAvatarURL() as string)
                    .setFooter(
                      `You can send \`${prefix[Math.floor(Math.random() * prefix.length) as keyof typeof prefix]}help [command name]\` to get info on a specific command!`
                    )
                    .setColor("RANDOM");
                  return message.reply({
                    embeds: [embed],
                    allowedMentions: { repliedUser: false },
                  });
                }

                const command = args.command
          
                if (!command) {
                  return message.reply("that's not a valid command!");
                }
          
                data.push(`**Name:** ${command.aliases[0]}`);
                // const oldpemrs = `${command.userPermissions.slice(0, 1).toUpperCase() + command.userPermissions.substring(1).toLowerCase()}`
                // const newpemrs = oldpemrs.replace("_", " ")
                if (command.aliases)
                  data.push(`**Aliases:** ${command.aliases.join(", ")}`);
                if (command.description)
                  data.push(`**Description:** ${command.description}`);
                if (command.userPermissions)
                  data.push(`**Permissions:** ${command.userPermissions}`);

                embed.setAuthor(`Jorge Help Menu`);
                embed.setDescription(data.join("\n"));
                embed
                  .setFooter(`Syntax: [] = required, {} = optional.`)
                  .setColor("RANDOM");
                message.reply({
                  embeds: [embed],
                  allowedMentions: { repliedUser: false },
                });
              } catch (e) {
                message.reply({
                  embeds: [
                    client.embed(
                      { title: "Error Caught!", description: `${e}` },
                      message
                    ),
                  ],
                });
              }
        }
    }