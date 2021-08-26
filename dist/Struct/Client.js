"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const Embed_1 = require("../Functions/Embed");
const path = __importStar(require("path"));
const zapmongo_1 = require("zapmongo");
const Config_1 = require("../Config");
const consola_1 = __importDefault(require("consola"));
class Client extends discord_akairo_1.AkairoClient {
    commandHandler = new discord_akairo_1.CommandHandler(this, {
        directory: path.join(__dirname, "..", "Commands"),
        prefix: [";", ":"],
        automateCategories: true,
        handleEdits: true,
        commandUtil: true,
        defaultCooldown: 3000,
        ignoreCooldown: ['243845797643419658', '520797108257816586', '705843647287132200']
    });
    listenerHandler = new discord_akairo_1.ListenerHandler(this, {
        directory: path.join(__dirname, "..", "Listeners"),
        automateCategories: true
    });
    console;
    db;
    //inhibitorHandler: InhibitorHandler;
    embed;
    config;
    constructor() {
        super({
            ownerID: ['243845797643419658', '520797108257816586']
        }, {
            intents: 32767,
            allowedMentions: {
                parse: ['roles', 'users'],
                repliedUser: false
            }
        });
        this.config = Config_1.Config;
        this.db = new zapmongo_1.Database({
            mongoURI: this.config.Mongo,
            schemas: [{
                    name: "userEcos",
                    data: {
                        userId: String,
                        walletShibaToken: {
                            type: Number,
                            default: 500,
                        },
                        bankShibaToken: {
                            type: Number,
                            default: 0,
                        },
                        Passive: {
                            type: Boolean,
                            default: false,
                        },
                    },
                }]
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.console = consola_1.default;
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });
        /*
                this.inhibitorHandler = new InhibitorHandler(this, {
                    directory: '../Inhibitors'
                })
                this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
                
        */
        this.embed = Embed_1.embed;
    }
    start() {
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        //this.inhibitorHandler.loadAll()
        this.login(this.config.Token);
    }
    trimArray(ar, num, join = ", ") {
        const l = ar.length - num;
        const sliced = ar.slice(0, num).join(join);
        console.log(sliced);
        return ar.length > num ? `${sliced} ${join == "\n" ? "\n" : ""}...and ${l} more` : ar.join(join);
    }
}
exports.default = Client;
