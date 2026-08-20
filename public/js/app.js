const API_URL = 'http://localhost:3001/tasks';

// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    
    // Handle form submission
    document.getElementById('taskForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createTask();
    });
});

async function loadTasks() {
    const container = document.getElementById('tasksContainer');
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch tasks');
        
        const tasks = await response.json();
        
        if (tasks.length === 0) {
            container.innerHTML = '<p class="loading">No tasks yet. Create your first task!</p>';
            return;
        }
        
        container.innerHTML = tasks.map(task => `
            <div class="task-card">
                <h3>${escapeHtml(task.title)}</h3>
                <p>${escapeHtml(task.description)}</p>
                <div class="task-meta">
                    <span class="badge badge-status">${task.status}</span>
                    <span class="badge badge-priority ${task.priority}">${task.priority}</span>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading tasks:', error);
        container.innerHTML = '<p class="error">Failed to load tasks. Make sure the server is running.</p>';
    }
}

async function createTask() {
    const form = document.getElementById('taskForm');
    const formData = new FormData(form);
    
    const task = {
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority')
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        
        if (!response.ok) throw new Error('Failed to create task');
        
        // Show success message
        showMessage('Task created successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Reload tasks
        await loadTasks();
        
    } catch (error) {
        console.error('Error creating task:', error);
        showMessage('Failed to create task. Please try again.', 'error');
    }
}

function showMessage(message, type) {
    const container = document.querySelector('.create-task');
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
