"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Listener_1 = __importDefault(require("../../Struct/Listener"));
class ThreadCreateEvent extends Listener_1.default {
    constructor() {
        super('threadCreate', {
            emitter: 'client',
            event: 'threadCreate'
        });
    }
    async exec(thread) {
        if (thread.joinable)
            await thread.join();
    }
}
exports.default = ThreadCreateEvent;
