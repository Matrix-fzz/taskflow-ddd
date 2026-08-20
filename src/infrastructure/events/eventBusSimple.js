class EventBusSimple {
    constructor() { this.handlers = [] }
    subscribe(handler) { this.handlers.push(handler) }
    async publish(events) {
        for (const e of events) {
            for (const h of this.handlers) await h(e)
        }
    }
}
module.exports = EventBusSimple
