"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class NPMCommand extends Command_1.default {
    constructor() {
        super("npm", {
            aliases: ["npm"],
            description: "Search for any npm package",
            args: [{
                    id: "query",
                    type: "lowercase",
                    default: "discord.js"
                }]
        });
    }
    async exec(message, { query }) {
        const fetched = await (await node_fetch_1.default(`https://api.npms.io/v2/search?q=${query}`)).json();
        const { package: pkg } = fetched.results[0];
        message.reply({
            embeds: [
                this.client.embed({
                    title: pkg.name,
                    url: pkg.links.npm,
                    description: pkg.description
                }, message)
                    .addField("Author", (pkg.author?.name || "Unknown"), true)
                    .addField("Version", pkg.version, true)
                    .addField("Keywords", (pkg.keywords?.join(", ") || "None"))
                    .addField("Homepage", pkg.links.homepage)
                    .addField("Repository", pkg.links.repository)
                    .addField("Maintainers", pkg.maintainers.map(m => m.username).join(", "))
                    .addField("Updated Date", new Date(pkg.date).toDateString())
            ]
        });
    }
}
exports.default = NPMCommand;
