"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const discord_js_1 = require("discord.js");
class HelpCommand extends Command_1.default {
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
        });
    }
    async exec(message, { command }) {
        const { client } = this;
        const { prefix, categories } = client.commandHandler;
        const data = [];
        const embed = client.embed({}, message);
        const dirEmojis = {
            Developer: "<:dev:854466327976345602>",
            Fun: "<:fun:854470205978443789>",
            Info: "<:info:854469078433792020>",
            Moderation: "<:mod:854469924088446996>",
            Economy: "<:ec:854466932551450644>"
        };
        if (!command) {
            const menu = new discord_js_1.MessageSelectMenu().setCustomId("helpmenu").addOptions({
                label: "Main",
                value: "main"
            });
            categories.map(cat => menu.addOptions({
                label: cat.id,
                value: cat.id
            }));
            const row = new discord_js_1.MessageActionRow().addComponents(menu);
            embed
                .setAuthor(`Jorge Command List`, message.author.displayAvatarURL())
                .setDescription(`Choose a category in the select menu. Note that this only works for 30 seconds.\nOptions:\n ${categories.map(cat => `${dirEmojis[cat.id]} ${cat.id}`).join("\n")}`)
                .setFooter(`You can send \`${prefix[Math.floor(Math.random() * prefix.length)]}help [command name]\` to get info on a specific command!`);
            const msg = await message.reply({
                embeds: [embed],
                components: [row]
            });
            const collector = await msg.createMessageComponentCollector({ time: 30000, filter: (interaction) => interaction.user.id == message.author.id, componentType: "SELECT_MENU" });
            collector.on("collect", (interaction) => {
                if (!interaction.isSelectMenu())
                    return;
                interaction.deferReply({ ephemeral: true });
                if (interaction.values[0] !== "main") {
                    const category = categories.get(interaction.values[0]);
                    embed.setDescription(category?.map(cmd => `\`${cmd.aliases[0]}\``).join(", ")).setTitle(`${dirEmojis[category?.id]} ${category?.id}`);
                }
                else {
                    embed.setDescription(categories.map((category, name) => `${dirEmojis[name]} **${name}: **  ${category
                        .map((command) => `\`${command.aliases[0]}\``)
                        .join(", ")}`).join("\n"));
                }
                msg.edit({
                    embeds: [embed],
                    components: [row]
                });
            });
            collector.on("end", (collected) => {
                embed.setFooter("Expired");
                msg.edit({
                    embeds: [embed],
                    components: [new discord_js_1.MessageActionRow({ components: row.components.map(c => c.setDisabled()) })]
                });
            });
            return;
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
            .setFooter(`Syntax: [] = required, {} = optional.`);
        message.reply({
            embeds: [embed],
        });
    }
}
exports.default = HelpCommand;
