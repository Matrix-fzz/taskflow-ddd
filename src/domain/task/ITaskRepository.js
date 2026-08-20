class ITaskRepository {
    async save(task) { throw new Error('NotImplemented') }
    async findById(taskId) { throw new Error('NotImplemented') }
    async findByAssignee(assigneeId) { throw new Error('NotImplemented') }
}
module.exports = ITaskRepository
