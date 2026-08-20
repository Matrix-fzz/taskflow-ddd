const express = require('express')

function makeTasksController({ taskCommandService }) {
    const router = express.Router()

    router.post('/', async (req, res) => {
        try {
            const task = await taskCommandService.createTask(req.body)
            res.status(201).send({ id: task.id.toString(), title: task.title })
        } catch (err) { res.status(400).send({ error: err.message }) }
    })

    router.post('/:id/assign', async (req, res) => {
        try {
            const task = await taskCommandService.assignTask({
                taskId: req.params.id, userId: req.body.userId
            })
            res.send({ id: task.id.toString(), assignee: task.assigneeId })
        } catch (err) { res.status(400).send({ error: err.message }) }
    })

    router.post('/:id/comments', async (req, res) => {
        try {
            const task = await taskCommandService.addComment({
                taskId: req.params.id, authorId: req.body.authorId, text: req.body.text
            })
            res.status(201).send({ comments: task.comments })
        } catch (err) { res.status(400).send({ error: err.message }) }
    })

    router.get('/', async (req, res) => {
        try {
            const tasks = await taskCommandService.listTasks()
            res.send(tasks.map(t => ({
                id: t.id.toString(),
                title: t.title,
                description: t.description,
                status: t.status,
                assignee: t.assigneeId,
                priority: t.priority
            })))
        } catch (err) { res.status(400).send({ error: err.message }) }
    })

    return router
}

module.exports = makeTasksController
