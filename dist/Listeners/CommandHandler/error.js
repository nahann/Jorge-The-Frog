"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Listener_1 = __importDefault(require("../../Struct/Listener"));
class ErrorEvent extends Listener_1.default {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }
    exec(e, message, command) {
        this.client.console.error(e);
        return message.reply({
            embeds: [
                this.client.embed({
                    title: `Error occured while running command ${command.id || "unknown"}`,
                    description: `\`\`\`\n${e.stack}\`\`\``
                }, message).setColor("RED")
            ]
        });
    }
}
exports.default = ErrorEvent;
