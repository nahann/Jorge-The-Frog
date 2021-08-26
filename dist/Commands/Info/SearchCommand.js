"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const node_fetch_1 = __importDefault(require("node-fetch"));
class SearchCommand extends Command_1.default {
    constructor() {
        super("search", {
            aliases: ["search", "google"],
            description: "Search for anything(except nsfw stuff) on google",
            args: [{
                    id: "query",
                    type: "string",
                    default: "google.com"
                }]
        });
    }
    async exec(message, { query }) {
        const url = `https://www.googleapis.com/customsearch/v1?key=${this.client.config.Google}&cx=${this.client.config.CX}&q=${query}`;
        const fetched = await (await node_fetch_1.default(url)).json();
        const item = fetched.items[0];
        const image = item.pagemap?.cse_image || [];
        const obj = this.client.embed({
            title: item.title,
            url: `https://${item.displayLink}`,
            description: `"${item.snippet}"\nTime taken to search: ${fetched.searchInformation.formattedSearchTime} seconds`,
            image: {
                url: image[0]?.src || "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png",
            }
        }, message);
        message.reply({ embeds: [obj] });
    }
}
exports.default = SearchCommand;
