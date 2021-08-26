"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
class SayCommand extends Command_1.default {
    constructor() {
        super("say", {
            aliases: ["say", "echo"],
            ownerOnly: true,
            args: [{
                    id: "msg",
                    type: "string",
                    default: "hi"
                }]
        });
    }
    async exec(message, { msg }) {
        if (message.guild?.me?.permissions.has("MANAGE_MESSAGES"))
            message.delete();
        message.channel.send(msg);
    }
}
exports.default = SayCommand;
