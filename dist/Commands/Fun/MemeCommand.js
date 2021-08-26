"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../../Struct/Command"));
const imageapi_js_1 = require("imageapi.js");
class MemeCommand extends Command_1.default {
    constructor() {
        super("meme", {
            aliases: ["meme"],
            description: "Get a random meme from reddit"
        });
    }
    async exec(message) {
        const { title, img: url } = await imageapi_js_1.advanced("dankmemes", "top");
        message.reply({
            embeds: [
                this.client.embed({
                    title,
                    url,
                    image: { url }
                }, message)
            ]
        });
    }
}
exports.default = MemeCommand;
