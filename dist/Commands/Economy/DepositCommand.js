"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
class DepCommand extends Command_1.default {
    constructor() {
        super("deposit", {
            aliases: ["dep", "deposit"],
            args: [{
                    id: "num",
                    type: "number"
                }]
        });
    }
    async exec(message, { num }) {
        if (isNaN(num))
            return message.reply({
                embeds: [
                    this.client.embed({ description: `Provide a real number.` }, message),
                ],
            });
        const Schema = await this.client.db.load("userEcos");
        const data = (await Schema.findOne({ userId: message.author.id }) ||
            await Schema.create({ userId: message.author.id }));
        const walletToken = data["walletShibaToken"];
        const bankToken = data["bankShibaToken"];
        if (num > walletToken)
            return message.reply({
                embeds: [
                    this.client.embed({ description: `You don't have that much money in your wallet.` }, message),
                ],
            });
        Schema.increment({ userId: message.author.id }, "bankShibaToken", num);
        Schema.decrement({ userId: message.author.id }, "walletShibaToken", num);
        message.reply({
            embeds: [
                this.client.embed({
                    description: `You have deposited ${num} into your bank account.`,
                }, message),
            ],
        });
    }
}
exports.default = DepCommand;
