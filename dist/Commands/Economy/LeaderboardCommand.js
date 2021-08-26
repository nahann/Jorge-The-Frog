"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
class LeaderBoardCommand extends Command_1.default {
    constructor() {
        super("leaderboard", {
            aliases: ["leaderboard", "lb"]
        });
    }
    async exec(message) {
        const Schema = await this.client.db.load("userEcos");
        const leaderboard = await Schema.leaderboard((a, b) => b.walletShibaToken - a.walletShibaToken);
        return message.reply({
            embeds: [
                this.client.embed({
                    fields: [
                        {
                            name: "⠀",
                            value: "This displays the users with the most money in their wallets.",
                        },
                    ],
                    title: `Shiba Economy Leaderboard`,
                    description: leaderboard
                        .map((value, index) => {
                        return `:coin: ${value.walletShibaToken} Shiba Token - ${this.client.users.cache.get(value?.userId)?.tag || "Unknown User"}`;
                    })
                        .join("\n"),
                }, message),
            ],
        });
    }
}
exports.default = LeaderBoardCommand;
