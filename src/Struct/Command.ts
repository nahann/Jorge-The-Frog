import { Command, CommandOptions } from 'discord-akairo'
import Client from './Client'
export default class SantaIsReal extends Command {
    client: Client
    premium: boolean
    constructor(id: string, options) {
        super(id, options)
        this.premium = options.premium
    }
}