"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
class BalanceCommand extends Command_1.default {
    constructor() {
        super("balance", {
            aliases: ["bal", "balance"],
            args: [{
                    id: "mention",
                    type: "memberMention"
                }]
        });
    }
    async exec(message, { mention }) {
        const user = mention || message.author;
        const Schema = await this.client.db.load("userEcos");
        const data = (await Schema.findOne({ userId: user.id }) ||
            await Schema.create({ userId: user.id }));
        const walletToken = data.walletShibaToken;
        const bankToken = data.bankShibaToken;
        message.reply({
            embeds: [
                this.client.embed({
                    title: `${user.username}'s wallet`,
                    description: `:coin: Wallet: ${walletToken} Shiba Token\n:bank: Bank: ${bankToken} Shiba Token`,
                }, message),
            ],
        });
    }
}
exports.default = BalanceCommand;
