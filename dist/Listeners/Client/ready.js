"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Listener_1 = __importDefault(require("../../Struct/Listener"));
class ReadyEvent extends Listener_1.default {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }
    exec() {
        this.client.console.success(`${this.client.user?.tag} is now online`);
    }
}
exports.default = ReadyEvent;
