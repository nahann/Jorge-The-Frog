import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import { embed } from '../Functions/Embed'
import { EmbedFunction } from '../../types'
import * as path from "path"
import { readdirSync } from 'fs'
import { Database } from "zapmongo"
import { Config } from "../Config"
import {Collection} from 'discord.js'
import consola,{Consola} from "consola"
export default class Client extends AkairoClient {
    commandHandler: CommandHandler = new CommandHandler(this, {
        directory: path.join(__dirname,"..","Commands"),
        prefix: [";",":"],
        automateCategories: true,
        handleEdits: true,
        commandUtil: true,
        aliasReplacement: /-/g,
        defaultCooldown: 3000
    });
    listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: path.join(__dirname,"..","Listeners"),
        automateCategories: true
    });
    console: Consola = consola
    db: Database 
    //inhibitorHandler: InhibitorHandler;
    embed: EmbedFunction
    config: any
    slashes: Collection<string,any> = new Collection()
    constructor() {
        super({
            ownerID: ['243845797643419658', '520797108257816586','705843647287132200', '447680195604774922']
        }, {
            intents: 32767,
            allowedMentions: {
                parse: ['roles', 'users'],
                repliedUser: false
            }
        })
        this.config = Config
        this.db = new Database({
            mongoURI: this.config.Mongo as string,
            schemas: [{
                name: "userEcos",
                data: {
                  userId: String,
                  walletJorgeToken: {
                    type: Number,
                    default: 500,
                  },
                  bankJorgeToken: {
                    type: Number,
                    default: 0,
                  },
                  Passive: {
                    type: Boolean,
                    default: false,
                  },
                },
              },{
                  name: "chatbot",
                  data: {

                      channelId: String
                  }
              }]
        })
        this.commandHandler.useListenerHandler(this.listenerHandler)
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
        readdirSync(path.join(__dirname,"..","SlashCommands")).map(async c =>{
            const file = (await import(path.join(__dirname,"..","SlashCommands",c))).default
            this.slashes.set(file.name,file)
        })
        //this.inhibitorHandler.loadAll()
        this.login(this.config.Token)
    }
    shorten(str: string, num: number){
        if(str.length < num) return str
        const newst = str.slice(0,num - 2).split(" ")
        return `${newst.slice(0,newst.length - 1).join(" ")}..`
    }
    trimArray(ar: any[],num: number,join = ", "){
        const l = ar.length - num
        const sliced = ar.slice(0,num).join(join)
        console.log(sliced)
        return ar.length > num ? `${sliced} ${join == "\n" ? "\n" : ""}...and ${l} more` : ar.join(join)
       } 
}
