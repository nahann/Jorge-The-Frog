import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo'
import { embed } from '../Functions/Embed'
import { EmbedFunction } from '../../types'
import * as path from "path"
import { Config } from "../Config"
import consola,{Consola} from "consola"
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
        directory: path.join(__dirname,"..","Listeners"),
        automateCategories: true
    });
    console: Consola
    //inhibitorHandler: InhibitorHandler;
    embed: EmbedFunction
    config: any
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
        this.config = Config
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.console = consola
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        })
/*
        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: '../Inhibitors'
        })
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        
*/

        this.embed = embed;
    }
    start(){
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()
        //this.inhibitorHandler.loadAll()
        this.login(this.config.Token)
    }
    trimArray(ar: any[],num: number,join = ", "){
        const l = ar.length - num
        const sliced = ar.slice(0,num).join(join)
        console.log(sliced)
        return ar.length > num ? `${sliced} ${join == "\n" ? "\n" : ""}...and ${l} more` : ar.join(join)
       } 
}
