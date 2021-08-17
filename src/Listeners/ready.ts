import { Listener } from "discord-akairo";
export default class ReadyEvent extends Listener{
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    exec() {
        console.log(`${this.client.user?.tag} is now online`);
    }
}