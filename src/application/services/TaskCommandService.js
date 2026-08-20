class TaskCommandService {
    constructor({ taskRepository, eventBus }) {
        this.taskRepository = taskRepository
        this.eventBus = eventBus
    }

    async createTask({ title, description, priority }) {
        const Task = require('../../domain/task/Task')
        const task = new Task({ title, description, priority })
        await this.taskRepository.save(task)
        const events = task.pullEvents()
        await this.eventBus.publish(events)
        return task
    }

    async assignTask({ taskId, userId }) {
        const task = await this.taskRepository.findById(taskId)
        if (!task) throw new Error('TaskNotFound')
        task.assignTo(userId)
        await this.taskRepository.save(task)
        await this.eventBus.publish(task.pullEvents())
        return task
    }

    async addComment({ taskId, authorId, text }) {
        const task = await this.taskRepository.findById(taskId)
        if (!task) throw new Error('TaskNotFound')
        task.addComment(authorId, text)
        await this.taskRepository.save(task)
        await this.eventBus.publish(task.pullEvents())
        return task
    }

    async listTasks() {
        return this.taskRepository.findAll()
    }
}

module.exports = TaskCommandService
