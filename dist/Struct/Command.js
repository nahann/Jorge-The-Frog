"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class ExCommand extends discord_akairo_1.Command {
    client;
    constructor(id, options) {
        super(id, options);
        this.client = super.client;
    }
}
exports.default = ExCommand;
