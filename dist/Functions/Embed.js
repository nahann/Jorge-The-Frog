"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embed = void 0;
const discord_js_1 = require("discord.js");
const embed = (data, message) => {
    return new discord_js_1.MessageEmbed(data).setTimestamp().setColor("RANDOM").setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
};
exports.embed = embed;
