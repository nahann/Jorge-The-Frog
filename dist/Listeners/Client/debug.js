"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Listener_1 = __importDefault(require("../../Struct/Listener"));
class DebugEvent extends Listener_1.default {
    constructor() {
        super('debug', {
            emitter: 'client',
            event: 'debug'
        });
        this.exec = console.log;
    }
}
exports.default = DebugEvent;
