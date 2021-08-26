import { ThreadChannel } from "discord.js";
import Listener from "../../Struct/Listener";
export default class ThreadCreateEvent extends Listener{
    constructor() {
        super('threadCreate', {
            emitter: 'client',
            event: 'threadCreate'
        });
    }

    async exec(thread: ThreadChannel) {
        if(thread.joinable) await thread.join()
    }
}