const express = require('express')
const { connect } = require('./infrastructure/db/mongoClient')
const TaskRepositoryMongo = require('./infrastructure/repositories/TaskRepositoryMongo')
const EventBusSimple = require('./infrastructure/events/eventBusSimple')
const TaskCommandService = require('./application/services/TaskCommandService')
const makeTasksController = require('./interfaces/http/controllers/tasksController')

async function main() {
    try {
        const db = await connect()
        const taskRepo = new TaskRepositoryMongo(db)
        const eventBus = new EventBusSimple()

        // Exemple: subscribe to events
        eventBus.subscribe(async (evt) => console.log('Event reçu:', evt))

        const taskService = new TaskCommandService({ taskRepository: taskRepo, eventBus })

        const app = express()
        app.use(express.json())

        // Serve static files
        app.use(express.static('public'))

        app.use('/tasks', makeTasksController({ taskCommandService: taskService }))

        app.listen(3001, () => console.log('TaskFlow listening on :3001'))
    } catch (err) {
        console.error('Failed to start server:', err)
        process.exit(1)
    }
}

main().catch(console.error)
