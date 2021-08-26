"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
class BegCommand extends Command_1.default {
    constructor() {
        super("beg", {
            aliases: ["beg"]
        });
    }
    async exec(message) {
        const schema = await this.client.db.load("userEcos");
        (await schema.findOne({ userId: message.author.id })) ||
            (await schema.create({ userId: message.author.id }));
        const tokens = Math.floor(Math.random() * 25);
        schema.increment({ userId: message.author.id }, "walletShibaToken", tokens);
        message.reply({
            embeds: [
                this.client.embed({ description: `You begged and got ${tokens} Shiba Token` }, message),
            ],
        });
    }
}
exports.default = BegCommand;
