"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
class StatusCommand extends Command_1.default {
    constructor() {
        super("status", {
            aliases: ["status", "presence"],
            ownerOnly: true,
            description: "Set the status of the bot",
            args: [{
                    id: "status",
                    type: "string",
                    match: "rest",
                    default: "hi"
                }, {
                    id: "type",
                    type: "string",
                    match: "option",
                    default: "PLAYING",
                    flag: "--type="
                }]
        });
    }
    exec(message, { status, type }) {
        const { client } = this;
        type = (type).toUpperCase();
        const types = ["PLAYING", "WATCHING", "STREAMING", "LISTENING", "COMPETING"];
        if (!types.includes(type))
            return;
        client.user?.setActivity(status, { type: type });
        message.reply({ embeds: [client.embed({ title: "Success" }, message)] });
    }
}
exports.default = StatusCommand;
