import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo'
import { Config } from '../Config/Config'
import { MessageEmbed, MessageEmbedOptions,Message } from 'discord.js'
import { embed } from '../Functions/Embed'
import { EmbedFunction } from '../../types'
export default class Client extends AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;
    inhibitorHandler: InhibitorHandler;
    embed: EmbedFunction
    constructor() {
        super({
            ownerID: ['243845797643419658', '520797108257816586']
        }, {
            partials: ['GUILD_MEMBER', 'REACTION', 'MESSAGE'],
            intents: 32767,
            allowedMentions: {
                parse: ['everyone', 'roles', 'users'],
                repliedUser: false
            }
        })

        this.commandHandler = new CommandHandler(this, {
            directory: './Commands',
            prefix: ";",
            automateCategories: true,
            defaultCooldown: 3000,
            ignoreCooldown: ['243845797643419658', '520797108257816586', '705843647287132200']
        })

        this.listenerHandler = new ListenerHandler(this, {
            directory: './Listeners'
        })

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './Inhibitors'
        })

        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        })

        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.inhibitorHandler.loadAll()
        this.commandHandler.loadAll()
        this.listenerHandler.loadAll()

        this.embed = embed;
    }
}
const client = new Client()
client.login(Config.Token)