"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const javascript_obfuscator_1 = require("javascript-obfuscator");
class ObfuscateCommand extends Command_1.default {
    constructor() {
        super("Obfuscate", {
            aliases: ["obfuscate"],
            description: "Obfuscate javascript code",
            args: [{
                    id: "code",
                    type: "string",
                    default: "\"nerd\""
                }]
        });
    }
    async exec(message, { code }) {
        const obfuscation = javascript_obfuscator_1.obfuscate(code).getObfuscatedCode();
        message.reply({
            embeds: [
                this.client.embed({ description: obfuscation.length > 2048 ? "too long xd" : `\`\`\`\n${obfuscation}\`\`\`` }, message)
            ]
        });
    }
}
exports.default = ObfuscateCommand;
