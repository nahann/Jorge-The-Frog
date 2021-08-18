import Listener from "../../Struct/Listener";
export default class DebugEvent extends Listener{
    constructor() {
        super('debug', {
            emitter: 'client',
            event: 'debug'
        });
        this.exec = console.log
    }
}