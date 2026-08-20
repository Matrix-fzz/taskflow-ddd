# TaskFlow — DDD Task Management Application

A full-stack task management application built as a practical example of Domain-Driven Design (DDD) with MongoDB, Express.js, and a vanilla frontend.

## Features

- **Create Tasks** — Title, description, and priority (low/normal/high)
- **Assign Tasks** — Assign tasks to users
- **Add Comments** — Comment on tasks for collaboration
- **Task Status** — Track progress through TODO → DOING → DONE
- **Domain Events** — Event-driven architecture with TaskAssigned, TaskStatusChanged, TaskCommentAdded
- **Responsive UI** — Card-based grid layout for task visualization

## Technologies

| Technology | Usage |
|------------|-------|
| Node.js | Runtime environment |
| Express.js 4.18.2 | REST API framework |
| MongoDB 6.3.0 | Database (native driver) |
| uuid 9.0.1 | Unique task identifier generation |
| HTML5 | Frontend structure |
| CSS3 | Styling with responsive design |
| JavaScript (ES6+) | Backend and frontend logic |

## Architecture (DDD Layers)

```
src/
├── domain/task/                    # DOMAIN LAYER
│   ├── Task.js                     # Aggregate root with business rules
│   ├── TaskId.js                   # Value object (UUID-based identity)
│   ├── TaskStatus.js               # Enum: todo, doing, done
│   └── ITaskRepository.js          # Repository interface (abstract contract)
├── application/services/           # APPLICATION LAYER
│   └── TaskCommandService.js       # Use cases: create, assign, addComment, list
├── infrastructure/                 # INFRASTRUCTURE LAYER
│   ├── db/mongoClient.js           # MongoDB connection
│   ├── repositories/TaskRepositoryMongo.js  # Concrete MongoDB repository
│   └── events/eventBusSimple.js    # In-process pub/sub event bus
└── interfaces/http/                # INTERFACE LAYER
    └── controllers/tasksController.js  # Express REST endpoints
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | List all tasks |
| POST | `/tasks/:id/assign` | Assign a task to a user |
| POST | `/tasks/:id/comments` | Add a comment to a task |

## Setup

1. Ensure MongoDB is running on `localhost:27017`
2. Run `npm install`
3. Start the server: `node index.js` (port 3001)
4. Open `http://localhost:3001` in your browser
