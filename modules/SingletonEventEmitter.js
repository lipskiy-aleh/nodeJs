import events from 'events';

let instance = null;

export default class SingletonEventEmitter extends events.EventEmitter {
    constructor() {
        super();

        if(!instance) {
            instance = this;
        }

        return instance;
    }
}
