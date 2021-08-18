import Listener from "../../Struct/Listener";
export default class ReadyEvent extends Listener{
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        this.client.console.success(`${this.client.user?.tag} is now online`);
    }
}