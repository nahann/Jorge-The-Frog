"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class BlurplifyCommand extends Command_1.default {
    constructor() {
        super("blurple", {
            aliases: ["blurplify", "blurple", "blurpul"],
            args: [{
                    id: "url",
                    type: "url"
                }]
        });
    }
    async exec(message, { url }) {
        message.channel.sendTyping();
        const link = url?.href || message.author.displayAvatarURL({ size: 1024 });
        const { message: msg } = await (await node_fetch_1.default(`https://nekobot.xyz/api/imagegen?type=blurpify&image=${link}`)).json();
        message.reply({
            embeds: [
                this.client.embed({
                    image: {
                        url: msg
                    }
                }, message)
            ]
        });
    }
}
exports.default = BlurplifyCommand;
