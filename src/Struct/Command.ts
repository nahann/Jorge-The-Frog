import { Command, CommandOptions } from 'discord-akairo'
import Client from './Client'
export default class SantaIsReal extends Command {
    client: Client
    constructor(id: string, options: CommandOptions) {
        super(id, options)
        this.client = super.client as Client
    }
}