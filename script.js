// DOM Elements
const greetingElement = document.getElementById('greeting');
const greetingIcon = document.getElementById('greeting-icon');
const clockElement = document.getElementById('clock');
const signupForm = document.getElementById('signup-form');
const signupSection = document.getElementById('signup-section');
const welcomeSection = document.getElementById('welcome-section');
const welcomeMessage = document.getElementById('welcome-message');
const emailMessage = document.getElementById('email-message');
const errorMessage = document.getElementById('error-message');
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const taskList = document.getElementById('task-list');

// Update greeting and icon based on time of day
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    let iconUrl;

    if (hour < 12) {
        greeting = 'Good Morning';
        iconUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'%3E%3C/path%3E%3C/svg%3E";
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
        iconUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'%3E%3C/path%3E%3C/svg%3E";
    } else {
        greeting = 'Good Evening';
        iconUrl = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'%3E%3C/path%3E%3C/svg%3E";
    }

    greetingElement.textContent = greeting;
    greetingIcon.style.backgroundImage = `url('${iconUrl}')`;
}

// Update clock
function updateClock() {
    clockElement.textContent = new Date().toLocaleTimeString();
}

// Initialize clock and greeting
updateGreeting();
updateClock();
setInterval(updateClock, 1000);

// Form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!name || !email) {
        errorMessage.textContent = 'All fields are required!';
        return;
    }

    signupSection.classList.add('hidden');
    welcomeSection.classList.remove('hidden');
    welcomeMessage.textContent = `Welcome, ${name}!`;
    emailMessage.textContent = `Your email (${email}) has been recorded.`;
});

// Todo list functionality
let tasks = [];

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <div class="task-checkbox ${task.completed ? 'completed' : ''}" 
             onclick="toggleTask(${task.id})"></div>
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="delete-button" onclick="deleteTask(${task.id})">×</button>
    `;
    return li;
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    
    if (!text) return;
    
    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });
    
    taskInput.value = '';
    renderTasks();
});

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}