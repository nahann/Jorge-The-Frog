import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo'
import { embed } from '../Functions/Embed'
import { EmbedFunction } from '../../types'
import * as path from "path"
export default class Client extends AkairoClient {
    commandHandler: CommandHandler = new CommandHandler(this, {
        directory: path.join(__dirname,"..","Commands"),
        prefix: [";",":"],
        automateCategories: true,
        handleEdits: true,
        commandUtil: true,
        defaultCooldown: 3000,
        ignoreCooldown: ['243845797643419658', '520797108257816586', '705843647287132200']
    });
    listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: path.join(__dirname,"..","Listeners")
    });
    //inhibitorHandler: InhibitorHandler;
    embed: EmbedFunction
    constructor() {
        super({
            ownerID: ['243845797643419658', '520797108257816586']
        }, {
            intents: 32767,
            allowedMentions: {
                parse: ['roles', 'users'],
                repliedUser: false
            }
        })
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        })
        this.listenerHandler.loadAll()
/*
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: '../Inhibitors'
        })
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.inhibitorHandler.loadAll()
*/

        this.commandHandler.loadAll()
        this.embed = embed;
    }
}
