const { v4: uuidv4 } = require('uuid')

class TaskId {
    constructor(id) {
        this.id = id || uuidv4()
    }
    toString() { return this.id }
}

module.exports = TaskId
