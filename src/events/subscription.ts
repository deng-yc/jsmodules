import { Events } from './index';

export class Subscription {
    constructor(public owner: Events, public events) {
    }
    callback;
    context;
    then = (callback, context?) => {
        this.callback = callback || this.callback;
        this.context = context || this.context;

        if (!this.callback) {
            return this;
        }
        this.owner.addListener(this.events, this.callback, this.context);
        return this;
    }
    on = this.then;
    off = () => {
        this.owner.removeListener(this.events, this.callback, this.context);
    }
}