const TaskId = require('./TaskId')
const Status = require('./TaskStatus')

class Task {
    constructor({ id, title, description, assigneeId = null, priority = 'normal', status = Status.TODO, comments = [], createdAt = new Date() }) {
        this.id = id instanceof TaskId ? id : new TaskId(id)
        this.title = title
        this.description = description
        this.assigneeId = assigneeId
        this.priority = priority
        this.status = status
        this.comments = comments
        this.createdAt = createdAt
        this._events = [] // domain events produced
    }

    // règles métier
    assignTo(userId) {
        if (!userId) throw new Error('AssigneeRequired')
        this.assigneeId = userId
        this._events.push({
            type: 'TaskAssigned', payload: {
                taskId: this.id.toString(), assigneeId: userId
            }
        })
    }

    changeStatus(newStatus) {
        if (!Object.values(Status).includes(newStatus)) throw new Error('InvalidStatus')
        this.status = newStatus
        this._events.push({
            type: 'TaskStatusChanged', payload: {
                taskId: this.id.toString(), status: newStatus
            }
        })
    }

    addComment(authorId, text) {
        if (!text) throw new Error('CommentEmpty')
        const comment = { id: `${Date.now()}`, authorId, text, createdAt: new Date() }
        this.comments.push(comment)
        this._events.push({
            type: 'TaskCommentAdded', payload: {
                taskId: this.id.toString(), comment
            }
        })
    }

    pullEvents() { const e = this._events; this._events = []; return e }

    static fromPersistence(raw) {
        return new Task({
            id: raw._id, title: raw.title, description: raw.description,
            assigneeId: raw.assigneeId, priority: raw.priority, status: raw.status,
            comments: raw.comments || [], createdAt: raw.createdAt
        })
    }
}

module.exports = Task
