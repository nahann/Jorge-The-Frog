"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const discord_js_1 = require("discord.js");
class UserInfoCommand extends Command_1.default {
    constructor() {
        super("userinfo", {
            aliases: ["userinfo", "ui"],
            description: "Get the info of an user",
            args: [{
                    id: "member",
                    type: "memberMention"
                }]
        });
    }
    async exec(message, { member }) {
        member = member || message.member;
        const user = member.user;
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((role) => role.toString())
            .slice(0, -1);
        return message.reply({
            embeds: [
                this.client.embed({
                    author: {
                        name: user.tag,
                        url: user.displayAvatarURL()
                    },
                    fields: [
                        {
                            name: "» Joined At",
                            value: `(${discord_js_1.Formatters.time(new Date(member.joinedTimestamp))})`,
                            inline: true
                        },
                        {
                            name: "» Registered At",
                            value: `(${discord_js_1.Formatters.time(new Date(user.createdTimestamp))})`,
                            inline: true
                        },
                        {
                            name: `» Roles [${roles.length}]`,
                            value: `Roles: ${roles.length < 10
                                ? roles.join(" ,")
                                : roles.length > 10
                                    ? this.client.trimArray(roles, 10)
                                    : "None"}`,
                        }
                    ],
                    thumbnail: {
                        url: user.displayAvatarURL()
                    }
                }, message)
            ]
        });
    }
}
exports.default = UserInfoCommand;
