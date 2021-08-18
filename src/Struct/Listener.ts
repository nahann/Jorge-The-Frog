import { Listener,ListenerOptions } from 'discord-akairo'
import Client from './Client'
export default class Listenerx extends Listener {
    client: Client
    constructor(id: string,options: ListenerOptions) {
        super(id, options)
        this.client = super.client as Client
    }
}