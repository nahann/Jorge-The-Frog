"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class DocsCommand extends Command_1.default {
    constructor() {
        super("docs", {
            aliases: ["docs"],
            description: "Get Discord.JS documentation",
            args: [{
                    id: "query",
                    type: "string"
                }, {
                    id: "source",
                    type: "string",
                    default: "stable"
                }]
        });
    }
    async exec(message, { query, source }) {
        if (!query)
            return;
        if (!["stable", "master", "akairo", "akairo-master"])
            return;
        const src = source == "akairo" ? "akairo-master" : source;
        const fetched = await (await node_fetch_1.default(`https://djsdocs.sorta.moe/v2/embed?src=${src}&q=${encodeURIComponent(query)}`)).json();
        message.reply({ embeds: [fetched] });
    }
}
exports.default = DocsCommand;
