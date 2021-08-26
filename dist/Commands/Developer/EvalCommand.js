"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = __importDefault(require("../../Struct/Command"));
const util_1 = require("util");
class EvalCommand extends Command_1.default {
    constructor() {
        super("eval", {
            aliases: ["eval", "ev"],
            ownerOnly: true,
            description: "Evaluate a piece of code",
            args: [{
                    id: "code",
                    type: "string",
                    match: "rest",
                    default: "client.user.username"
                }]
        });
    }
    exec(message, { code }) {
        const { client } = this;
        const cd = code
            .replace(new RegExp("client.token", "g"), "()")
            .replace(/”/g, '"')
            .replace(/“/g, '"');
        const evaled = discord_js_1.Util.splitMessage(util_1.inspect(eval(cd), { depth: 0 }))[0];
        message.reply({ embeds: [client.embed({ title: "Eval success", description: `\`\`\`\n${evaled}\`\`\`` }, message)] });
    }
}
exports.default = EvalCommand;
