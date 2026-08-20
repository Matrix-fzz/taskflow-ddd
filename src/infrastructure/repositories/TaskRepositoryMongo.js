const Task = require('../../domain/task/Task')
const TaskId = require('../../domain/task/TaskId')

class TaskRepositoryMongo {
    constructor(db) { this.db = db; this.col = db.collection('tasks') }

    async save(task) {
        const raw = {
            _id: task.id.toString(), title: task.title, description: task.description,
            assigneeId: task.assigneeId, priority: task.priority,
            status: task.status, comments: task.comments, createdAt: task.createdAt
        }
        await this.col.updateOne({ _id: raw._id }, { $set: raw }, { upsert: true })
    }

    async findById(taskId) {
        const raw = await this.col.findOne({ _id: taskId.toString() })
        if (!raw) return null
        return Task.fromPersistence(raw)
    }

    async findByAssignee(assigneeId) {
        const cursor = await this.col.find({ assigneeId }).toArray()
        return cursor.map(raw => Task.fromPersistence(raw))
    }

    async findAll() {
        const cursor = await this.col.find({}).toArray()
        return cursor.map(raw => Task.fromPersistence(raw))
    }
}

module.exports = TaskRepositoryMongo
