"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const child_process_1 = require("child_process");
class EvalCommand extends Command_1.default {
    constructor() {
        super("console", {
            aliases: ["console", "shell"],
            ownerOnly: true,
            description: "Run a shell command in discord",
            args: [{
                    id: "code",
                    type: "string",
                    match: "rest",
                    default: "ls"
                }]
        });
    }
    exec(message, { code }) {
        child_process_1.exec(code, (stdout, error) => {
            message.reply({
                embeds: [
                    this.client.embed({
                        description: `Output: \`\`\`\n${stdout || error}\`\`\``
                    }, message)
                ]
            });
        });
    }
}
exports.default = EvalCommand;
