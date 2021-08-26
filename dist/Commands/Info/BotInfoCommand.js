"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../Struct/Command"));
const ms_1 = __importDefault(require("ms"));
class BotInfoCommand extends Command_1.default {
    constructor() {
        super("botinfo", {
            aliases: ["botinfo", "ping"],
            description: "Get the information about the bot"
        });
    }
    exec(message) {
        const { client } = this;
        let memberc = 0;
        client.guilds.cache.forEach((guild) => (memberc += guild.memberCount));
        const embed = client.embed({}, message)
            .setAuthor(`Shiba Bot Info`, client.user?.displayAvatarURL())
            .addFields({
            name: `Tag <:tag:854460951805296640>`,
            value: `\`\`\`${client.user?.tag}\`\`\``,
            inline: true,
        }, {
            name: `Ping <:ping:854461197720748032>`,
            value: `\`\`\`${ms_1.default(client.ws.ping)}\`\`\``,
            inline: true,
        }, {
            name: `Uptime <:uptime:854464688490020875>`,
            value: `\`\`\`${ms_1.default(client.uptime, { long: true })}\`\`\``,
            //   inline: true
        }, {
            name: `Users <:users:854458687547899934>`,
            value: `\`\`\`${memberc}\`\`\``,
            inline: true,
        }, {
            name: `Channels <:channel:854458888131444776>`,
            value: `\`\`\`${client.channels.cache.size}\`\`\``,
            inline: true,
        }, {
            name: `Guilds <:guilds:854459430733479967>`,
            value: `\`\`\`${client.guilds.cache.size}\`\`\``,
            inline: true
        })
            .setColor("RANDOM")
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp();
        const buttons = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setLabel("Invite")
            .setURL(client.generateInvite({ permissions: ["ADMINISTRATOR"], scopes: ["applications.commands"] }))
            .setStyle("LINK")
            .setEmoji("<:support:854951274423910410>"), new discord_js_1.MessageButton()
            .setLabel("Support")
            .setURL("https://discord.gg/K4cMecMQyp")
            .setStyle("LINK")
            .setEmoji("<:invite:854951126025240586>"), new discord_js_1.MessageButton()
            .setLabel("GitHub Repository")
            .setURL("https://github.com/nahann/Shiba")
            .setStyle("LINK")
            .setEmoji("<:github:854957408585515019>"), new discord_js_1.MessageButton()
            .setLabel("Vote for us on top.gg")
            .setURL("https://top.gg/bot/838254815225970739")
            .setStyle("LINK")
            .setEmoji("<:rocket:856565446878560276>"));
        message.reply({
            embeds: [embed],
            components: [buttons],
            allowedMentions: { repliedUser: false },
        });
    }
}
exports.default = BotInfoCommand;